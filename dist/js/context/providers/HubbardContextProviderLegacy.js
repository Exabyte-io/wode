"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubbardContextProviderLegacy = void 0;
const HubbardUContextProvider_1 = require("./HubbardUContextProvider");
const defaultHubbardConfig = {
    hubbardUValue: 1.0,
};
class HubbardContextProviderLegacy extends HubbardUContextProvider_1.HubbardUContextProvider {
    constructor() {
        super(...arguments);
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
        return {
            $schema: "http://json-schema.org/draft-07/schema#",
            title: "",
            description: "Hubbard parameters for DFT+U calculation.",
            type: "array",
            uniqueItems: true,
            minItems: 1,
            items: {
                type: "object",
                properties: {
                    atomicSpecies: {
                        type: "string",
                        title: "Atomic species",
                        enum: this.uniqueElementsWithLabels,
                    },
                    atomicSpeciesIndex: {
                        type: "integer",
                        title: "Species index",
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
exports.HubbardContextProviderLegacy = HubbardContextProviderLegacy;
