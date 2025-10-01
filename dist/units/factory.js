"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
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
function _defineProperty(e, r, t) {
    return (
        (r = _toPropertyKey(r)) in e
            ? Object.defineProperty(e, r, {
                  value: t,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
              })
            : (e[r] = t),
        e
    );
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
class UnitFactory {
    static create(config) {
        switch (config.type) {
            case _enums.UNIT_TYPES.execution:
                return new this.ExecutionUnit(config);
            case _enums.UNIT_TYPES.assignment:
                return new this.AssignmentUnit(config);
            case _enums.UNIT_TYPES.condition:
                return new this.ConditionUnit(config);
            case _enums.UNIT_TYPES.io:
                return new this.IOUnit(config);
            case _enums.UNIT_TYPES.processing:
                return new this.ProcessingUnit(config);
            case _enums.UNIT_TYPES.map:
                return new this.MapUnit(config);
            case _enums.UNIT_TYPES.subworkflow:
                return new this.SubworkflowUnit(config);
            case _enums.UNIT_TYPES.assertion:
                return new this.AssertionUnit(config);
            default:
                return new this.BaseUnit(config);
        }
    }
}
exports.UnitFactory = UnitFactory;
_defineProperty(UnitFactory, "AssertionUnit", _assertion.AssertionUnit);
_defineProperty(UnitFactory, "AssignmentUnit", _assignment.AssignmentUnit);
_defineProperty(UnitFactory, "BaseUnit", _base.BaseUnit);
_defineProperty(UnitFactory, "ConditionUnit", _condition.ConditionUnit);
_defineProperty(UnitFactory, "ExecutionUnit", _execution.ExecutionUnit);
_defineProperty(UnitFactory, "IOUnit", _io.IOUnit);
_defineProperty(UnitFactory, "MapUnit", _map.MapUnit);
_defineProperty(UnitFactory, "ProcessingUnit", _processing.ProcessingUnit);
_defineProperty(UnitFactory, "SubworkflowUnit", _subworkflow.SubworkflowUnit);
