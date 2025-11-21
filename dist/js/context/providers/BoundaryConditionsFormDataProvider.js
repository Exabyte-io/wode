"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoundaryConditionsFormDataProvider = void 0;
var _ade = require("@mat3ra/ade");
var _boundary_conditions_provider = _interopRequireDefault(require("@mat3ra/esse/dist/js/schema/context_providers_directory/boundary_conditions_provider.json"));
var _made = require("@mat3ra/made");
var _utils = require("@mat3ra/utils");
var _MaterialContextMixin = require("../mixins/MaterialContextMixin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class BoundaryConditionsFormDataProvider extends _ade.JSONSchemaFormDataProvider {
  constructor(config) {
    super(config);
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

  // eslint-disable-next-line class-methods-use-this
  getPatchedSchemaWithDefaults(schema, defaults) {
    const patchedSchema = _utils.Utils.clone.deepClone(schema);
    if (!patchedSchema.properties) {
      return patchedSchema;
    }
    Object.entries(defaults).forEach(([propertyName, defaultValue]) => {
      const propertySchema = patchedSchema.properties?.[propertyName];
      if (propertySchema && typeof propertySchema === "object") {
        propertySchema.default = defaultValue;
      }
    });
    return patchedSchema;
  }
  get jsonSchema() {
    return this.getPatchedSchemaWithDefaults(_boundary_conditions_provider.default, this.defaultData);
  }
}
exports.BoundaryConditionsFormDataProvider = BoundaryConditionsFormDataProvider;
(0, _MaterialContextMixin.materialContextMixin)(BoundaryConditionsFormDataProvider.prototype);