"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.ProcessingUnit = void 0;
var _enums = require("../enums");
var _base = require("./base");
class ProcessingUnit extends _base.BaseUnit {
    constructor(config) {
        super({
            ...ProcessingUnit.getProcessingConfig(),
            ...config,
        });
    }
    static getProcessingConfig() {
        return {
            name: _enums.UNIT_TYPES.processing,
            type: _enums.UNIT_TYPES.processing,
        };
    }
    setOperation(op) {
        this.setProp("operation", op);
    }
    setOperationType(type) {
        this.setProp("operationType", type);
    }
    setInput(input) {
        this.setProp("input", input);
    }
    get operation() {
        return this.prop("operation");
    }
    get operationType() {
        return this.prop("operationType");
    }
    get input() {
        return this.prop("input");
    }
}
exports.ProcessingUnit = ProcessingUnit;
