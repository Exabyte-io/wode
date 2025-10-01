"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.CollinearMagnetizationContextProvider = void 0;
var _JSONSchemaFormDataProvider = _interopRequireDefault(
    require("@exabyte-io/ade.js/dist/js/context/JSONSchemaFormDataProvider"),
);
var _lodash = _interopRequireDefault(require("lodash"));
var _MaterialContextMixin = require("../mixins/MaterialContextMixin");
function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
}
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
class CollinearMagnetizationContextProvider extends _JSONSchemaFormDataProvider.default {
    constructor(config) {
        super(config);
        _defineProperty(this, "indexOfElement", (element) => {
            return this.uniqueElementsWithLabels.indexOf(element) + 1;
        });
        _defineProperty(this, "transformData", (data) => {
            const startingMagnetizationWithIndex = data.startingMagnetization.map((row) => ({
                ...row,
                index: this.indexOfElement(row.atomicSpecies),
            }));
            return {
                ...data,
                startingMagnetization: startingMagnetizationWithIndex,
            };
        });
        this.initMaterialContextMixin();
        this.firstElement =
            this.uniqueElementsWithLabels?.length > 0 ? this.uniqueElementsWithLabels[0] : "";
        this.isTotalMagnetization = _lodash.default.get(this.data, "isTotalMagnetization", false);
    }
    get uniqueElementsWithLabels() {
        const elementsWithLabelsArray = this.material?.Basis?.elementsWithLabelsArray || [];
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
(0, _MaterialContextMixin.materialContextMixin)(CollinearMagnetizationContextProvider.prototype);
