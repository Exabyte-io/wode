"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubbardUContextProvider = void 0;
const ade_1 = require("@mat3ra/ade");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const MaterialContextMixin_1 = require("../mixins/MaterialContextMixin");
const defaultHubbardConfig = {
    atomicSpecies: "",
    atomicOrbital: "2p",
    hubbardUValue: 1.0,
};
class HubbardUContextProvider extends ade_1.JSONSchemaFormDataProvider {
    constructor(config) {
        var _a, _b, _c, _d, _e;
        super(config);
        this.jsonSchemaId = "context-providers-directory/hubbard-u-context-provider";
        this.initMaterialContextMixin();
        this.uniqueElements = ((_b = (_a = this.material) === null || _a === void 0 ? void 0 : _a.Basis) === null || _b === void 0 ? void 0 : _b.uniqueElements) || [];
        this.orbitalList = [
            "2p",
            "3s",
            "3p",
            "3d",
            "4s",
            "4p",
            "4d",
            "4f",
            "5s",
            "5p",
            "5d",
            "5f",
            "6s",
            "6p",
            "6d",
            "7s",
            "7p",
            "7d",
        ];
        const _elementsWithLabels = ((_d = (_c = this.material) === null || _c === void 0 ? void 0 : _c.Basis) === null || _d === void 0 ? void 0 : _d.elementsWithLabelsArray) || [];
        this.uniqueElementsWithLabels = [...new Set(_elementsWithLabels)];
        this.firstElement =
            ((_e = this.uniqueElementsWithLabels) === null || _e === void 0 ? void 0 : _e.length) > 0 ? this.uniqueElementsWithLabels[0] : "";
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
            "items.properties.atomicSpecies": {
                enum: this.uniqueElementsWithLabels,
                default: this.firstElement,
            },
            "items.properties.atomicOrbital": {
                enum: this.orbitalList,
                default: defaultHubbardConfig.atomicOrbital,
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
                atomicOrbital: this.defaultFieldStyles,
                hubbardUValue: this.defaultFieldStyles,
            },
        };
    }
    get jsonSchema() {
        return JSONSchemasInterface_1.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
    }
}
exports.HubbardUContextProvider = HubbardUContextProvider;
(0, MaterialContextMixin_1.materialContextMixin)(HubbardUContextProvider.prototype);
