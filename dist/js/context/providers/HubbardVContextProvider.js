"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubbardVContextProvider = void 0;
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const HubbardUContextProvider_1 = require("./HubbardUContextProvider");
const defaultHubbardConfig = {
    atomicSpecies: "",
    atomicOrbital: "2p",
    atomicSpecies2: "",
    atomicOrbital2: "2p",
    siteIndex: 1,
    siteIndex2: 1,
    hubbardVValue: 1.0,
};
class HubbardVContextProvider extends HubbardUContextProvider_1.HubbardUContextProvider {
    constructor() {
        super(...arguments);
        this.jsonSchemaId = "context-providers-directory/hubbard-v-context-provider";
    }
    get defaultData() {
        var _a;
        return [
            {
                ...defaultHubbardConfig,
                atomicSpecies: this.firstSpecies,
                atomicSpecies2: this.secondSpecies,
                siteIndex2: ((_a = this.uniqueElementsWithLabels) === null || _a === void 0 ? void 0 : _a.length) > 1 ? 2 : defaultHubbardConfig.siteIndex2,
            },
        ];
    }
    get firstSpecies() {
        return this.firstElement;
    }
    get secondSpecies() {
        var _a;
        return ((_a = this.uniqueElementsWithLabels) === null || _a === void 0 ? void 0 : _a.length) > 1
            ? this.uniqueElementsWithLabels[1]
            : this.firstSpecies;
    }
    get jsonSchemaPatchConfig() {
        var _a;
        return {
            "items.properties.atomicSpecies": {
                enum: this.uniqueElementsWithLabels,
                default: this.firstSpecies,
            },
            "items.properties.siteIndex": {
                default: defaultHubbardConfig.siteIndex,
            },
            "items.properties.atomicOrbital": {
                enum: this.orbitalList,
                default: defaultHubbardConfig.atomicOrbital,
            },
            "items.properties.atomicSpecies2": {
                enum: this.uniqueElementsWithLabels,
                default: this.secondSpecies,
            },
            "items.properties.siteIndex2": {
                default: ((_a = this.uniqueElementsWithLabels) === null || _a === void 0 ? void 0 : _a.length) > 1 ? 2 : defaultHubbardConfig.siteIndex2,
            },
            "items.properties.atomicOrbital2": {
                enum: this.orbitalList,
                default: defaultHubbardConfig.atomicOrbital,
            },
            "items.properties.hubbardVValue": {
                default: defaultHubbardConfig.hubbardVValue,
            },
        };
    }
    get uiSchemaStyled() {
        return {
            "ui:options": {
                addable: true,
                orderable: true,
                removable: true,
            },
            items: {
                atomicSpecies: this.defaultFieldStyles,
                atomicOrbital: this.defaultFieldStyles,
                atomicSpecies2: this.defaultFieldStyles,
                atomicOrbital2: this.defaultFieldStyles,
                siteIndex: this.defaultFieldStyles,
                siteIndex2: this.defaultFieldStyles,
                hubbardVValue: this.defaultFieldStyles,
            },
        };
    }
    get jsonSchema() {
        return JSONSchemasInterface_1.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
    }
}
exports.HubbardVContextProvider = HubbardVContextProvider;
