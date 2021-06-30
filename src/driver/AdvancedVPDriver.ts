import FlexibleHighLowData from "../unit/flexibleData/FlexibleHighLowData";
import FlexibleRealtimeData from "../unit/flexibleData/FlexibleRealtimeData";
import SimpleVPDriver, { SimpleHighsAndLowsData, SimpleRealtimeData } from "./SimpleVPDriver";
import { DriverBoolean, DriverDate, DriverNumber, DriverString } from "./VPDriverInterface";

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
            time: data.time,
            pressure: {
                day: {
                    low: {
                        value: data.hlBaroLoDay,
                        time: data.hlBaroLoTime,
                    },
                    high: {
                        value: data.hlBaroHiDay,
                        time: data.hlBaroHiTime,
                    },
                },
                month: {
                    low: data.hlBaroLoMonth,
                    high: data.hlBaroHiMonth,
                },
                year: {
                    low: data.hlBaroLoYear,
                    high: data.hlBaroHiYear,
                },
            },
            wind: {
                day: {
                    value: data.hlWindHiDay,
                    time: data.hlWindHiTime,
                },
                month: data.hlWindHiMonth,
                year: data.hlWindHiYear,
            },
            windChill: {
                day: {
                    value: data.hlChillLoDay,
                    time: data.hlChillLoTime,
                },
                month: data.hlChillLoMonth,
                year: data.hlChillLoYear,
            },
            dewpoint: {
                day: {
                    low: {
                        value: data.hlDewLoDay,
                        time: data.hlDewLoTime,
                    },
                    high: {
                        value: data.hlDewHiDay,
                        time: data.hlDewHiTime,
                    },
                },
                month: {
                    low: data.hlDewLoMonth,
                    high: data.hlDewHiMonth,
                },
                year: {
                    low: data.hlDewLoYear,
                    high: data.hlDewHiYear,
                },
            },
            heatIndex: {
                day: {
                    value: data.hlHeatHiDay,
                    time: data.hlHeatHiTime,
                },
                month: data.hlHeatHiMonth,
                year: data.hlHeatHiYear,
            },
            solarRadiation: {
                day: {
                    value: data.hlSolarHiDay,
                    time: data.hlSolarHiTime,
                },
                month: data.hlSolarHiMonth,
                year: data.hlSolarHiYear,
            },
            uvLevel: {
                day: {
                    value: data.hlUVHiDay,
                    time: data.hlUVHiTime,
                },
                month: data.hlUVHiMonth,
                year: data.hlUVHiYear,
            },
            rainRate: {
                day: {
                    value: data.hlRainRateHiDay,
                    time: data.hlRainRateHiTime,
                },
                month: data.hlRainRateHiMonth,
                year: data.hlRainRateHiYear,
            },
            temperature: {
                inside: {
                    day: {
                        low: {
                            value: data.hlInTempLoDay,
                            time: data.hlInTempLoTime,
                        },
                        high: {
                            value: data.hlInTempHiDay,
                            time: data.hlInTempHiTime,
                        },
                    },
                    month: {
                        low: data.hlInTempLoMonth,
                        high: data.hlInTempHiMonth,
                    },
                    year: {
                        low: data.hlInTempLoYear,
                        high: data.hlInTempHiYear,
                    },
                },
                outside: {
                    day: {
                        low: {
                            value: data.hlOutTempLoDay,
                            time: data.hlOutTempLoTime,
                        },
                        high: {
                            value: data.hlOutTempHiDay,
                            time: data.hlOutTempHiTime,
                        },
                    },
                    month: {
                        low: data.hlOutTempLoMonth,
                        high: data.hlOutTempHiMonth,
                    },
                    year: {
                        low: data.hlOutTempLoYear,
                        high: data.hlOutTempHiYear,
                    },
                },
            },
            humidity: {
                inside: {
                    day: {
                        low: {
                            value: data.hlInHumLoDay,
                            time: data.hlInHumLoTime,
                        },
                        high: {
                            value: data.hlInHumHiDay,
                            time: data.hlInHumHiTime,
                        },
                    },
                    month: {
                        low: data.hlInHumLoMonth,
                        high: data.hlInHumHiMonth,
                    },
                    year: {
                        low: data.hlInHumLoYear,
                        high: data.hlInHumHiYear,
                    },
                },
            },
        };
    }

    private refractorRealtimeData(data: SimpleRealtimeData): AdvancedRealtimeData {
        return {
            time: data.time,
            nextArchiveRecord: data.rtNextArchiveRecord,
            pressure: {
                current: data.rtBaroCurr,
                trend: data.rtBaroTrend,
                image: data.rtBaroTrendImg,
            },
            wind: {
                speed: {
                    current: data.rtWindSpeed,
                    avg: {
                        short: data.rtWindAvgSpeed,
                        long: data.rtWind2mAvgSpeed,
                    },
                },
                direction: {
                    degrees: data.rtWindDir,
                    rose: data.rtWindDirRose,
                },
                gust: {
                    speed: data.rtWind10mGustMaxSpeed,
                    direction: {
                        degrees: data.rtWind10mGustMaxDir,
                        rose: data.rtWind10mGustMaxDirRose,
                    },
                },
                chill: data.rtWindChill,
            },
            humidity: {
                outside: data.rtOutsideHum,
                inside: data.rtInsideHum,
            },
            temperature: {
                outside: data.rtOutsideTemp,
                inside: data.rtInsideTemp,
            },
            rain: {
                rate: data.rtRainRate,
                isRaining: data.rtIsRaining,
                quarter: data.rt15mRain,
                hour: data.rtHourRain,
                day: data.rtDayRain,
                month: data.rtMonthRain,
                year: data.rtYearRain,
            },
            storm: {
                rain: data.rtRainStorm,
                // TODO fix wrong date parsing
                startDate: data.rtStormStartDate,
            },
            sun: {
                rise: data.rtSunrise,
                set: data.rtSunset,
                uvLevel: data.rtUVLevel,
                solarRadiation: data.rtSolarRad,
                et: {
                    day: data.rtDayET,
                    month: data.rtMonthET,
                },
            },
            forecast: {
                text: data.rtForecast,
                icon: data.rtForeIcon,
                rule: data.rtForeRule,
            },
            batteries: {
                consoleVoltageLevel: data.rtBattVoltage,
                transmitterVoltageLevel: data.rtXmitBattt,
            },
            thswIndex: data.rtThswIndex,
        };
    }
}

export type AdvancedRealtimeData = {
    time: DriverDate,
    nextArchiveRecord: DriverString,
    pressure: {
        current: DriverNumber,
        trend: DriverString,
        image: DriverString,
    },
    wind: {
        speed: {
            current: DriverNumber,
            avg: {
                short: DriverNumber,
                long: DriverNumber,
            },
        },
        direction: {
            degrees: DriverNumber,
            rose: DriverString,
        },
        gust: {
            speed: DriverNumber,
            direction: {
                degrees: DriverNumber,
                rose: DriverString,
            },
        },
        chill: DriverNumber,
    },
    humidity: {
        outside: DriverNumber,
        inside: DriverNumber,
    },
    temperature: {
        outside: DriverNumber,
        inside: DriverNumber,
    },
    rain: {
        rate: DriverNumber,
        isRaining: DriverBoolean,
        quarter: DriverNumber,
        hour: DriverNumber,
        day: DriverNumber,
        month: DriverNumber,
        year: DriverNumber,
    },
    storm: {
        rain: DriverNumber,
        // TODO fix wrong date parsing
        startDate: DriverDate,
    },
    sun: {
        rise: DriverDate,
        set: DriverDate,
        uvLevel: DriverNumber,
        solarRadiation: DriverNumber,
        et: {
            day: DriverNumber,
            month: DriverNumber,
        },
    },
    forecast: {
        text: DriverString,
        icon: DriverNumber,
        rule: DriverNumber,
    },
    batteries: {
        consoleVoltageLevel: DriverNumber,
        transmitterVoltageLevel: DriverNumber,
    },
    thswIndex: DriverNumber,
}

export type AdvancedHighsAndLowsData = {
    time: DriverDate,
    pressure: {
        day: {
            low: {
                value: DriverNumber,
                time: DriverDate,
            },
            high: {
                value: DriverNumber,
                time: DriverDate,
            },
        },
        month: {
            low: DriverNumber,
            high: DriverNumber,
        },
        year: {
            low: DriverNumber,
            high: DriverNumber,
        },
    },
    wind: {
        day: {
            value: DriverNumber,
            time: DriverDate,
        },
        month: DriverNumber,
        year: DriverNumber,
    },
    windChill: {
        day: {
            value: DriverNumber,
            time: DriverDate,
        },
        month: DriverNumber,
        year: DriverNumber,
    },
    dewpoint: {
        day: {
            low: {
                value: DriverNumber,
                time: DriverDate,
            },
            high: {
                value: DriverNumber,
                time: DriverDate,
            },
        },
        month: {
            low: DriverNumber,
            high: DriverNumber,
        },
        year: {
            low: DriverNumber,
            high: DriverNumber,
        },
    },
    heatIndex: {
        day: {
            value: DriverNumber,
            time: DriverDate,
        },
        month: DriverNumber,
        year: DriverNumber,
    },
    solarRadiation: {
        day: {
            value: DriverNumber,
            time: DriverDate,
        },
        month: DriverNumber,
        year: DriverNumber,
    },
    uvLevel: {
        day: {
            value: DriverNumber,
            time: DriverDate,
        },
        month: DriverNumber,
        year: DriverNumber,
    },
    rainRate: {
        day: {
            value: DriverNumber,
            time: DriverDate,
        },
        month: DriverNumber,
        year: DriverNumber,
    },
    temperature: {
        inside: {
            day: {
                low: {
                    value: DriverNumber,
                    time: DriverDate,
                },
                high: {
                    value: DriverNumber,
                    time: DriverDate,
                },
            },
            month: {
                low: DriverNumber,
                high: DriverNumber,
            },
            year: {
                low: DriverNumber,
                high: DriverNumber,
            },
        },
        outside: {
            day: {
                low: {
                    value: DriverNumber,
                    time: DriverDate,
                },
                high: {
                    value: DriverNumber,
                    time: DriverDate,
                },
            },
            month: {
                low: DriverNumber,
                high: DriverNumber,
            },
            year: {
                low: DriverNumber,
                high: DriverNumber,
            },
        },
    },
    humidity: {
        inside: {
            day: {
                low: {
                    value: DriverNumber,
                    time: DriverDate,
                },
                high: {
                    value: DriverNumber,
                    time: DriverDate,
                },
            },
            month: {
                low: DriverNumber,
                high: DriverNumber,
            },
            year: {
                low: DriverNumber,
                high: DriverNumber,
            },
        },
    },
}