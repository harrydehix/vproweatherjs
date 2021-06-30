import VPDriverInterface, { AnyDriverType, DriverBoolean, DriverDate, DriverNumber, DriverString } from "./VPDriverInterface";
import exec from "await-exec";
import * as fs from "fs/promises";
import DriverError from "./DriverError";

type AnyFunction = (...args: any[]) => any;

type DriverOptions = {
    /**
     * time to wait for the answer of the weather station in 1/10s (default: 10)
     */
    delay?: number;
    /**
     * maximum amount of request retries on connection error (default: 20)
     */
    maxTries?: number;
    /** 
     * whether to log errors (default: false) 
     */
    logErrors?: boolean;
    /**
     * whether to really connect to the weather station using vproweather or to simulate the connection (default: false)
     */
    useSamples?: boolean;
    /**
     * the url to the serial device (default: "/dev/ttyUSB0")
     */
    deviceUrl?: string;
}

export interface SimpleRealtimeData {
    time: DriverDate;
    rtNextArchiveRecord: DriverString;
    rtBaroTrend: DriverString;
    rtBaroTrendImg: DriverString;
    rtBaroCurr: DriverNumber;
    rtInsideTemp: DriverNumber;
    rtInsideHum: DriverNumber;
    rtOutsideTemp: DriverNumber;
    rtWindSpeed: DriverNumber;
    rtWindAvgSpeed: DriverNumber;
    rtWind2mAvgSpeed: DriverNumber;
    rtWindDir: DriverNumber;
    rtWindDirRose: DriverString;
    rtWind10mGustMaxSpeed: DriverNumber;
    rtWind10mGustMaxDir: DriverNumber;
    rtWind10mGustMaxDirRose: DriverString;
    rtOutsideHum: DriverNumber;
    rtRainRate: DriverNumber;
    rtIsRaining: DriverBoolean;
    rtUVLevel: DriverNumber;
    rtSolarRad: DriverNumber;
    rtHeatIndex: DriverNumber;
    rtWindChill: DriverNumber;
    rtThswIndex: DriverNumber;
    rtRainStorm: DriverNumber;
    rtStormStartDate: DriverDate;
    rt15mRain: DriverNumber;
    rtHourRain: DriverNumber;
    rtDayRain: DriverNumber;
    rtMonthRain: DriverNumber;
    rtYearRain: DriverNumber;
    rtDayET: DriverNumber;
    rtMonthET: DriverNumber;
    rtXmitBattt: DriverNumber;
    rtBattVoltage: DriverNumber;
    rtForeIcon: DriverNumber;
    rtForeRule: DriverNumber;
    rtForecast: DriverString;
    rtSunrise: DriverDate;
    rtSunset: DriverDate;
}

export interface SimpleHighsAndLowsData {
    time: DriverDate;
    hlBaroLoDay: DriverNumber;
    hlBaroHiDay: DriverNumber;
    hlBaroLoMonth: DriverNumber;
    hlBaroHiMonth: DriverNumber;
    hlBaroLoYear: DriverNumber;
    hlBaroHiYear: DriverNumber;
    hlBaroLoTime: DriverDate;
    hlBaroHiTime: DriverDate;
    hlWindHiDay: DriverNumber;
    hlWindHiTime: DriverDate;
    hlWindHiMonth: DriverNumber;
    hlWindHiYear: DriverNumber;
    hlInTempHiDay: DriverNumber;
    hlInTempLoDay: DriverNumber;
    hlInTempHiTime: DriverDate;
    hlInTempLoTime: DriverDate;
    hlInTempLoMonth: DriverNumber;
    hlInTempHiMonth: DriverNumber;
    hlInTempLoYear: DriverNumber;
    hlInTempHiYear: DriverNumber;
    hlInHumHiDay: DriverNumber;
    hlInHumLoDay: DriverNumber;
    hlInHumHiTime: DriverDate;
    hlInHumLoTime: DriverDate;
    hlInHumHiMonth: DriverNumber;
    hlInHumLoMonth: DriverNumber;
    hlInHumHiYear: DriverNumber;
    hlInHumLoYear: DriverNumber;
    hlOutTempHiDay: DriverNumber;
    hlOutTempLoDay: DriverNumber;
    hlOutTempHiTime: DriverDate;
    hlOutTempLoTime: DriverDate;
    hlOutTempLoMonth: DriverNumber;
    hlOutTempHiMonth: DriverNumber;
    hlOutTempHiYear: DriverNumber;
    hlOutTempLoYear: DriverNumber;
    hlDewLoDay: DriverNumber;
    hlDewHiDay: DriverNumber;
    hlDewLoTime: DriverDate;
    hlDewHiTime: DriverDate;
    hlDewHiMonth: DriverNumber;
    hlDewLoMonth: DriverNumber;
    hlDewHiYear: DriverNumber;
    hlDewLoYear: DriverNumber;
    hlChillLoDay: DriverNumber;
    hlChillLoTime: DriverDate;
    hlChillLoMonth: DriverNumber;
    hlChillLoYear: DriverNumber;
    hlHeatHiDay: DriverNumber;
    hlHeatHiTime: DriverDate;
    hlHeatHiMonth: DriverNumber;
    hlHeatHiYear: DriverNumber;
    hlSolarHiDay: DriverNumber;
    hlSolarHiTime: DriverDate;
    hlSolarHiMonth: DriverNumber;
    hlSolarHiYear: DriverNumber;
    hlUVHiDay: DriverNumber;
    hlUVHiTime: DriverDate;
    hlUVHiMonth: DriverNumber;
    hlUVHiYear: DriverNumber;
    hlRainRateHiDay: DriverNumber;
    hlRainRateHiTime: DriverDate;
    hlRainRateHiHour: DriverNumber;
    hlRainRateHiMonth: DriverNumber;
    hlRainRateHiYear: DriverNumber;
}

/**
 * Simple interface to a vantage pro that is connected serially. The vproweather driver must be installed and globally adressable.
 */
export default class SimpleVPDriver extends VPDriverInterface implements DriverOptions {
    delay = 10;
    maxTries = 20;
    logErrors = false;
    useSamples = false;
    deviceUrl = "/dev/ttyUSB0";

    constructor(options?: DriverOptions) {
        super();
        if (!options) return;
        if (options.delay) this.delay = options.delay;
        if (options.maxTries) this.maxTries = options.maxTries;
        if (options.logErrors) this.logErrors = options.logErrors;
        if (options.useSamples) this.useSamples = options.useSamples;
        if (options.deviceUrl) this.deviceUrl = options.deviceUrl;
    }

    /**
     * Creates a driver function. Only used internally. Driver functions are executed multiple times because
     * the vproweather driver is not stable.
     * @param fn the function to convert to a driver function
     */
    private createDriverFunction<Func extends AnyFunction>(fn: Func): Func {
        return (async (...args: []) => {
            for (let i = 0; i < this.maxTries; i++) {
                try {
                    const result = await fn.apply(this, ...args);
                    return result;
                } catch (err) {
                    if (this.logErrors) new DriverError("Driver didn't respond! Try to change the driver's options.");
                }
            }
            return undefined;
        }) as Func;
    }

    /**
     * Get the highs and lows.
     * @return the highs and lows
     */
    public getHighsAndLows = this.createDriverFunction(async () => {
        let stringData: string;

        // get data from driver or from sample files (if developing on another computer)
        if (!this.useSamples) {
            stringData = (
                await exec(
                    `vproweather --delay=${this.delay} -l ${this.deviceUrl}`
                )
            ).stdout;
        } else {
            stringData = await fs.readFile(`${__dirname}/samples/getHighLow.txt`, {
                encoding: "utf8",
            });
        }
        // parse data
        return Object.assign(this.parseDriverStringData(stringData), { time: new Date() }) as SimpleHighsAndLowsData;
    });

    /**
     * Get the currently measured weather data.
     * @return the currently measured weather data
     */
    public getRealtimeData = this.createDriverFunction(async () => {
        let stringData: string;

        // get data from driver or from sample files (if developing on another computer)
        if (!this.useSamples) {
            stringData = (
                await exec(
                    `vproweather --delay=${this.delay} -x ${this.deviceUrl}`
                )
            ).stdout;
        } else {
            stringData = await fs.readFile(`${__dirname}/samples/getRealtime.txt`, {
                encoding: "utf8",
            });
        }

        // parse data
        const parsedData = Object.assign(this.parseDriverStringData(stringData), { time: new Date() }) as SimpleRealtimeData;

        // fix wind chill if possible
        this.fixWindChill(parsedData);

        return parsedData;
    });

    /**
     * Get the weather station's time.
     */
    public getTime = this.createDriverFunction(async () => {
        let stringData: string;

        // get data from driver or from sample files (if developing on another computer)
        if (!this.useSamples) {
            stringData = (
                await exec(
                    `vproweather --delay=${this.delay} --get-time ${this.deviceUrl}`
                )
            ).stdout;
        } else {
            stringData = await fs.readFile(`${__dirname}/samples/getTime.txt`, {
                encoding: "utf8",
            });
        }
        // DavisTime = Saturday, June 05, 2021  01:37 PM
        return new Date(stringData.split("=")[1].trim());
    });

    /**
     * Set the weather station time to system time.
     */
    public synchronizeTime = this.createDriverFunction(async () => {
        if (this.useSamples) return;
        await exec(
            `vproweather --delay=${this.delay} --set-time ${this.deviceUrl}`
        );
        return;
    });

    /**
     * Turn the console's backlite on/off.
     * @param enabled whether to enable (true) or disable (false) the background light
     */
    public setBackgroundLight = this.createDriverFunction(async (enabled: boolean) => {
        if (this.useSamples) return;

        const stringValue = enabled ? "on" : "off";
        await exec(`vproweather --bklite-${stringValue} ${this.deviceUrl}`);
        return;
    });

    /**
     * Get the weather station's model name.
     * @return the station's model name
     */
    public getModelName = this.createDriverFunction(async () => {
        let stringData: string;

        // get data from driver or from sample files (if developing on another computer)
        if (!this.useSamples)
            stringData = await exec(
                `vproweather --delay=${this.delay} --model ${this.deviceUrl}`
            );
        else {
            stringData = await fs.readFile(`${__dirname}/samples/model.txt`, {
                encoding: "utf8",
            });
        }
        // Model: Davis Vantage Pro
        return stringData.split(":")[1].trim();
    });

    /**
     * Fixes the vproweather's negative wind chill value bug by calculating the wind chill from outside temperature and gust speed.
     * Only works successfully if these are not null.
     * @param data the simple realtime data set
     * @returns the fixed realtime data set
     */
    private fixWindChill(data: SimpleRealtimeData): void {
        if (!data.rtOutsideTemp || !data.rtWind10mGustMaxSpeed) return;
        if (!data.rtWindChill || data.rtWindChill < 0) {
            data.rtWindChill =
                35.74 +
                0.6215 * data.rtOutsideTemp +
                (0.4275 * data.rtOutsideTemp - 35.75) *
                data.rtWind10mGustMaxSpeed ** 0.16;
            if (data.rtWindChill > data.rtOutsideTemp) {
                data.rtWindChill = data.rtOutsideTemp;
            }
        }
    }

    /**
     * Parses the vproweather's string data to clean javascript object's.
     * @param data the driver's string data
     * @returns the parsed data
     */
    private parseDriverStringData(data: string) {
        const time = new Date();
        const currentDate = time.toDateString();
        // split string into array of the pattern ["key = value", ["key = value"], ...]
        const dataAsArray = data.split("\n");

        // loop through array to parse strings into actual key-value-pairs
        const dataAsObject = {};
        for (let i = 0; i < dataAsArray.length; i++) {
            const keyValuePair = dataAsArray[i];
            const temp = keyValuePair.split("=");

            // if data not matching the structure was detected skip the data
            if (temp.length === 1) continue;

            const key = temp[0].trim();
            const stringValue: string = temp[1].trim();
            let parsedValue: AnyDriverType;

            // parse numbers
            if (stringValue.match(/^(-?\d+\.\d+)$|^(-?\d+)$/))
                parsedValue = Number(stringValue);
            // parse null values
            else if (stringValue === "n/a") parsedValue = null;
            // parse booleans
            else if (stringValue === "no") parsedValue = false;
            else if (stringValue === "yes") parsedValue = true;
            else if (stringValue.match(/^\d\d\d\d-\d\d-\d\d$/)) {
                // parse yyyy-mm-dd
                parsedValue = new Date(stringValue);
            } else if (stringValue.match(/^\d\d:\d\d$/)) {
                // parse hh:mm
                parsedValue = new Date(`${currentDate}, ${stringValue}`);
            } else {
                parsedValue = stringValue;
            }

            dataAsObject[key] = parsedValue;
        }
        return dataAsObject;
    }

}