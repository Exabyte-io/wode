"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollinearMagnetizationContextProvider = void 0;
const ade_1 = require("@mat3ra/ade");
const lodash_1 = __importDefault(require("lodash"));
const MaterialContextMixin_1 = require("../mixins/MaterialContextMixin");
class CollinearMagnetizationContextProvider extends ade_1.JSONSchemaFormDataProvider {
    constructor(config) {
        var _a;
        super(config);
        this.indexOfElement = (element) => {
            return this.uniqueElementsWithLabels.indexOf(element) + 1;
        };
        this.transformData = (data) => {
            const startingMagnetizationWithIndex = data.startingMagnetization.map((row) => ({
                ...row,
                index: this.indexOfElement(row.atomicSpecies),
            }));
            return {
                ...data,
                startingMagnetization: startingMagnetizationWithIndex,
            };
        };
        this.initMaterialContextMixin();
        this.firstElement =
            ((_a = this.uniqueElementsWithLabels) === null || _a === void 0 ? void 0 : _a.length) > 0 ? this.uniqueElementsWithLabels[0] : "";
        this.isTotalMagnetization = lodash_1.default.get(this.data, "isTotalMagnetization", false);
    }
    get uniqueElementsWithLabels() {
        var _a, _b;
        const elementsWithLabelsArray = ((_b = (_a = this.material) === null || _a === void 0 ? void 0 : _a.Basis) === null || _b === void 0 ? void 0 : _b.elementsWithLabelsArray) || [];
        return [...new Set(elementsWithLabelsArray)];
    }
    get defaultData() {
        return {
            startingMagnetization: [
                {
                    index: 1,
                    atomicSpecies: this.firstElement,
                    value: 0.0,
                },
            ],
            isTotalMagnetization: false,
            totalMagnetization: 0.0,
        };
    }
    get uiSchemaStyled() {
        return {
            startingMagnetization: {
                items: {
                    atomicSpecies: {
                        "ui:classNames": "col-xs-3",
                    },
                    value: {
                        "ui:classNames": "col-xs-6",
                    },
                },
                "ui:readonly": this.isTotalMagnetization,
            },
            isTotalMagnetization: {},
            totalMagnetization: {
                "ui:classNames": "col-xs-6",
                "ui:readonly": !this.isTotalMagnetization,
            },
        };
    }
    get jsonSchema() {
        return {
            $schema: "http://json-schema.org/draft-07/schema#",
            title: "",
            description: "Set starting magnetization, can have values in the range [-1, +1].",
            type: "object",
            properties: {
                startingMagnetization: {
                    type: "array",
                    maxItems: this.uniqueElementsWithLabels.length,
                    items: {
                        type: "object",
                        properties: {
                            atomicSpecies: {
                                type: "string",
                                title: "Atomic species",
                                enum: this.uniqueElementsWithLabels,
                                default: this.firstElement,
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
                isTotalMagnetization: {
                    type: "boolean",
                    title: "Set total magnetization instead",
                    default: false,
                },
                totalMagnetization: {
                    type: "number",
                    title: "Total magnetization",
                    default: 0.0,
                },
            },
        };
    }
}
exports.CollinearMagnetizationContextProvider = CollinearMagnetizationContextProvider;
(0, MaterialContextMixin_1.materialContextMixin)(CollinearMagnetizationContextProvider.prototype);
