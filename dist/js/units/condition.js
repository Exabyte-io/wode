"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionUnit = void 0;
var _enums = require("../enums");
var _base = require("./base");
class ConditionUnit extends _base.BaseUnit {
  constructor(config) {
    super({
      ...ConditionUnit.getConditionConfig(),
      ...config
    });
  }
  static getConditionConfig() {
    return {
      name: _enums.UNIT_TYPES.condition,
      type: _enums.UNIT_TYPES.condition,
      input: [],
      results: [],
      preProcessors: [],
      postProcessors: [],
      then: undefined,
      else: undefined,
      statement: "true",
      maxOccurrences: 100
    };
  }
  get input() {
    return this.prop("input");
  }
  get then() {
    return this.prop("then");
  }
  get else() {
    return this.prop("else");
  }
  get statement() {
    return this.prop("statement");
  }
  get maxOccurrences() {
    return this.prop("maxOccurrences");
  }
  getHashObject() {
    return {
      statement: this.statement,
      maxOccurrences: this.maxOccurrences
    };
  }
}
exports.ConditionUnit = ConditionUnit;