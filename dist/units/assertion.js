"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.AssertionUnit = void 0;
var _enums = require("../enums");
var _base = require("./base");
class AssertionUnit extends _base.BaseUnit {
    constructor(config) {
        super({
            ...AssertionUnit.getAssertionConfig(),
            ...config,
        });
    }
    static getAssertionConfig() {
        return {
            name: _enums.UNIT_TYPES.assertion,
            type: _enums.UNIT_TYPES.assertion,
            statement: "true",
            errorMessage: "assertion failed",
        };
    }
    get statement() {
        return this.prop("statement");
    }
    get errorMessage() {
        return this.prop("errorMessage");
    }
    getHashObject() {
        return {
            statement: this.statement,
            errorMessage: this.errorMessage,
        };
    }
}
exports.AssertionUnit = AssertionUnit;
