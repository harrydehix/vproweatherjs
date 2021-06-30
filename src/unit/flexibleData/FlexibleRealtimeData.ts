import FlexibleWeatherData, { UnitStructure, StaticWeatherData } from "./FlexibleWeatherData";
import * as Units from "../Units";
import { AdvancedVPDriver } from "../..";

/**
 * An instance of this class holds realtime weather data that can be converted to many units with a minimum amount of code.
 * Use {@link FlexibleRealtimeData.applyUnits} to convert your weather data.
 * @see {@link AdvancedVPDriver.getRealtimeData}
 */
export default class FlexibleRealtimeData extends FlexibleWeatherData {
    constructor(data: StaticWeatherData) {
        super(data, getRealtimeStructure());
    }
}

/**
 * Returns the default unit structure of realtime weather data returned by {@link AdvancedVPDriver.getRealtimeData}.
 * @returns the default unit structure of realtime weather data
 */
function getRealtimeStructure(): UnitStructure {
    return {
        pressure: {
            current: Units.Pressure.inhg,
        },
        wind: {
            speed: {
                current: Units.Wind.mph,
                avg: {
                    short: Units.Wind.mph,
                    long: Units.Wind.mph,
                },
            },
            gust: {
                speed: Units.Wind.mph,
            },
            chill: Units.Temperature.fahrenheit,
        },
        temperature: {
            outside: Units.Temperature.fahrenheit,
            inside: Units.Temperature.fahrenheit,
        },
        rain: {
            rate: Units.Rain.cups,
            quarter: Units.Rain.cups,
            hour: Units.Rain.cups,
            day: Units.Rain.cups,
            month: Units.Rain.cups,
            year: Units.Rain.cups,
        },
        storm: {
            rain: Units.Rain.cups,
        },
        sun: {
            solarRadiation: Units.SolarRadiation.wm2,
        },
    };
}