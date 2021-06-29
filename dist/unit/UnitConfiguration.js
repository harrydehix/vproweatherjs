"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
