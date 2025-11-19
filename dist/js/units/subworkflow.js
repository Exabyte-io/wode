"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubworkflowUnit = void 0;
var _enums = require("../enums");
var _base = require("./base");
class SubworkflowUnit extends _base.BaseUnit {
  constructor(config) {
    super({
      ...SubworkflowUnit.getSubworkflowConfig(),
      ...config
    });
  }
  static getSubworkflowConfig() {
    return {
      name: "New Subworkflow",
      type: _enums.UNIT_TYPES.subworkflow
    };
  }
}
exports.SubworkflowUnit = SubworkflowUnit;