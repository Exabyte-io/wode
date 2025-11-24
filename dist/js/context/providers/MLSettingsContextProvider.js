"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MLSettingsContextProvider = void 0;
var _ade = require("@mat3ra/ade");
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
var _ApplicationContextMixin = require("../mixins/ApplicationContextMixin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class MLSettingsContextProvider extends _ade.ContextProvider {
  constructor(config) {
    super(config);
    _defineProperty(this, "jsonSchemaId", "context-providers-directory/ml-settings-context-provider");
    this.initApplicationContextMixin();
  }

  // eslint-disable-next-line class-methods-use-this
  get uiSchema() {
    return {
      target_column_name: {},
      problem_category: {}
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get defaultData() {
    return {
      target_column_name: "target",
      problem_category: "regression"
    };
  }
  get jsonSchemaPatchConfig() {
    return {
      target_column_name: {
        default: this.defaultData.target_column_name
      },
      problem_category: {
        default: this.defaultData.problem_category
      }
    };
  }
  get jsonSchema() {
    return _JSONSchemasInterface.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
  }
}
exports.MLSettingsContextProvider = MLSettingsContextProvider;
(0, _ApplicationContextMixin.applicationContextMixin)(MLSettingsContextProvider.prototype);