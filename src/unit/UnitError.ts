/**
 * Represents an error occurring while working with units.
 */
export default class UnitError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}
