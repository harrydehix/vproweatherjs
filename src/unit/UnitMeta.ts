import * as Units from "./Units";

export type UnitPreset = "eu" | "us" | "default";

type PartialUnitMeta = {
    wind?: Units.Wind;
    rain?: Units.Rain;
    temperature?: Units.Temperature;
    pressure?: Units.Pressure;
    solarRadiation?: Units.SolarRadiation;
    soilMoisture?: Units.SoilMoisture;
};

type UnitMetaConfiguration = PartialUnitMeta | { preset: UnitPreset };

export default class UnitMeta implements PartialUnitMeta{
    wind: Units.Wind = Units.Wind.default;
    rain: Units.Rain = Units.Rain.default;
    temperature: Units.Temperature = Units.Temperature.default;
    pressure: Units.Pressure = Units.Pressure.default;
    solarRadiation: Units.SolarRadiation = Units.SolarRadiation.default;
    soilMoisture: Units.SoilMoisture = Units.SoilMoisture.default;
    
    constructor(obj: UnitMetaConfiguration){
        if("preset" in obj){
            this.loadFromPreset(obj.preset);
        }else{
            this.loadFromObject(obj);
        }
    }

    private loadFromObject(obj: PartialUnitMeta){
        if(obj.wind) this.wind = obj.wind;
        if(obj.rain) this.rain = obj.rain;
        if(obj.temperature) this.temperature = obj.temperature;
        if(obj.pressure) this.pressure = obj.pressure;
        if(obj.solarRadiation) this.solarRadiation = obj.solarRadiation;
        if(obj.soilMoisture) this.soilMoisture = obj.soilMoisture;
    }

    private loadFromPreset(preset: UnitPreset){
        switch(preset){
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
