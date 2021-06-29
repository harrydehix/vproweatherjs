/**
 * Parses the vproweather's string data to javascript object's.
 * @param {*} data the driver's string data
 * @param {*} colonAsDevider whether to use ':' as devider (instead of '=')
 * @returns the parsed data
 */
module.exports = function (data, colonAsDevider = false) {
    // split string into array of the pattern ["key = value", ["key = value"], ...]
    const dataAsArray = data.split("\n");

    // loop through array to parse strings into actual key-value-pairs
    const dataAsObject = {};
    for (let i = 0; i < dataAsArray.length; i++) {
        const keyValuePair = dataAsArray[i];
        let temp;
        if (colonAsDevider) temp = keyValuePair.split(":");
        else temp = keyValuePair.split("=");

        if (temp.length === 1) continue;

        const key = temp[0].trim();
        let value = temp[1].trim();

        if (!Number.isNaN(value) && key !== "rtNextArchiveRecord")
            value = Number(value);
        else if (value === "n/a") value = null;
        else if (value === "no" || value === "yes") value = value === "yes";
        else if (key === "DavisTime") value = new Date(value);

        dataAsObject[key] = value;
    }
    return dataAsObject;
};
