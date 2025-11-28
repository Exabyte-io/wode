"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundaryConditionsFormDataProvider = void 0;
const ade_1 = require("@mat3ra/ade");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const made_1 = require("@mat3ra/made");
const utils_1 = require("@mat3ra/utils");
const MaterialContextMixin_1 = require("../mixins/MaterialContextMixin");
class BoundaryConditionsFormDataProvider extends ade_1.JSONSchemaFormDataProvider {
    constructor(config) {
        super(config);
        this.jsonSchemaId = "context-providers-directory/boundary-conditions-data-provider";
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
    get jsonSchemaPatchConfig() {
        const defaults = this.defaultData;
        return {
            type: { default: defaults.type },
            offset: { default: defaults.offset },
            electricField: { default: defaults.electricField },
            targetFermiEnergy: { default: defaults.targetFermiEnergy },
        };
    }
    // TODO: MOVE to WA/wove instantiation
    // eslint-disable-next-line class-methods-use-this
    get uiSchema() {
        return {
            type: { "ui:disabled": true },
            offset: { "ui:disabled": true },
            electricField: {},
            targetFermiEnergy: {},
        };
    }
    // eslint-disable-next-line class-methods-use-this
    get humanName() {
        return "Boundary Conditions";
    }
    yieldDataForRendering() {
        const data = utils_1.Utils.clone.deepClone(this.yieldData());
        data.boundaryConditions.offset *= made_1.Made.coefficients.ANGSTROM_TO_BOHR;
        data.boundaryConditions.targetFermiEnergy *= made_1.Made.coefficients.EV_TO_RY;
        data.boundaryConditions.electricField *= made_1.Made.coefficients.EV_A_TO_RY_BOHR;
        return data;
    }
    get jsonSchema() {
        return JSONSchemasInterface_1.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
    }
}
exports.BoundaryConditionsFormDataProvider = BoundaryConditionsFormDataProvider;
(0, MaterialContextMixin_1.materialContextMixin)(BoundaryConditionsFormDataProvider.prototype);
