"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.HubbardContextProviderLegacy = void 0;
var _HubbardUContextProvider = require("./HubbardUContextProvider");
function _defineProperty(e, r, t) {
    return (
        (r = _toPropertyKey(r)) in e
            ? Object.defineProperty(e, r, {
                  value: t,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
              })
            : (e[r] = t),
        e
    );
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
const defaultHubbardConfig = {
    hubbardUValue: 1.0,
};
class HubbardContextProviderLegacy extends _HubbardUContextProvider.HubbardUContextProvider {
    constructor(...args) {
        super(...args);
        _defineProperty(this, "speciesIndexFromSpecies", (species) => {
            return this.uniqueElementsWithLabels?.length > 0
                ? this.uniqueElementsWithLabels.indexOf(species) + 1
                : null;
        });
        _defineProperty(this, "transformData", (data) => {
            return data.map((row) => ({
                ...row,
                atomicSpeciesIndex: this.speciesIndexFromSpecies(row.atomicSpecies),
            }));
        });
    }
    get defaultData() {
        return [
            {
                ...defaultHubbardConfig,
                atomicSpecies: this.firstElement,
                atomicSpeciesIndex: this.uniqueElementsWithLabels?.length > 0 ? 1 : null,
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
                atomicSpeciesIndex: {
                    ...this.defaultFieldStyles,
                    "ui:readonly": true,
                },
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
