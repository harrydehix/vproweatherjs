"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = exports.SoilMoisture = exports.SolarRadiation = exports.Rain = exports.Pressure = exports.Temperature = exports.Wind = void 0;
const UnitError_1 = __importDefault(require("./UnitError"));
/**
 * Contains all available wind units.
 */
var Wind;
(function (Wind) {
    /**
     * wind unit, miles per hour
     */
    Wind["mph"] = "mph";
    /**
     * wind unit, kilometers per hour
     */
    Wind["kmh"] = "km/h";
    /**
     * wind unit, meters per second
     */
    Wind["ms"] = "m/s";
    /**
     * wind unit, knots
     */
    Wind["kt"] = "kt";
    Wind["default"] = "mph";
})(Wind = exports.Wind || (exports.Wind = {}));
/**
 * Contains all available temperature units.
 */
var Temperature;
(function (Temperature) {
    /**
     * temperature unit, fahrenheit
     */
    Temperature["fahrenheit"] = "\u00B0F";
    /**
     * temperature unit, celsius
     */
    Temperature["celsius"] = "\u00B0C";
    Temperature["default"] = "\u00B0F";
})(Temperature = exports.Temperature || (exports.Temperature = {}));
/**
 * Contains all available pressure units.
 */
var Pressure;
(function (Pressure) {
    /**
     * pressure unit, inches per mercury
     */
    Pressure["inhg"] = "inHg";
    /**
     * pressure unit, hectopascal
     */
    Pressure["hpa"] = "hPa";
    /**
     * pressure unit, bar
     */
    Pressure["bar"] = "bar";
    Pressure["default"] = "inHg";
})(Pressure = exports.Pressure || (exports.Pressure = {}));
/**
 * Contains all available rain units.
 */
var Rain;
(function (Rain) {
    /**
     * rain unit, cups
     */
    Rain["cups"] = "cups";
    /**
     * rain unit, millimeters
     */
    Rain["mm"] = "mm";
    /**
     * rain unit, inches
     */
    Rain["in"] = "in";
    Rain["default"] = "cups";
})(Rain = exports.Rain || (exports.Rain = {}));
/**
 * Contains all available solar radiation units.
 */
var SolarRadiation;
(function (SolarRadiation) {
    /**
     * solar radiation unit, watt per m²
     */
    SolarRadiation["wm2"] = "W/m\u00B2";
    SolarRadiation["default"] = "W/m\u00B2";
})(SolarRadiation = exports.SolarRadiation || (exports.SolarRadiation = {}));
/**
 * Contains all available soil moisture units.
 */
var SoilMoisture;
(function (SoilMoisture) {
    /**
     * soil moisture unit, cb
     */
    SoilMoisture["cb"] = "cb";
    SoilMoisture["default"] = "cb";
})(SoilMoisture = exports.SoilMoisture || (exports.SoilMoisture = {}));
/**
 * Converts a value from one unit to another. The units must belong to the same type.
 * @param value the value to convert
 * @param currentUnit the value's current unit
 * @param targetUnit the value's target unit
 * @returns the converted value
 */
function convert(value, currentUnit, targetUnit) {
    //console.log(`From ${currentUnit} to ${targetUnit} (${value})`);
    switch (currentUnit) {
        // PRESSURE CONVERSION
        case Pressure.hpa:
            switch (targetUnit) {
                case Pressure.inhg:
                    return value / 33.86389;
                case Pressure.hpa:
                    return value;
                case Pressure.bar:
                    return value / 1000;
                default:
                    throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
            }
        case Pressure.inhg:
            switch (targetUnit) {
                case Pressure.hpa:
                    return value * 33.86389;
                case Pressure.inhg:
                    return value;
                case Pressure.bar:
                    return value * 0.03386389;
                default:
                    throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
            }
        case Pressure.bar:
            switch (targetUnit) {
                case Pressure.hpa:
                    return value * 1000;
                case Pressure.inhg:
                    return value / 0.03386389;
                case Pressure.bar:
                    return value;
                default:
                    throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
            }
        // TEMPERATURE CONVERSION
        case Temperature.fahrenheit:
            switch (targetUnit) {
                case Temperature.fahrenheit:
                    return value;
                case Temperature.celsius:
                    return (value - 32) * (5 / 9);
                default:
                    throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
            }
        case Temperature.celsius:
            switch (targetUnit) {
                case Temperature.fahrenheit:
                    return value * 1.8 + 32;
                case Temperature.celsius:
                    return value;
                default:
                    throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
            }
        // WIND CONVERSION
        case Wind.kmh:
            switch (targetUnit) {
                case Wind.kmh:
                    return value;
                case Wind.kt:
                    return value * 0.53996;
                case Wind.mph:
                    return value / 1.609344;
                case Wind.ms:
                    return value / 3.6;
                default:
                    throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
            }
        case Wind.kt:
            switch (targetUnit) {
                case Wind.kmh:
                    return value / 0.53996;
                case Wind.kt:
                    return value;
                case Wind.mph:
                    return value * 1.15078;
                case Wind.ms:
                    return value * 0.514444444444;
                default:
                    throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
            }
        case Wind.mph:
            switch (targetUnit) {
                case Wind.kmh:
                    return value * 1.609344;
                case Wind.kt:
                    return value / 1.15078;
                case Wind.mph:
                    return value;
                case Wind.ms:
                    return value * 0.44704;
                default:
                    throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
            }
        case Wind.ms:
            switch (targetUnit) {
                case Wind.kmh:
                    return value * 3.6;
                case Wind.kt:
                    return value / 0.514444444444;
                case Wind.mph:
                    return value / 0.44704;
                case Wind.ms:
                    return value;
                default:
                    throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
            }
        // RAIN CONVERSION
        case Rain.cups:
            switch (targetUnit) {
                case Rain.cups:
                    return value;
                case Rain.mm:
                    return value * 0.2;
                case Rain.in:
                    return value / 127;
                default:
                    throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
            }
        case Rain.mm:
            switch (targetUnit) {
                case Rain.cups:
                    return value / 0.2;
                case Rain.mm:
                    return value;
                case Rain.in:
                    return value / 25.4;
                default:
                    throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
            }
        case Rain.in:
            switch (targetUnit) {
                case Rain.cups:
                    return value * 127;
                case Rain.mm:
                    return value * 25.4;
                case Rain.in:
                    return value;
                default:
                    throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
            }
        // SOIL MOISTURE CONVERSION
        case SoilMoisture.cb:
            switch (targetUnit) {
                case SoilMoisture.cb:
                    return value;
                default:
                    throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
            }
        // SOLAR RADIATION CONVERSION
        case SolarRadiation.wm2:
            switch (targetUnit) {
                case SolarRadiation.wm2:
                    return value;
                default:
                    throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
            }
        default:
            throw new UnitError_1.default(`Cannot convert from ${currentUnit} to ${targetUnit}!`);
    }
}
exports.convert = convert;
