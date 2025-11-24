"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoundaryConditionsFormDataProvider = void 0;
var _ade = require("@mat3ra/ade");
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
var _made = require("@mat3ra/made");
var _utils = require("@mat3ra/utils");
var _MaterialContextMixin = require("../mixins/MaterialContextMixin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class BoundaryConditionsFormDataProvider extends _ade.JSONSchemaFormDataProvider {
  constructor(config) {
    super(config);
    _defineProperty(this, "jsonSchemaId", "context-providers-directory/boundary-conditions-data-provider");
    this.initMaterialContextMixin();
  }
  get boundaryConditions() {
    return this.material.metadata.boundaryConditions || {};
  }

  // eslint-disable-next-line class-methods-use-this
  get defaultData() {
    return {
      type: this.boundaryConditions.type || "pbc",
      offset: this.boundaryConditions.offset || 0,
      electricField: 0,
      targetFermiEnergy: 0
    };
  }
  get jsonSchemaPatchConfig() {
    const defaults = this.defaultData;
    return {
      type: {
        default: defaults.type
      },
      offset: {
        default: defaults.offset
      },
      electricField: {
        default: defaults.electricField
      },
      targetFermiEnergy: {
        default: defaults.targetFermiEnergy
      }
    };
  }

  // TODO: MOVE to WA/wove instantiation
  // eslint-disable-next-line class-methods-use-this
  get uiSchema() {
    return {
      type: {
        "ui:disabled": true
      },
      offset: {
        "ui:disabled": true
      },
      electricField: {},
      targetFermiEnergy: {}
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get humanName() {
    return "Boundary Conditions";
  }
  yieldDataForRendering() {
    const data = _utils.Utils.clone.deepClone(this.yieldData());
    data.boundaryConditions.offset *= _made.Made.coefficients.ANGSTROM_TO_BOHR;
    data.boundaryConditions.targetFermiEnergy *= _made.Made.coefficients.EV_TO_RY;
    data.boundaryConditions.electricField *= _made.Made.coefficients.EV_A_TO_RY_BOHR;
    return data;
  }
  get jsonSchema() {
    return _JSONSchemasInterface.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
  }
}
exports.BoundaryConditionsFormDataProvider = BoundaryConditionsFormDataProvider;
(0, _MaterialContextMixin.materialContextMixin)(BoundaryConditionsFormDataProvider.prototype);