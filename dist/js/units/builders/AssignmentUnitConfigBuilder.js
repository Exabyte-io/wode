"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssignmentUnitConfigBuilder = void 0;
var _enums = require("../../enums");
var _UnitConfigBuilder = require("./UnitConfigBuilder");
class AssignmentUnitConfigBuilder extends _UnitConfigBuilder.UnitConfigBuilder {
  constructor(name, variableName, variableValue, input = [], results = []) {
    super({
      name,
      type: _enums.UNIT_TYPES.assignment
    });
    this._variableName = variableName;
    this._variableValue = variableValue;
    this._input = input;
    this._results = results;
  }
  input(arr) {
    this._input = arr;
    return this;
  }
  variableName(str) {
    this._variableName = str;
    return this;
  }
  variableValue(str) {
    this._variableValue = str;
    return this;
  }
  build() {
    return {
      ...super.build(),
      input: this._input,
      operand: this._variableName,
      value: this._variableValue
    };
  }
}
exports.AssignmentUnitConfigBuilder = AssignmentUnitConfigBuilder;