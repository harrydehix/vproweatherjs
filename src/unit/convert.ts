import { AnyUnit, Pressure, Rain, SoilMoisture, SolarRadiation, Temperature, Wind } from "./Units";
import UnitError from "./UnitError";


/**
* Converts a value from one unit to another. The units must belong to the same category.
* @param value the value to convert
* @param currentUnit the value's current unit
* @param targetUnit the value's target unit
* @returns the converted value
*/
export default function convert<U extends AnyUnit>(value: number, currentUnit: U, targetUnit: U): number {
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
                    throw new UnitError(
                        `Cannot convert from ${currentUnit} to ${targetUnit}!`
                    );
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
                    throw new UnitError(
                        `Cannot convert from ${currentUnit} to ${targetUnit}!`
                    );
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
                    throw new UnitError(
                        `Cannot convert from ${currentUnit} to ${targetUnit}!`
                    );
            }
        // TEMPERATURE CONVERSION
        case Temperature.fahrenheit:
            switch (targetUnit) {
                case Temperature.fahrenheit:
                    return value;
                case Temperature.celsius:
                    return (value - 32) * (5 / 9);
                default:
                    throw new UnitError(
                        `Cannot convert from ${currentUnit} to ${targetUnit}!`
                    );
            }
        case Temperature.celsius:
            switch (targetUnit) {
                case Temperature.fahrenheit:
                    return value * 1.8 + 32;
                case Temperature.celsius:
                    return value;
                default:
                    throw new UnitError(
                        `Cannot convert from ${currentUnit} to ${targetUnit}!`
                    );
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
                    throw new UnitError(
                        `Cannot convert from ${currentUnit} to ${targetUnit}!`
                    );
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
                    throw new UnitError(
                        `Cannot convert from ${currentUnit} to ${targetUnit}!`
                    );
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
                    throw new UnitError(
                        `Cannot convert from ${currentUnit} to ${targetUnit}!`
                    );
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
                    throw new UnitError(
                        `Cannot convert from ${currentUnit} to ${targetUnit}!`
                    );
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
                    throw new UnitError(
                        `Cannot convert from ${currentUnit} to ${targetUnit}!`
                    );
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
                    throw new UnitError(
                        `Cannot convert from ${currentUnit} to ${targetUnit}!`
                    );
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
                    throw new UnitError(
                        `Cannot convert from ${currentUnit} to ${targetUnit}!`
                    );
            }
        // SOIL MOISTURE CONVERSION
        case SoilMoisture.cb:
            switch (targetUnit) {
                case SoilMoisture.cb:
                    return value;
                default:
                    throw new UnitError(
                        `Cannot convert from ${currentUnit} to ${targetUnit}!`
                    );
            }
        // SOLAR RADIATION CONVERSION
        case SolarRadiation.wm2:
            switch (targetUnit) {
                case SolarRadiation.wm2:
                    return value;
                default:
                    throw new UnitError(
                        `Cannot convert from ${currentUnit} to ${targetUnit}!`
                    );
            }
        default:
            throw new UnitError(
                `Cannot convert from ${currentUnit} to ${targetUnit}!`
            );
    }
}
