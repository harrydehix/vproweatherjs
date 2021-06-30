/**
 * Abstract class representing the basic structure of any implemented vproweather-driver interface.
 */
export default abstract class VPDriverInterface {
    public abstract getHighsAndLows(): Promise<any>;
    public abstract getRealtimeData(): Promise<any>;
    public abstract getTime(): Promise<Date>;
    public abstract synchronizeTime(): Promise<void>;
    public abstract setBackgroundLight(enabled: boolean): Promise<void>;
    public abstract getModelName(): Promise<string>;
}

export type DriverNumber = number | null;
export type DriverDate = Date | null;
export type DriverBoolean = boolean | null;
export type DriverString = string | null;
export type AnyDriverType = DriverBoolean | DriverDate | DriverNumber | DriverString;