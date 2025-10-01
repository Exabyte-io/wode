"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.AssignmentUnit = void 0;
var _enums = require("../enums");
var _base = require("./base");
class AssignmentUnit extends _base.BaseUnit {
    constructor(config) {
        super({
            ...AssignmentUnit.getAssignmentConfig(),
            ...config,
        });
    }
    static getAssignmentConfig() {
        return {
            name: _enums.UNIT_TYPES.assignment,
            type: _enums.UNIT_TYPES.assignment,
            operand: "X",
            value: "1",
            input: [],
        };
    }
    get operand() {
        return this.prop("operand");
    }
    get value() {
        return this.prop("value");
    }
    get input() {
        return this.prop("input");
    }
    getHashObject() {
        return {
            input: this.input,
            operand: this.operand,
            value: this.value,
        };
    }
}
exports.AssignmentUnit = AssignmentUnit;
