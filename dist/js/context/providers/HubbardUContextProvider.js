"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HubbardUContextProvider = void 0;
var _ade = require("@mat3ra/ade");
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
var _MaterialContextMixin = require("../mixins/MaterialContextMixin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const defaultHubbardConfig = {
  atomicSpecies: "",
  atomicOrbital: "2p",
  hubbardUValue: 1.0
};
class HubbardUContextProvider extends _ade.JSONSchemaFormDataProvider {
  constructor(config) {
    super(config);
    _defineProperty(this, "jsonSchemaId", "context-providers-directory/hubbard-u-context-provider");
    this.initMaterialContextMixin();
    this.uniqueElements = this.material?.Basis?.uniqueElements || [];
    this.orbitalList = ["2p", "3s", "3p", "3d", "4s", "4p", "4d", "4f", "5s", "5p", "5d", "5f", "6s", "6p", "6d", "7s", "7p", "7d"];
    const _elementsWithLabels = this.material?.Basis?.elementsWithLabelsArray || [];
    this.uniqueElementsWithLabels = [...new Set(_elementsWithLabels)];
    this.firstElement = this.uniqueElementsWithLabels?.length > 0 ? this.uniqueElementsWithLabels[0] : "";
  }
  get defaultData() {
    return [{
      ...defaultHubbardConfig,
      atomicSpecies: this.firstElement
    }];
  }
  get jsonSchemaPatchConfig() {
    return {
      "items.properties.atomicSpecies": {
        enum: this.uniqueElementsWithLabels,
        default: this.firstElement
      },
      "items.properties.atomicOrbital": {
        enum: this.orbitalList,
        default: defaultHubbardConfig.atomicOrbital
      },
      "items.properties.hubbardUValue": {
        default: defaultHubbardConfig.hubbardUValue
      }
    };
  }
  get uiSchemaStyled() {
    return {
      "ui:options": {
        addable: true,
        orderable: false,
        removable: true
      },
      items: {
        atomicSpecies: this.defaultFieldStyles,
        atomicOrbital: this.defaultFieldStyles,
        hubbardUValue: this.defaultFieldStyles
      }
    };
  }
  get jsonSchema() {
    return _JSONSchemasInterface.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
  }
}
exports.HubbardUContextProvider = HubbardUContextProvider;
(0, _MaterialContextMixin.materialContextMixin)(HubbardUContextProvider.prototype);