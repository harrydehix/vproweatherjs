"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Units = __importStar(require("./Units"));
class UnitMeta {
    constructor(obj) {
        this.wind = Units.Wind.default;
        this.rain = Units.Rain.default;
        this.temperature = Units.Temperature.default;
        this.pressure = Units.Pressure.default;
        this.solarRadiation = Units.SolarRadiation.default;
        this.soilMoisture = Units.SoilMoisture.default;
        if ("preset" in obj) {
            this.loadFromPreset(obj.preset);
        }
        else {
            this.loadFromObject(obj);
        }
    }
    loadFromObject(obj) {
        if (obj.wind)
            this.wind = obj.wind;
        if (obj.rain)
            this.rain = obj.rain;
        if (obj.temperature)
            this.temperature = obj.temperature;
        if (obj.pressure)
            this.pressure = obj.pressure;
        if (obj.solarRadiation)
            this.solarRadiation = obj.solarRadiation;
        if (obj.soilMoisture)
            this.soilMoisture = obj.soilMoisture;
    }
    loadFromPreset(preset) {
        switch (preset) {
            case "default":
                this.wind = Units.Wind.default;
                this.rain = Units.Rain.default;
                this.temperature = Units.Temperature.default;
                this.pressure = Units.Pressure.default;
                this.solarRadiation = Units.SolarRadiation.default;
                this.soilMoisture = Units.SoilMoisture.default;
                break;
            case "eu":
                this.wind = Units.Wind.kmh;
                this.rain = Units.Rain.mm;
                this.temperature = Units.Temperature.celsius;
                this.pressure = Units.Pressure.hpa;
                this.solarRadiation = Units.SolarRadiation.wm2;
                this.soilMoisture = Units.SoilMoisture.cb;
                break;
            case "us":
                this.wind = Units.Wind.mph;
                this.rain = Units.Rain.in;
                this.temperature = Units.Temperature.fahrenheit;
                this.pressure = Units.Pressure.hpa;
                this.solarRadiation = Units.SolarRadiation.wm2;
                this.soilMoisture = Units.SoilMoisture.cb;
                break;
        }
    }
}
exports.default = UnitMeta;
