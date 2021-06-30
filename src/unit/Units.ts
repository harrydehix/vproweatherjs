import UnitError from "./UnitError";

/**
 * Enumeration holding all available wind units.
 */
export enum Wind {
    /**
     * wind unit, miles per hour
     */
    mph = "mph",
    /**
     * wind unit, kilometers per hour
     */
    kmh = "km/h",
    /**
     * wind unit, meters per second
     */
    ms = "m/s",
    /**
     * wind unit, knots
     */
    kt = "kt",
    default = mph,
}

/**
 * Enumeration holding all available temperature units.
 */
export enum Temperature {
    /**
     * temperature unit, fahrenheit
     */
    fahrenheit = "°F",
    /**
     * temperature unit, celsius
     */
    celsius = "°C",
    default = fahrenheit,
}

/**
 * Enumeration holding all available pressure units.
 */
export enum Pressure {
    /**
     * pressure unit, inches per mercury
     */
    inhg = "inHg",
    /**
     * pressure unit, hectopascal
     */
    hpa = "hPa",
    /**
     * pressure unit, bar
     */
    bar = "bar",
    default = inhg,
}

/**
 * Enumeration holding all available rain units.
 */
export enum Rain {
    /**
     * rain unit, cups
     */
    cups = "cups",
    /**
     * rain unit, millimeters
     */
    mm = "mm",
    /**
     * rain unit, inches
     */
    in = "in",
    default = cups,
}

/**
 * Enumeration holding all available solar radiation units.
 */
export enum SolarRadiation {
    /**
     * solar radiation unit, watt per m²
     */
    wm2 = "W/m²",
    default = wm2,
}

/**
 * Enumeration holding all available soil moisture units.
 */
export enum SoilMoisture {
    /**
     * soil moisture unit, cb
     */
    cb = "cb",
    default = cb,
}

/**
 * Type representing all units available.
 */
export type AnyUnit = Pressure | Rain | SoilMoisture | SolarRadiation | Temperature | Wind;

/**
 * Enumeration holding all available unit types.
 */
export enum Category {
    Pressure = "pressure",
    Rain = "rain",
    SoilMoisture = "soilMoisture",
    SolarRadiation = "solarRadiation",
    Temperature = "temperature",
    Wind = "wind",
}

/**
 * Returns a unit's category.
 * @throws {UnitError} if the entered unit is invalid
 */
export function categoryof(unit: AnyUnit): Category {
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
            throw new UnitError(`Invalid unit (${unit})!`)
    }
}

