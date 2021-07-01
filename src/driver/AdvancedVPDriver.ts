import FlexibleHighLowData from "../unit/flexibleData/FlexibleHighLowData";
import FlexibleRealtimeData from "../unit/flexibleData/FlexibleRealtimeData";
import SimpleVPDriver, { SimpleHighsAndLowsData, SimpleRealtimeData } from "./SimpleVPDriver";

/**
 * More advanced interface to a vantage pro that is connected serially. The vproweather driver must be installed and globally adressable.
 * Offers the same functionality as the {@link SimpleVPDriver} plus {@link AdvancedVPDriver.getFlexibleHighsAndLows} and
 * {@link AdvancedVPDriver.getFlexibleRealtimeData}.
 */
export default class AdvancedVPDriver extends SimpleVPDriver {

    /**
     * Gets the highs and lows data refractored to a more structured object and as {@link FlexibleHighLowData}.
     * @returns the highs and lows data as {@link FlexibleHighLowData}
     */
    public getFlexibleHighsAndLows = async (): Promise<FlexibleHighLowData> => {
        return new FlexibleHighLowData(this.refractorHighsAndLows(await this.getHighsAndLows()));
    }

    /**
     * Gets the currently measured weather data refractored to a more structured object and as {@link FlexibleRealtimeData}.
     * @returns the currently measured weather data as {@link FlexibleRealtimeData}
     */
    public getFlexibleRealtimeData = async (): Promise<FlexibleRealtimeData> => {
        return new FlexibleRealtimeData(this.refractorRealtimeData(await this.getRealtimeData()));
    }

    private refractorHighsAndLows = (data: SimpleHighsAndLowsData): AdvancedHighsAndLowsData => {
        return {
            time: data.time ?? null,
            pressure: {
                day: {
                    low: {
                        value: data.hlBaroLoDay ?? null,
                        time: data.hlBaroLoTime ?? null,
                    },
                    high: {
                        value: data.hlBaroHiDay ?? null,
                        time: data.hlBaroHiTime ?? null,
                    },
                },
                month: {
                    low: data.hlBaroLoMonth ?? null,
                    high: data.hlBaroHiMonth ?? null,
                },
                year: {
                    low: data.hlBaroLoYear ?? null,
                    high: data.hlBaroHiYear ?? null,
                },
            },
            wind: {
                day: {
                    value: data.hlWindHiDay ?? null,
                    time: data.hlWindHiTime ?? null,
                },
                month: data.hlWindHiMonth ?? null,
                year: data.hlWindHiYear ?? null,
            },
            windChill: {
                day: {
                    value: data.hlChillLoDay ?? null,
                    time: data.hlChillLoTime ?? null,
                },
                month: data.hlChillLoMonth ?? null,
                year: data.hlChillLoYear ?? null,
            },
            dewpoint: {
                day: {
                    low: {
                        value: data.hlDewLoDay ?? null,
                        time: data.hlDewLoTime ?? null,
                    },
                    high: {
                        value: data.hlDewHiDay ?? null,
                        time: data.hlDewHiTime ?? null,
                    },
                },
                month: {
                    low: data.hlDewLoMonth ?? null,
                    high: data.hlDewHiMonth ?? null,
                },
                year: {
                    low: data.hlDewLoYear ?? null,
                    high: data.hlDewHiYear ?? null,
                },
            },
            heatIndex: {
                day: {
                    value: data.hlHeatHiDay ?? null,
                    time: data.hlHeatHiTime ?? null,
                },
                month: data.hlHeatHiMonth ?? null,
                year: data.hlHeatHiYear ?? null,
            },
            solarRadiation: {
                day: {
                    value: data.hlSolarHiDay ?? null,
                    time: data.hlSolarHiTime ?? null,
                },
                month: data.hlSolarHiMonth ?? null,
                year: data.hlSolarHiYear ?? null,
            },
            uvLevel: {
                day: {
                    value: data.hlUVHiDay ?? null,
                    time: data.hlUVHiTime ?? null,
                },
                month: data.hlUVHiMonth ?? null,
                year: data.hlUVHiYear ?? null,
            },
            rainRate: {
                day: {
                    value: data.hlRainRateHiDay ?? null,
                    time: data.hlRainRateHiTime ?? null,
                },
                month: data.hlRainRateHiMonth ?? null,
                year: data.hlRainRateHiYear ?? null,
            },
            temperature: {
                inside: {
                    day: {
                        low: {
                            value: data.hlInTempLoDay ?? null,
                            time: data.hlInTempLoTime ?? null,
                        },
                        high: {
                            value: data.hlInTempHiDay ?? null,
                            time: data.hlInTempHiTime ?? null,
                        },
                    },
                    month: {
                        low: data.hlInTempLoMonth ?? null,
                        high: data.hlInTempHiMonth ?? null,
                    },
                    year: {
                        low: data.hlInTempLoYear ?? null,
                        high: data.hlInTempHiYear ?? null,
                    },
                },
                outside: {
                    day: {
                        low: {
                            value: data.hlOutTempLoDay ?? null,
                            time: data.hlOutTempLoTime ?? null,
                        },
                        high: {
                            value: data.hlOutTempHiDay ?? null,
                            time: data.hlOutTempHiTime ?? null,
                        },
                    },
                    month: {
                        low: data.hlOutTempLoMonth ?? null,
                        high: data.hlOutTempHiMonth ?? null,
                    },
                    year: {
                        low: data.hlOutTempLoYear ?? null,
                        high: data.hlOutTempHiYear ?? null,
                    },
                },
            },
            humidity: {
                inside: {
                    day: {
                        low: {
                            value: data.hlInHumLoDay ?? null,
                            time: data.hlInHumLoTime ?? null,
                        },
                        high: {
                            value: data.hlInHumHiDay ?? null,
                            time: data.hlInHumHiTime ?? null,
                        },
                    },
                    month: {
                        low: data.hlInHumLoMonth ?? null,
                        high: data.hlInHumHiMonth ?? null,
                    },
                    year: {
                        low: data.hlInHumLoYear ?? null,
                        high: data.hlInHumHiYear ?? null,
                    },
                },
            },
        };
    }

    private refractorRealtimeData(data: SimpleRealtimeData): AdvancedRealtimeData {
        return {
            time: data.time ?? null,
            nextArchiveRecord: data.rtNextArchiveRecord ?? null,
            pressure: {
                current: data.rtBaroCurr ?? null,
                trend: data.rtBaroTrend ?? null,
                image: data.rtBaroTrendImg ?? null,
            },
            wind: {
                speed: {
                    current: data.rtWindSpeed ?? null,
                    avg: {
                        short: data.rtWindAvgSpeed ?? null,
                        long: data.rtWind2mAvgSpeed ?? null,
                    },
                },
                direction: {
                    degrees: data.rtWindDir ?? null,
                    rose: data.rtWindDirRose ?? null,
                },
                gust: {
                    speed: data.rtWind10mGustMaxSpeed ?? null,
                    direction: {
                        degrees: data.rtWind10mGustMaxDir ?? null,
                        rose: data.rtWind10mGustMaxDirRose ?? null,
                    },
                },
                chill: data.rtWindChill ?? null,
            },
            humidity: {
                outside: data.rtOutsideHum ?? null,
                inside: data.rtInsideHum ?? null,
            },
            temperature: {
                outside: data.rtOutsideTemp ?? null,
                inside: data.rtInsideTemp ?? null,
            },
            rain: {
                rate: data.rtRainRate ?? null,
                isRaining: data.rtIsRaining ?? null,
                quarter: data.rt15mRain ?? null,
                hour: data.rtHourRain ?? null,
                day: data.rtDayRain ?? null,
                month: data.rtMonthRain ?? null,
                year: data.rtYearRain ?? null,
            },
            storm: {
                rain: data.rtRainStorm ?? null,
                // TODO fix wrong date parsing
                startDate: data.rtStormStartDate ?? null,
            },
            sun: {
                rise: data.rtSunrise ?? null,
                set: data.rtSunset ?? null,
                uvLevel: data.rtUVLevel ?? null,
                solarRadiation: data.rtSolarRad ?? null,
                et: {
                    day: data.rtDayET ?? null,
                    month: data.rtMonthET ?? null,
                },
            },
            forecast: {
                text: data.rtForecast ?? null,
                icon: data.rtForeIcon ?? null,
                rule: data.rtForeRule ?? null,
            },
            batteries: {
                consoleVoltageLevel: data.rtBattVoltage ?? null,
                transmitterVoltageLevel: data.rtXmitBattt ?? null,
            },
            thswIndex: data.rtThswIndex ?? null,
        };
    }
}

export type AdvancedDriverNumber = number | null;
export type AdvancedDriverDate = Date | null;
export type AdvancedDriverBoolean = boolean | null;
export type AdvancedDriverString = string | null;
export type AdvancedDriverType = AdvancedDriverBoolean | AdvancedDriverDate | AdvancedDriverNumber | AdvancedDriverString;


export type AdvancedRealtimeData = {
    time: AdvancedDriverDate,
    nextArchiveRecord: AdvancedDriverString,
    pressure: {
        current: AdvancedDriverNumber,
        trend: AdvancedDriverString,
        image: AdvancedDriverString,
    },
    wind: {
        speed: {
            current: AdvancedDriverNumber,
            avg: {
                short: AdvancedDriverNumber,
                long: AdvancedDriverNumber,
            },
        },
        direction: {
            degrees: AdvancedDriverNumber,
            rose: AdvancedDriverString,
        },
        gust: {
            speed: AdvancedDriverNumber,
            direction: {
                degrees: AdvancedDriverNumber,
                rose: AdvancedDriverString,
            },
        },
        chill: AdvancedDriverNumber,
    },
    humidity: {
        outside: AdvancedDriverNumber,
        inside: AdvancedDriverNumber,
    },
    temperature: {
        outside: AdvancedDriverNumber,
        inside: AdvancedDriverNumber,
    },
    rain: {
        rate: AdvancedDriverNumber,
        isRaining: AdvancedDriverBoolean,
        quarter: AdvancedDriverNumber,
        hour: AdvancedDriverNumber,
        day: AdvancedDriverNumber,
        month: AdvancedDriverNumber,
        year: AdvancedDriverNumber,
    },
    storm: {
        rain: AdvancedDriverNumber,
        // TODO fix wrong date parsing
        startDate: AdvancedDriverDate,
    },
    sun: {
        rise: AdvancedDriverDate,
        set: AdvancedDriverDate,
        uvLevel: AdvancedDriverNumber,
        solarRadiation: AdvancedDriverNumber,
        et: {
            day: AdvancedDriverNumber,
            month: AdvancedDriverNumber,
        },
    },
    forecast: {
        text: AdvancedDriverString,
        icon: AdvancedDriverNumber,
        rule: AdvancedDriverNumber,
    },
    batteries: {
        consoleVoltageLevel: AdvancedDriverNumber,
        transmitterVoltageLevel: AdvancedDriverNumber,
    },
    thswIndex: AdvancedDriverNumber,
}

export type AdvancedHighsAndLowsData = {
    time: AdvancedDriverDate,
    pressure: {
        day: {
            low: {
                value: AdvancedDriverNumber,
                time: AdvancedDriverDate,
            },
            high: {
                value: AdvancedDriverNumber,
                time: AdvancedDriverDate,
            },
        },
        month: {
            low: AdvancedDriverNumber,
            high: AdvancedDriverNumber,
        },
        year: {
            low: AdvancedDriverNumber,
            high: AdvancedDriverNumber,
        },
    },
    wind: {
        day: {
            value: AdvancedDriverNumber,
            time: AdvancedDriverDate,
        },
        month: AdvancedDriverNumber,
        year: AdvancedDriverNumber,
    },
    windChill: {
        day: {
            value: AdvancedDriverNumber,
            time: AdvancedDriverDate,
        },
        month: AdvancedDriverNumber,
        year: AdvancedDriverNumber,
    },
    dewpoint: {
        day: {
            low: {
                value: AdvancedDriverNumber,
                time: AdvancedDriverDate,
            },
            high: {
                value: AdvancedDriverNumber,
                time: AdvancedDriverDate,
            },
        },
        month: {
            low: AdvancedDriverNumber,
            high: AdvancedDriverNumber,
        },
        year: {
            low: AdvancedDriverNumber,
            high: AdvancedDriverNumber,
        },
    },
    heatIndex: {
        day: {
            value: AdvancedDriverNumber,
            time: AdvancedDriverDate,
        },
        month: AdvancedDriverNumber,
        year: AdvancedDriverNumber,
    },
    solarRadiation: {
        day: {
            value: AdvancedDriverNumber,
            time: AdvancedDriverDate,
        },
        month: AdvancedDriverNumber,
        year: AdvancedDriverNumber,
    },
    uvLevel: {
        day: {
            value: AdvancedDriverNumber,
            time: AdvancedDriverDate,
        },
        month: AdvancedDriverNumber,
        year: AdvancedDriverNumber,
    },
    rainRate: {
        day: {
            value: AdvancedDriverNumber,
            time: AdvancedDriverDate,
        },
        month: AdvancedDriverNumber,
        year: AdvancedDriverNumber,
    },
    temperature: {
        inside: {
            day: {
                low: {
                    value: AdvancedDriverNumber,
                    time: AdvancedDriverDate,
                },
                high: {
                    value: AdvancedDriverNumber,
                    time: AdvancedDriverDate,
                },
            },
            month: {
                low: AdvancedDriverNumber,
                high: AdvancedDriverNumber,
            },
            year: {
                low: AdvancedDriverNumber,
                high: AdvancedDriverNumber,
            },
        },
        outside: {
            day: {
                low: {
                    value: AdvancedDriverNumber,
                    time: AdvancedDriverDate,
                },
                high: {
                    value: AdvancedDriverNumber,
                    time: AdvancedDriverDate,
                },
            },
            month: {
                low: AdvancedDriverNumber,
                high: AdvancedDriverNumber,
            },
            year: {
                low: AdvancedDriverNumber,
                high: AdvancedDriverNumber,
            },
        },
    },
    humidity: {
        inside: {
            day: {
                low: {
                    value: AdvancedDriverNumber,
                    time: AdvancedDriverDate,
                },
                high: {
                    value: AdvancedDriverNumber,
                    time: AdvancedDriverDate,
                },
            },
            month: {
                low: AdvancedDriverNumber,
                high: AdvancedDriverNumber,
            },
            year: {
                low: AdvancedDriverNumber,
                high: AdvancedDriverNumber,
            },
        },
    },
}