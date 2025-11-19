"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssertionUnitConfigBuilder = void 0;
var _enums = require("../../enums");
var _UnitConfigBuilder = require("./UnitConfigBuilder");
class AssertionUnitConfigBuilder extends _UnitConfigBuilder.UnitConfigBuilder {
  constructor(name, statement, errorMessage) {
    super({
      name,
      type: _enums.UNIT_TYPES.assertion
    });
    this._statement = statement;
    this._errorMessage = errorMessage;
  }
  statement(str) {
    this._statement = str;
    return this;
  }
  errorMessage(str) {
    this._errorMessage = str;
    return this;
  }
  build() {
    return {
      ...super.build(),
      statement: this._statement,
      errorMessage: this._errorMessage
    };
  }
}
exports.AssertionUnitConfigBuilder = AssertionUnitConfigBuilder;