import * as Units from "./Units";
import FlexibleWeatherData from "./flexibleData/FlexibleWeatherData";

/**
 * Type representing all available unit presets.
 */
type UnitPreset = "eu" | "us" | "default";

/**
 * Type representing an object holding information about how to convert weather data.
 */
type PartialUnitConfig = {
    wind?: Units.Wind;
    rain?: Units.Rain;
    temperature?: Units.Temperature;
    pressure?: Units.Pressure;
    solarRadiation?: Units.SolarRadiation;
    soilMoisture?: Units.SoilMoisture;
};

/**
 * A unit configuration holds information about how to convert weather data.
 * Works in conjunction with {@link FlexibleWeatherData.applyUnits}.
 * Use {@link Units} to select your desired units.
 * 
 * @example 
 * <caption>Converting an instance of {@link FlexibleWeatherData}</caption>
 * const unitFlexibleData = new FlexibleWeatherData(...);
 * unitFlexibleData.applyUnits(new UnitConfig({
 *      wind: Units.Wind.kmh,
 *      temperature: Units.Temperature.celsius,
 *      rain: Units.Rain.cups,
 *      pressure: Units.Pressure.bar,
 *      solarRadiation: Units.SolarRadiation.wm2,
 *      soilMoisture: Units.SoilMoisture.cb,
 * }));
 *  * @example
 * <caption>Shortcut: Use presets!</caption>
 * const unitFlexibleData = await driver.getFlexibleRealtimeData();
 * unitFlexibleData.applyUnits(new UnitConfig({
 *      preset: "eu",
 * }));
 */
export default class UnitConfig implements PartialUnitConfig {
    /** your unit of chose for wind values */
    wind?: Units.Wind;
    /** your unit of chose for rain values */
    rain?: Units.Rain;
    /** your unit of chose for temperature values */
    temperature?: Units.Temperature;
    /** your unit of chose for pressure values */
    pressure?: Units.Pressure;
    /** your unit of chose for solar radiation values */
    solarRadiation?: Units.SolarRadiation;
    /** your unit of chose for soil moisture values */
    soilMoisture?: Units.SoilMoisture;

    public constructor(obj?: PartialUnitConfig | { preset: UnitPreset }) {
        if (!obj) return;
        if ("preset" in obj) {
            this.loadFromPreset(obj.preset);
        } else {
            this.loadFromObject(obj);
        }
    }

    /**
     * Updates this unit configuration to fit your desired settings.
     * @param obj object holding your desired settings
     * 
     * @example
     * const unitConfig = new UnitConfig({preset: "eu"});
     * unitConfig.loadFromObject({wind: Units.Wind.mph});
     * console.log(unitConfig.wind); // "mph"
     */
    public loadFromObject(obj: PartialUnitConfig): void {
        if (obj.wind) this.wind = obj.wind;
        if (obj.rain) this.rain = obj.rain;
        if (obj.temperature) this.temperature = obj.temperature;
        if (obj.pressure) this.pressure = obj.pressure;
        if (obj.solarRadiation) this.solarRadiation = obj.solarRadiation;
        if (obj.soilMoisture) this.soilMoisture = obj.soilMoisture;
    }

    /**
     * Overwrites this unit configuration with the preset's settings.
     * @param preset the preset's name
     *
     * @example
     * const unitConfig = new UnitConfig({preset: "eu"});
     * unitConfig.loadFromPreset("us");
     * console.log(unitConfig.temperature); // "°F"
     */
    public loadFromPreset(preset: UnitPreset): void {
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
