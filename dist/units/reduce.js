"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.ReduceUnit = void 0;
var _enums = require("../enums");
var _base = require("./base");
class ReduceUnit extends _base.BaseUnit {
    constructor(unitName, mapUnit, input) {
        super({
            ...ReduceUnit.getReduceConfig(unitName, mapUnit, input),
        });
    }
    static getReduceConfig(unitName, mapUnit, input) {
        return {
            type: _enums.UNIT_TYPES.reduce,
            name: unitName,
            mapFlowchartId: mapUnit,
            input,
        };
    }
}
exports.ReduceUnit = ReduceUnit;
