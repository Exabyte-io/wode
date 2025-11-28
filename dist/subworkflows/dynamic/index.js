"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dynamicSubworkflowsByApp = void 0;
Object.defineProperty(exports, "getSurfaceEnergySubworkflowUnits", {
  enumerable: true,
  get: function () {
    return _surfaceEnergy.getSurfaceEnergySubworkflowUnits;
  }
});
var _getQpointIrrep = require("./espresso/getQpointIrrep");
var _surfaceEnergy = require("./surfaceEnergy");
const dynamicSubworkflowsByApp = exports.dynamicSubworkflowsByApp = {
  espresso: {
    getQpointIrrep: _getQpointIrrep.getQpointIrrep
  }
};