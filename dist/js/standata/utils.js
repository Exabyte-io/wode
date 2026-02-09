"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyConfig = applyConfig;
exports.findUnit = findUnit;
/**
 * @summary Apply configuration data to an object
 * @param obj {*} object / class containing methods or attributes to be set
 * @param config { functions: {}, attributes: {} } functions to call and attributes to set
 * @param callBuild {boolean} if true; call build between applying functions and attributes
 * @returns {*} updated object
 */
function applyConfig({ obj, config = {}, callBuild = false, }) {
    const { functions = {}, attributes = {} } = config;
    // eslint-disable-next-line no-restricted-syntax
    for (const [func, args] of Object.entries(functions)) {
        // eslint-disable-next-line no-nested-ternary
        if (obj[func]) {
            if (args)
                obj[func](args);
            else
                obj[func]();
        }
    }
    const modified = callBuild ? obj.build() : obj;
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, values] of Object.entries(attributes)) {
        modified[key] = values;
    }
    return modified;
}
/**
 * @summary Safely extract unit object from subworkflow data
 */
function findUnit({ subworkflowData, index, type, }) {
    const unit = subworkflowData.units[index];
    if (unit.type !== type)
        throw new Error("findUnit() error: unit type does not match!");
    return unit;
}
