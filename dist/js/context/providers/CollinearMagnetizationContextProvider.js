"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollinearMagnetizationContextProvider = void 0;
const ade_1 = require("@mat3ra/ade");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const lodash_1 = __importDefault(require("lodash"));
const MaterialContextMixin_1 = require("../mixins/MaterialContextMixin");
class CollinearMagnetizationContextProvider extends ade_1.JSONSchemaFormDataProvider {
    constructor(config) {
        var _a;
        super(config);
        this.jsonSchemaId = "context-providers-directory/collinear-magnetization-context-provider";
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
    get jsonSchemaPatchConfig() {
        return {
            "properties.startingMagnetization": {
                maxItems: this.uniqueElementsWithLabels.length,
            },
            "properties.startingMagnetization.items.properties.atomicSpecies": {
                enum: this.uniqueElementsWithLabels,
                default: this.firstElement,
            },
            "properties.startingMagnetization.items.properties.value": {
                default: 0.0,
            },
            "properties.isTotalMagnetization": {
                default: false,
            },
            "properties.totalMagnetization": {
                default: 0.0,
            },
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
        return JSONSchemasInterface_1.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
    }
}
exports.CollinearMagnetizationContextProvider = CollinearMagnetizationContextProvider;
(0, MaterialContextMixin_1.materialContextMixin)(CollinearMagnetizationContextProvider.prototype);
