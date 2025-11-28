"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnitFactory = void 0;
var _enums = require("../enums");
var _assertion = require("./assertion");
var _assignment = require("./assignment");
var _base = require("./base");
var _condition = require("./condition");
var _execution = require("./execution");
var _io = require("./io");
var _map = require("./map");
var _processing = require("./processing");
var _subworkflow = require("./subworkflow");
class UnitFactory {
  static create(config) {
    switch (config.type) {
      case _enums.UNIT_TYPES.execution:
        return new _execution.ExecutionUnit(config);
      case _enums.UNIT_TYPES.assignment:
        return new _assignment.AssignmentUnit(config);
      case _enums.UNIT_TYPES.condition:
        return new _condition.ConditionUnit(config);
      case _enums.UNIT_TYPES.io:
        return new _io.IOUnit(config);
      case _enums.UNIT_TYPES.processing:
        return new _processing.ProcessingUnit(config);
      case _enums.UNIT_TYPES.map:
        return new _map.MapUnit(config);
      case _enums.UNIT_TYPES.subworkflow:
        return new _subworkflow.SubworkflowUnit(config);
      case _enums.UNIT_TYPES.assertion:
        return new _assertion.AssertionUnit(config);
      default:
        return new _base.BaseUnit(config);
    }
  }
}
exports.UnitFactory = UnitFactory;