"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NEBFormDataProvider = void 0;
var _ade = require("@mat3ra/ade");
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class NEBFormDataProvider extends _ade.JSONSchemaFormDataProvider {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "jsonSchemaId", "context-providers-directory/neb-data-provider");
  }
  // eslint-disable-next-line class-methods-use-this
  get defaultData() {
    return {
      nImages: 1
    };
  }
  get jsonSchemaPatchConfig() {
    return {
      nImages: {
        default: this.defaultData.nImages
      }
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get uiSchema() {
    return {
      nImages: {}
    };
  }
  get jsonSchema() {
    return _JSONSchemasInterface.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
  }
}
exports.NEBFormDataProvider = NEBFormDataProvider;