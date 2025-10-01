"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.UniformKGridConvergence = void 0;
var _parameter = require("./parameter");
class UniformKGridConvergence extends _parameter.ConvergenceParameter {
    get increment() {
        return `${this.name} + ${this._increment}`;
    }
    get unitContext() {
        return {
            kgrid: {
                dimensions: [`{{${this.name}}}`, `{{${this.name}}}`, `{{${this.name}}}`],
                shifts: [0, 0, 0],
            },
            isKgridEdited: true,
            isUsingJinjaVariables: true,
        };
    }
    get finalValue() {
        return `${this.name} + 0`;
    }
}
exports.UniformKGridConvergence = UniformKGridConvergence;
