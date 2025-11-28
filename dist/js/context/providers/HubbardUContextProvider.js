"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubbardUContextProvider = void 0;
const ade_1 = require("@mat3ra/ade");
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
        return {
            $schema: "http://json-schema.org/draft-07/schema#",
            title: "",
            description: "Hubbard U parameters for DFT+U or DFT+U+V calculation.",
            type: "array",
            items: {
                type: "object",
                properties: {
                    atomicSpecies: {
                        type: "string",
                        title: "Atomic species",
                        enum: this.uniqueElementsWithLabels,
                        default: this.firstElement,
                    },
                    atomicOrbital: {
                        type: "string",
                        title: "Atomic orbital",
                        enum: this.orbitalList,
                        default: defaultHubbardConfig.atomicOrbital,
                    },
                    hubbardUValue: {
                        type: "number",
                        title: "Hubbard U (eV)",
                        default: defaultHubbardConfig.hubbardUValue,
                    },
                },
            },
        };
    }
}
exports.HubbardUContextProvider = HubbardUContextProvider;
(0, MaterialContextMixin_1.materialContextMixin)(HubbardUContextProvider.prototype);
