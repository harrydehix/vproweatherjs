import UnitConfig from "../UnitConfig";
import * as Units from "../Units";
import convert from "../convert";
import UnitError from "../UnitError";

/**
 * Nestable arrayish object structure holding any weather data and its associated units.
 */
export type MixedStaticWeatherData = {
    [unitProperty: string]: [number, Units.AnyUnit] | undefined | string | Date | boolean | null | MixedStaticWeatherData,
}

/**
 * Nestable object structure holding plain weather data without its units.
 */
export type StaticWeatherData = {
    [unitProperty: string]: string | Date | undefined | number | null | boolean | StaticWeatherData,
}

/**
 * Nestable object structure describing weather data's unit structure.
 */
export interface UnitStructure {
    [propertyName: string]: Units.AnyUnit | UnitStructure,
}

/**
 * An instance of this class holds weather data that can be converted to many units with a minimum amount of code.
 * 
 * @example
 * <caption>Creating flexible weather data using a arrayish structure</caption>
 * const flexibleWeatherData = FlexibleWeatherData.createFromArrayishData({
 *      temperatureOut: [12, Units.Temperature.celsius],
 *      wind: {
 *          gust: [12, Units.Wind.mph],
 *          avg: [3, Units.Wind.mph],
 *      },
 *      noUnitThata: "this gets ignored",
 * });
 * // Convert the weather data
 * flexibleWeatherData.applyUnits(new UnitConfig({
 *      wind: Units.Wind.kmh,
 * }));
 * 
 * @example
 * <caption>Applying a unit structure to already given weather data.</caption>
 * const alreadyThere = {
 *      temperatureOut: 12,
 *      wind: {
 *          gust: 12,
 *          avg: 3,
 *      },
 *      noUnitData: "this gets ignored"
 * };
 * // adding a unit structure to already existing weather data is also an option
 * const flexibleWeatherData = new FlexibleWeatherData(alreadyThere, {
 *      temperatureOut: Units.Temperature.fahrenheit,
 *      wind: {
 *          gust: Units.Wind.mph,
 *          avg: Units.Wind.mph,
 *      }
 * })
 */
export default class FlexibleWeatherData {
    weatherData: StaticWeatherData;
    unitStructure: UnitStructure;

    constructor(weatherData: StaticWeatherData, unitStructure: UnitStructure) {
        this.weatherData = weatherData;
        this.unitStructure = unitStructure;
    }

    /**
     * Creates an instance of {@link FlexibleWeatherData} by parsing an nestable arrayish object structure holding any weather data and its associated units.
     * @param weatherData the arrayish weather data to parse
     * @returns an instance of {@link FlexibleWeatherData}
     * 
     * @example
     * const flexibleWeatherData = FlexibleWeatherData.createFromArrayishData({
     *      temperatureOut: [12, Units.Temperature.celsius], // propertyName: [value, unit]
     *      wind: {
     *          gust: [12, Units.Wind.mph], // nesting is no problem
     *          avg: [3, Units.Wind.mph],
     *      },
     *      noUnitThata: "this gets ignored",
     * });
     * // Convert the weather data
     * flexibleWeatherData.applyUnits(new UnitConfig({
     *      wind: Units.Wind.kmh,
     * }));
     */
    public static createFromArrayishData(weatherData: MixedStaticWeatherData): FlexibleWeatherData {
        const parsedData = FlexibleWeatherData.parseMixedData(weatherData);
        return new FlexibleWeatherData(parsedData.weatherData, parsedData.unitStructure);
    }

    private static parseMixedData(mixedWeatherUnitData: MixedStaticWeatherData): { weatherData: StaticWeatherData, unitStructure: UnitStructure, unitDetected: boolean } {
        const weatherData: StaticWeatherData = {};
        const unitStructure: UnitStructure = {};

        const keys = Object.keys(mixedWeatherUnitData);
        let unitDetected = false;
        for (let i = 0; i < keys.length; i++) {
            const key: string = keys[i];
            const value = mixedWeatherUnitData[key];

            if (typeof value === "string" || typeof value === "boolean" || value instanceof Date || value === null || value === undefined) {
                weatherData[key] = value;
            } else if (value instanceof Array) {
                weatherData[key] = value[0];
                unitStructure[key] = value[1];
                unitDetected = true;
            } else {
                const parsedMixedNestedData = this.parseMixedData(value);
                if (parsedMixedNestedData.unitDetected) {
                    unitDetected = true;
                    unitStructure[key] = parsedMixedNestedData.unitStructure;
                }
                weatherData[key] = parsedMixedNestedData.weatherData;
            }
        }
        return {
            weatherData,
            unitStructure,
            unitDetected
        };
    }

    /**
     * Converts your weather data to match your desired units.
     *
     * @example
     * <caption>Either you configurate each unit category yourself (just define the ones you want to change):</caption>
     * import { Units, UnitConfig, FlexibleWeatherData } from "vproweatherjs";
     * const unitFlexibleData = new FlexibleWeatherData(...);
     * unitFlexibleData.applyUnits(new UnitConfig({
     *      wind: Units.Wind.mph,
     *      temperature: Units.Wind.celsius,
     *      pressure: Units.Pressure.bar,
     *      rain: Units.Rain.in,
     *      solarRadiation: Units.SolarRadiation.wm2,
     *      soilMoisture: Units.SoilMoisture.cb,
     * }));
     * @example
     * <caption>Or you use one of the available presets ('us', 'eu' or 'default'):</caption>
     * import { Units, UnitConfig, FlexibleWeatherData } from "vproweatherjs";
     * const unitFlexibleData = new FlexibleWeatherData(...);
     * unitFlexibleData.applyUnits(new UnitConfig({
     *      preset: "eu",
     * }));
     * @param unitConfig object holding the desired unit settings
     */
    public applyUnits(unitConfig: UnitConfig): void {
        FlexibleWeatherData.applyUnits(unitConfig, this.weatherData, this.unitStructure, false);
    }

    /**
     * Converts any weather data to match your unit configuration.
     *
     * @example
     * <caption>Either you configurate each unit category yourself (just define the ones you want to change):</caption>
     * const newData = FlexibleWeatherData.applyUnits(
     *      // your desired unit configuration
     *      new UnitConfig({
     *          wind: Units.Wind.mph,
     *          temperature: Units.Wind.fahrenheit,
     *          pressure: Units.Pressure.bar,
     *          rain: Units.Rain.in,
     *          solarRadiation: Units.SolarRadiation.wm2,
     *          soilMoisture: Units.SoilMoisture.cb,
     *      }), 
     *      // the plain weather data
     *      { 
     *          temperatureIn: 22,
     *          temperatureOut: 12,
     *          windMax: 55,
     *      }, 
     *      // the weather data's unit structure
     *      { 
     *          temperatureIn: Units.Temperature.celsius,
     *          temperatureOut: Units.Temperature.celsius,
     *          windMax: Units.Wind.kmh,
     *      }, 
     *      true/false // whether to apply the units to a clone of the original weather data
     * );
     * @example
     * <caption>Or you use one of the available presets ('us', 'eu' or 'default'):</caption>
     * import { Units, UnitConfig, FlexibleWeatherData } from "vproweatherjs";
     * const newData = FlexibleWeatherData.applyUnits(
     *      // your desired unit configuration
     *      new UnitConfig({
     *          preset: "eu",
     *      }),
     *      // your plain weather data
     *      {
     *          temperatureIn: 22,
     *          temperatureOut: 12,
     *          windMax: 55,
     *      },
     *      // your weather data's structure
     *      {
     *          temperatureIn: Units.Temperature.celsius,
     *          temperatureOut: Units.Temperature.celsius,
     *          windMax: Units.Wind.kmh,
     *      },
     *      true/false // whether to apply the units to a clone of the original weather data
     * );
     * @param unitConfig object holding the desired unit settings
     * @param data data to apply the units to (default is this.data)
     * @param struct the weather data's unit structure (default is this.units)
     * @param createClone whether to apply the units to the original data or to create a clone
     */
    public static applyUnits(unitConfig: UnitConfig, data: StaticWeatherData, struct: UnitStructure, createClone = true): { data: StaticWeatherData, struct: UnitStructure } {
        // Copy data to don't manipulate the original data
        if (createClone) data = { ...data };
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            let value = data[key];
            let structValue = struct[key];

            if (!structValue) {
                continue;
            }
            // If structure value is a unit...
            if (typeof structValue === "string") {
                // If weather data doesn't fit structure data...
                if (typeof value !== "number") {
                    continue;
                }
                // Otherwhise convert weather data to fit the unit config...
                const currentUnit = structValue;
                const unitCategory = Units.categoryof(currentUnit);
                const targetUnit = unitConfig[unitCategory];
                if (currentUnit === targetUnit) continue;
                // If there is a new target unit defined
                if (targetUnit) {
                    //console.log(`[${key}]: From ${currentUnit} (${unitCategory}) to ${targetUnit}...`)
                    value = convert(value, currentUnit, targetUnit);
                    structValue = targetUnit;
                }
                // If structure value is a nested structure...
            } else if (structValue instanceof Object) {
                // If weather data doesn't fit structure data...
                if (!(value instanceof Object) || value instanceof Date) throw new UnitError("Unit structure doesn't fit weather data. Cannot apply units!");
                // Otherwhise apply the unit config to the nested data (recursively)...
                const nestedUnitStructure = structValue;
                const nestedWeatherData = value;
                const dataWithAppliedUnits = this.applyUnits(unitConfig, nestedWeatherData, nestedUnitStructure);

                value = dataWithAppliedUnits.data;
                structValue = dataWithAppliedUnits.struct;
            }

            data[key] = value;
            struct[key] = structValue;
        }
        return {
            data,
            struct,
        };
    }
}