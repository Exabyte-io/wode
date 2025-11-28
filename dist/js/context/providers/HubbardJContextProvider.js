"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubbardJContextProvider = void 0;
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const HubbardUContextProvider_1 = require("./HubbardUContextProvider");
const defaultHubbardConfig = {
    paramType: "U",
    atomicSpecies: "",
    atomicOrbital: "2p",
    value: 1.0,
};
class HubbardJContextProvider extends HubbardUContextProvider_1.HubbardUContextProvider {
    constructor() {
        super(...arguments);
        this.jsonSchemaId = "context-providers-directory/hubbard-j-context-provider";
    }
    get defaultData() {
        return [
            {
                ...defaultHubbardConfig,
                atomicSpecies: this.firstElement,
            },
        ];
    }
    get jsonSchemaPatchConfig() {
        return {
            "items.properties.paramType": {
                default: defaultHubbardConfig.paramType,
            },
            "items.properties.atomicSpecies": {
                enum: this.uniqueElementsWithLabels,
                default: this.firstElement,
            },
            "items.properties.atomicOrbital": {
                enum: this.orbitalList,
                default: defaultHubbardConfig.atomicOrbital,
            },
            "items.properties.value": {
                default: defaultHubbardConfig.value,
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
                paramType: this.defaultFieldStyles,
                atomicSpecies: this.defaultFieldStyles,
                atomicOrbital: this.defaultFieldStyles,
                value: this.defaultFieldStyles,
            },
        };
    }
    get jsonSchema() {
        return JSONSchemasInterface_1.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
    }
}
exports.HubbardJContextProvider = HubbardJContextProvider;
