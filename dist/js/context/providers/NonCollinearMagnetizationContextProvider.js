"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonCollinearMagnetizationContextProvider = void 0;
const ade_1 = require("@mat3ra/ade");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const lodash_1 = __importDefault(require("lodash"));
const MaterialContextMixin_1 = require("../mixins/MaterialContextMixin");
class NonCollinearMagnetizationContextProvider extends ade_1.JSONSchemaFormDataProvider {
    constructor(config) {
        super(config);
        this.jsonSchemaId = "context-providers-directory/non-collinear-magnetization-context-provider";
        this.initMaterialContextMixin();
        this.isStartingMagnetization = lodash_1.default.get(this.data, "isStartingMagnetization", true);
        this.isConstrainedMagnetization = lodash_1.default.get(this.data, "isConstrainedMagnetization", false);
        this.isExistingChargeDensity = lodash_1.default.get(this.data, "isExistingChargeDensity", false);
        this.isArbitrarySpinDirection = lodash_1.default.get(this.data, "isArbitrarySpinDirection", false);
        this.isFixedMagnetization = lodash_1.default.get(this.data, "isFixedMagnetization", false);
        this.constrainedMagnetization = lodash_1.default.get(this.data, "constrainedMagnetization", {});
    }
    get uniqueElementsWithLabels() {
        var _a, _b;
        const elementsWithLabelsArray = ((_b = (_a = this.material) === null || _a === void 0 ? void 0 : _a.Basis) === null || _b === void 0 ? void 0 : _b.elementsWithLabelsArray) || [];
        return [...new Set(elementsWithLabelsArray)];
    }
    get defaultData() {
        const startingMagnetization = this.uniqueElementsWithLabels.map((element, index) => {
            return {
                index: index + 1,
                atomicSpecies: element,
                value: 0.0,
            };
        });
        const spinAngles = this.uniqueElementsWithLabels.map((element, index) => {
            return {
                index: index + 1,
                atomicSpecies: element,
                angle1: 0.0,
                angle2: 0.0,
            };
        });
        return {
            isExistingChargeDensity: false,
            isStartingMagnetization: true,
            isConstrainedMagnetization: false,
            isArbitrarySpinAngle: false,
            isFixedMagnetization: false,
            lforcet: true,
            spinAngles,
            startingMagnetization,
            constrainedMagnetization: {
                lambda: 0.0,
                constrainType: "atomic direction",
            },
            fixedMagnetization: {
                x: 0.0,
                y: 0.0,
                z: 0.0,
            },
        };
    }
    get uiSchemaStyled() {
        var _a, _b;
        return {
            isExistingChargeDensity: {},
            lforcet: {
                "ui:readonly": !this.isExistingChargeDensity,
                "ui:widget": "radio",
                "ui:options": {
                    inline: true,
                },
            },
            isArbitrarySpinDirection: {},
            spinAngles: {
                items: {
                    atomicSpecies: {
                        ...this.defaultFieldStyles,
                        "ui:readonly": true,
                    },
                    angle1: this.defaultFieldStyles,
                    angle2: this.defaultFieldStyles,
                },
                "ui:readonly": !this.isArbitrarySpinDirection,
                "ui:options": {
                    addable: false,
                    orderable: false,
                    removable: false,
                },
            },
            isStartingMagnetization: {},
            startingMagnetization: {
                items: {
                    atomicSpecies: {
                        ...this.defaultFieldStyles,
                        "ui:readonly": true,
                    },
                    value: {
                        "ui:classNames": "col-xs-6",
                    },
                },
                "ui:readonly": !this.isStartingMagnetization,
                "ui:options": {
                    addable: false,
                    orderable: false,
                    removable: false,
                },
            },
            isConstrainedMagnetization: {},
            constrainedMagnetization: {
                constrainType: this.defaultFieldStyles,
                lambda: this.defaultFieldStyles,
                "ui:readonly": !this.isConstrainedMagnetization,
            },
            isFixedMagnetization: {
                "ui:readonly": !(this.isConstrainedMagnetization &&
                    ((_a = this.constrainedMagnetization) === null || _a === void 0 ? void 0 : _a.constrainType) === "total"),
            },
            fixedMagnetization: {
                x: this.defaultFieldStyles,
                y: this.defaultFieldStyles,
                z: this.defaultFieldStyles,
                "ui:readonly": !(this.isFixedMagnetization &&
                    this.isConstrainedMagnetization &&
                    ((_b = this.constrainedMagnetization) === null || _b === void 0 ? void 0 : _b.constrainType) === "total"),
            },
        };
    }
    get jsonSchemaPatchConfig() {
        return {
            isExistingChargeDensity: { default: false },
            isStartingMagnetization: { default: true },
            isArbitrarySpinAngle: { default: false },
            isConstrainedMagnetization: { default: false },
            isFixedMagnetization: { default: true },
            startingMagnetization: {
                minItems: this.uniqueElementsWithLabels.length,
                maxItems: this.uniqueElementsWithLabels.length,
            },
            "startingMagnetization.items.properties.value": {
                default: 0.0,
                minimum: -1.0,
                maximum: 1.0,
            },
            spinAngles: {
                minItems: this.uniqueElementsWithLabels.length,
                maxItems: this.uniqueElementsWithLabels.length,
            },
            "spinAngles.items.properties.angle1": { default: 0.0 },
            "spinAngles.items.properties.angle2": { default: 0.0 },
            "constrainedMagnetization.properties.constrainType": {
                default: "atomic direction",
            },
            "constrainedMagnetization.properties.lambda": { default: 0.0 },
            "fixedMagnetization.properties.x": { default: 0.0 },
            "fixedMagnetization.properties.y": { default: 0.0 },
            "fixedMagnetization.properties.z": { default: 0.0 },
        };
    }
    get jsonSchema() {
        return JSONSchemasInterface_1.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
    }
}
exports.NonCollinearMagnetizationContextProvider = NonCollinearMagnetizationContextProvider;
(0, MaterialContextMixin_1.materialContextMixin)(NonCollinearMagnetizationContextProvider.prototype);
