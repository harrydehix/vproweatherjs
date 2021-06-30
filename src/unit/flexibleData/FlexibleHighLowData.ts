import FlexibleWeatherData, { StaticWeatherData, UnitStructure } from "./FlexibleWeatherData";
import * as Units from "../Units";
import { AdvancedVPDriver } from "../..";

/**
 * An instance of this class holds highs and lows weather data returned by {@link AdvancedVPDriver.getHighsAndLows} that can be converted to many units with a minimum amount of code.
 * Use {@link FlexibleHighLowData.applyUnits} to convert your weather data.
 * @see {@link AdvancedVPDriver.getHighsAndLows}
 */
export default class FlexibleHighLowData extends FlexibleWeatherData {
    constructor(data: StaticWeatherData) {
        super(data, getHighLowStructure());
    }
}

/**
 * Returns the default unit structure of highs and lows weather data returned by {@link AdvancedVPDriver.getHighsAndLows}.
 * @returns the default unit structure of highs and lows weather data
 */
function getHighLowStructure(): UnitStructure {
    return {
        pressure: {
            day: {
                low: {
                    value: Units.Pressure.inhg,
                },
                high: {
                    value: Units.Pressure.inhg,
                },
            },
            month: {
                low: Units.Pressure.inhg,
                high: Units.Pressure.inhg,
            },
            year: {
                low: Units.Pressure.inhg,
                high: Units.Pressure.inhg,
            },
        },
        wind: {
            day: {
                value: Units.Wind.mph,
            },
            month: Units.Wind.mph,
            year: Units.Wind.mph,
        },
        windChill: {
            day: {
                value: Units.Temperature.fahrenheit,
            },
            month: Units.Temperature.fahrenheit,
            year: Units.Temperature.fahrenheit,
        },
        dewpoint: {
            day: {
                low: {
                    value: Units.Temperature.fahrenheit,
                },
                high: {
                    value: Units.Temperature.fahrenheit,
                },
            },
            month: {
                low: Units.Temperature.fahrenheit,
                high: Units.Temperature.fahrenheit,
            },
            year: {
                low: Units.Temperature.fahrenheit,
                high: Units.Temperature.fahrenheit,
            },
        },
        solarRadiation: {
            day: {
                value: Units.SolarRadiation.wm2,
            },
            month: Units.SolarRadiation.wm2,
            year: Units.SolarRadiation.wm2,
        },
        rainRate: {
            day: {
                value: Units.Rain.cups,
            },
            month: Units.Rain.cups,
            year: Units.Rain.cups,
        },
        temperature: {
            inside: {
                day: {
                    low: {
                        value: Units.Temperature.fahrenheit,
                    },
                    high: {
                        value: Units.Temperature.fahrenheit,
                    },
                },
                month: {
                    low: Units.Temperature.fahrenheit,
                    high: Units.Temperature.fahrenheit,
                },
                year: {
                    low: Units.Temperature.fahrenheit,
                    high: Units.Temperature.fahrenheit,
                },
            },
            outside: {
                day: {
                    low: {
                        value: Units.Temperature.fahrenheit,
                    },
                    high: {
                        value: Units.Temperature.fahrenheit,
                    },
                },
                month: {
                    low: Units.Temperature.fahrenheit,
                    high: Units.Temperature.fahrenheit,
                },
                year: {
                    low: Units.Temperature.fahrenheit,
                    high: Units.Temperature.fahrenheit,
                },
            },
        },
    };
}