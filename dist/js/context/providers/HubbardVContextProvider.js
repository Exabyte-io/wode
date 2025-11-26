"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HubbardVContextProvider = void 0;
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
var _HubbardUContextProvider = require("./HubbardUContextProvider");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const defaultHubbardConfig = {
  atomicSpecies: "",
  atomicOrbital: "2p",
  atomicSpecies2: "",
  atomicOrbital2: "2p",
  siteIndex: 1,
  siteIndex2: 1,
  hubbardVValue: 1.0
};
class HubbardVContextProvider extends _HubbardUContextProvider.HubbardUContextProvider {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "jsonSchemaId", "context-providers-directory/hubbard-v-context-provider");
  }
  get defaultData() {
    return [{
      ...defaultHubbardConfig,
      atomicSpecies: this.firstSpecies,
      atomicSpecies2: this.secondSpecies,
      siteIndex2: this.uniqueElementsWithLabels?.length > 1 ? 2 : defaultHubbardConfig.siteIndex2
    }];
  }
  get firstSpecies() {
    return this.firstElement;
  }
  get secondSpecies() {
    return this.uniqueElementsWithLabels?.length > 1 ? this.uniqueElementsWithLabels[1] : this.firstSpecies;
  }
  get jsonSchemaPatchConfig() {
    return {
      "items.properties.atomicSpecies": {
        enum: this.uniqueElementsWithLabels,
        default: this.firstSpecies
      },
      "items.properties.siteIndex": {
        default: defaultHubbardConfig.siteIndex
      },
      "items.properties.atomicOrbital": {
        enum: this.orbitalList,
        default: defaultHubbardConfig.atomicOrbital
      },
      "items.properties.atomicSpecies2": {
        enum: this.uniqueElementsWithLabels,
        default: this.secondSpecies
      },
      "items.properties.siteIndex2": {
        default: this.uniqueElementsWithLabels?.length > 1 ? 2 : defaultHubbardConfig.siteIndex2
      },
      "items.properties.atomicOrbital2": {
        enum: this.orbitalList,
        default: defaultHubbardConfig.atomicOrbital
      },
      "items.properties.hubbardVValue": {
        default: defaultHubbardConfig.hubbardVValue
      }
    };
  }
  get uiSchemaStyled() {
    return {
      "ui:options": {
        addable: true,
        orderable: true,
        removable: true
      },
      items: {
        atomicSpecies: this.defaultFieldStyles,
        atomicOrbital: this.defaultFieldStyles,
        atomicSpecies2: this.defaultFieldStyles,
        atomicOrbital2: this.defaultFieldStyles,
        siteIndex: this.defaultFieldStyles,
        siteIndex2: this.defaultFieldStyles,
        hubbardVValue: this.defaultFieldStyles
      }
    };
  }
  get jsonSchema() {
    return _JSONSchemasInterface.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
  }
}
exports.HubbardVContextProvider = HubbardVContextProvider;