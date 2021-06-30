import * as util from "util";

/**
 * Inspects an object. Only for development purposes.
 * @param {Object} obj object to inspect
 */
export default function inspect(obj): void {
    console.log(
        util.inspect(obj, { showHidden: false, depth: null, colors: true })
    );
}