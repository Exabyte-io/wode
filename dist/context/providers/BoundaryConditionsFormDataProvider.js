"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.BoundaryConditionsFormDataProvider = void 0;
var _JSONSchemaFormDataProvider = _interopRequireDefault(
    require("@exabyte-io/ade.js/dist/js/context/JSONSchemaFormDataProvider"),
);
var _made = require("@mat3ra/made");
var _utils = require("@mat3ra/utils");
var _MaterialContextMixin = require("../mixins/MaterialContextMixin");
function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
}
class BoundaryConditionsFormDataProvider extends _JSONSchemaFormDataProvider.default {
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
            targetFermiEnergy: 0,
        };
    }

    // eslint-disable-next-line class-methods-use-this
    get uiSchema() {
        return {
            type: {
                "ui:disabled": true,
            },
            offset: {
                "ui:disabled": true,
            },
            electricField: {},
            targetFermiEnergy: {},
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
        return {
            $schema: "http://json-schema.org/draft-07/schema#",
            type: "object",
            properties: {
                type: {
                    type: "string",
                    title: "Type",
                    default: this.defaultData.type,
                },
                offset: {
                    type: "number",
                    title: "Offset (A)",
                    default: this.defaultData.offset,
                },
                electricField: {
                    type: "number",
                    title: "Electric Field (eV/A)",
                    default: this.defaultData.electricField,
                },
                targetFermiEnergy: {
                    type: "number",
                    title: "Target Fermi Energy (eV)",
                    default: this.defaultData.targetFermiEnergy,
                },
            },
        };
    }
}
exports.BoundaryConditionsFormDataProvider = BoundaryConditionsFormDataProvider;
(0, _MaterialContextMixin.materialContextMixin)(BoundaryConditionsFormDataProvider.prototype);
