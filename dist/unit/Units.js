"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryof = exports.Category = exports.SoilMoisture = exports.SolarRadiation = exports.Rain = exports.Pressure = exports.Temperature = exports.Wind = void 0;
const UnitError_1 = __importDefault(require("./UnitError"));
/**
 * Enumeration holding all available wind units.
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
 * Enumeration holding all available temperature units.
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
 * Enumeration holding all available pressure units.
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
 * Enumeration holding all available rain units.
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
 * Enumeration holding all available solar radiation units.
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
 * Enumeration holding all available soil moisture units.
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
 * Enumeration holding all available unit types.
 */
var Category;
(function (Category) {
    Category["Pressure"] = "pressure";
    Category["Rain"] = "rain";
    Category["SoilMoisture"] = "soilMoisture";
    Category["SolarRadiation"] = "solarRadiation";
    Category["Temperature"] = "temperature";
    Category["Wind"] = "wind";
})(Category = exports.Category || (exports.Category = {}));
/**
 * Returns a unit's category.
 * @throws {UnitError} if the entered unit is invalid
 */
function categoryof(unit) {
    switch (unit) {
        case Pressure.bar:
        case Pressure.hpa:
        case Pressure.inhg:
            return Category.Pressure;
        case Rain.mm:
        case Rain.cups:
        case Rain.in:
            return Category.Rain;
        case SoilMoisture.cb:
            return Category.SoilMoisture;
        case SolarRadiation.wm2:
            return Category.SolarRadiation;
        case Wind.kmh:
        case Wind.kt:
        case Wind.mph:
        case Wind.ms:
            return Category.Wind;
        case Temperature.celsius:
        case Temperature.fahrenheit:
            return Category.Temperature;
        default:
            throw new UnitError_1.default(`Invalid unit (${unit})!`);
    }
}
exports.categoryof = categoryof;
//# sourceMappingURL=Units.js.map