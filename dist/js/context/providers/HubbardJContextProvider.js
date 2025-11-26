"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HubbardJContextProvider = void 0;
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
var _HubbardUContextProvider = require("./HubbardUContextProvider");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const defaultHubbardConfig = {
  paramType: "U",
  atomicSpecies: "",
  atomicOrbital: "2p",
  value: 1.0
};
class HubbardJContextProvider extends _HubbardUContextProvider.HubbardUContextProvider {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "jsonSchemaId", "context-providers-directory/hubbard-j-context-provider");
  }
  get defaultData() {
    return [{
      ...defaultHubbardConfig,
      atomicSpecies: this.firstElement
    }];
  }
  get jsonSchemaPatchConfig() {
    return {
      "items.properties.paramType": {
        default: defaultHubbardConfig.paramType
      },
      "items.properties.atomicSpecies": {
        enum: this.uniqueElementsWithLabels,
        default: this.firstElement
      },
      "items.properties.atomicOrbital": {
        enum: this.orbitalList,
        default: defaultHubbardConfig.atomicOrbital
      },
      "items.properties.value": {
        default: defaultHubbardConfig.value
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
        paramType: this.defaultFieldStyles,
        atomicSpecies: this.defaultFieldStyles,
        atomicOrbital: this.defaultFieldStyles,
        value: this.defaultFieldStyles
      }
    };
  }
  get jsonSchema() {
    return _JSONSchemasInterface.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
  }
}
exports.HubbardJContextProvider = HubbardJContextProvider;