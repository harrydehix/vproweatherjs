/**
 * Driver errors are caused by the vproweather driver.
 */
module.exports = class DriverError extends Error {
    constructor(message, statusCode) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
};
