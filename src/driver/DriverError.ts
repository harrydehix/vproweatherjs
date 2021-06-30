/**
 * Driver errors are caused by the vproweather driver.
 */
export default class DriverError extends Error {
    constructor(message: string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}
