"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonCollinearMagnetizationContextProvider = void 0;
const ade_1 = require("@mat3ra/ade");
const lodash_1 = __importDefault(require("lodash"));
const MaterialContextMixin_1 = require("../mixins/MaterialContextMixin");
class NonCollinearMagnetizationContextProvider extends ade_1.JSONSchemaFormDataProvider {
    constructor(config) {
        super(config);
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
    get jsonSchema() {
        return {
            $schema: "http://json-schema.org/draft-07/schema#",
            title: "",
            description: "Set initial parameters for non-collinear spin magnetic (SOC) calculation.",
            type: "object",
            properties: {
                isStartingMagnetization: {
                    type: "boolean",
                    title: "Set starting magnetization",
                    default: true,
                },
                startingMagnetization: {
                    type: "array",
                    minItems: this.uniqueElementsWithLabels.length,
                    maxItems: this.uniqueElementsWithLabels.length,
                    items: {
                        type: "object",
                        properties: {
                            atomicSpecies: {
                                type: "string",
                                title: "Atomic species",
                            },
                            value: {
                                type: "number",
                                title: "Starting magnetization",
                                default: 0.0,
                                minimum: -1.0,
                                maximum: 1.0,
                            },
                        },
                    },
                },
                isExistingChargeDensity: {
                    type: "boolean",
                    title: "Start calculation from existing charge density",
                    default: false,
                },
                lforcet: {
                    title: "Set lforcet to",
                    type: "boolean",
                    oneOf: [
                        { const: true, title: "True" },
                        { const: false, title: "False" },
                    ],
                },
                isArbitrarySpinDirection: {
                    type: "boolean",
                    title: "Set spin directions",
                    default: false,
                },
                spinAngles: {
                    type: "array",
                    minItems: this.uniqueElementsWithLabels.length,
                    maxItems: this.uniqueElementsWithLabels.length,
                    items: {
                        type: "object",
                        properties: {
                            atomicSpecies: {
                                type: "string",
                                title: "Atomic species",
                            },
                            angle1: {
                                type: "number",
                                title: "Angle1 (deg)",
                                default: 0.0,
                            },
                            angle2: {
                                type: "number",
                                title: "Angle2 (deg)",
                                default: 0.0,
                            },
                        },
                    },
                },
                isConstrainedMagnetization: {
                    type: "boolean",
                    title: "Set constrained magnetization",
                    default: false,
                },
                constrainedMagnetization: {
                    type: "object",
                    properties: {
                        constrainType: {
                            type: "string",
                            title: "Constrain type",
                            enum: [
                                "none",
                                "total",
                                "atomic",
                                "total direction",
                                "atomic direction",
                            ],
                            default: "atomic direction",
                        },
                        lambda: {
                            type: "number",
                            title: "lambda",
                            default: 0.0,
                        },
                    },
                },
                isFixedMagnetization: {
                    type: "boolean",
                    title: "Set Fixed magnetization (only applicable to constrained magnetization of 'total' type)",
                    default: true,
                },
                fixedMagnetization: {
                    type: "object",
                    properties: {
                        x: {
                            type: "number",
                            title: "X-component",
                            default: 0.0,
                        },
                        y: {
                            type: "number",
                            title: "Y-component",
                            default: 0.0,
                        },
                        z: {
                            type: "number",
                            title: "Z-component",
                            default: 0.0,
                        },
                    },
                },
            },
        };
    }
}
exports.NonCollinearMagnetizationContextProvider = NonCollinearMagnetizationContextProvider;
(0, MaterialContextMixin_1.materialContextMixin)(NonCollinearMagnetizationContextProvider.prototype);
