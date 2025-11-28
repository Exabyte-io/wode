"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubbardContextProviderLegacy = void 0;
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const HubbardUContextProvider_1 = require("./HubbardUContextProvider");
const defaultHubbardConfig = {
    hubbardUValue: 1.0,
};
class HubbardContextProviderLegacy extends HubbardUContextProvider_1.HubbardUContextProvider {
    constructor() {
        super(...arguments);
        this.jsonSchemaId = "context-providers-directory/hubbard-legacy-context-provider";
        this.speciesIndexFromSpecies = (species) => {
            var _a;
            return ((_a = this.uniqueElementsWithLabels) === null || _a === void 0 ? void 0 : _a.length) > 0
                ? this.uniqueElementsWithLabels.indexOf(species) + 1
                : null;
        };
        this.transformData = (data) => {
            return data.map((row) => ({
                ...row,
                atomicSpeciesIndex: this.speciesIndexFromSpecies(row.atomicSpecies),
            }));
        };
    }
    get defaultData() {
        var _a;
        return [
            {
                ...defaultHubbardConfig,
                atomicSpecies: this.firstElement,
                atomicSpeciesIndex: ((_a = this.uniqueElementsWithLabels) === null || _a === void 0 ? void 0 : _a.length) > 0 ? 1 : null,
            },
        ];
    }
    get jsonSchemaPatchConfig() {
        return {
            "items.properties.atomicSpecies": {
                enum: this.uniqueElementsWithLabels,
            },
            "items.properties.hubbardUValue": {
                default: defaultHubbardConfig.hubbardUValue,
            },
        };
    }
    get uiSchemaStyled() {
        return {
            "ui:options": {
                addable: true,
                orderable: false,
                removable: true,
            },
            items: {
                atomicSpecies: this.defaultFieldStyles,
                atomicSpeciesIndex: { ...this.defaultFieldStyles, "ui:readonly": true },
                hubbardUValue: this.defaultFieldStyles,
            },
        };
    }
    get jsonSchema() {
        return JSONSchemasInterface_1.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
    }
}
exports.HubbardContextProviderLegacy = HubbardContextProviderLegacy;
