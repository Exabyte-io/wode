"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlanewaveCutoffsContextProvider = void 0;
var _ade = require("@mat3ra/ade");
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
var _ApplicationContextMixin = require("../mixins/ApplicationContextMixin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const cutoffConfig = {
  vasp: {},
  // assuming default cutoffs for VASP
  espresso: {
    // assuming the default GBRV set of pseudopotentials is used
    wavefunction: 40,
    density: 200
  }
};
class PlanewaveCutoffsContextProvider extends _ade.ContextProvider {
  constructor(config) {
    super(config);
    _defineProperty(this, "jsonSchemaId", "context-providers-directory/planewave-cutoffs-context-provider");
    this.initApplicationContextMixin();
  }

  // eslint-disable-next-line class-methods-use-this
  get uiSchema() {
    return {
      wavefunction: {},
      density: {}
    };
  }
  get defaultData() {
    return {
      wavefunction: this.defaultECUTWFC,
      density: this.defaultECUTRHO
    };
  }
  get jsonSchemaPatchConfig() {
    return {
      wavefunction: {
        default: this.defaultData.wavefunction
      },
      density: {
        default: this.defaultData.density
      }
    };
  }
  get _cutoffConfigPerApplication() {
    return cutoffConfig[this.application.name];
  }
  get defaultECUTWFC() {
    return this._cutoffConfigPerApplication.wavefunction || null;
  }
  get defaultECUTRHO() {
    return this._cutoffConfigPerApplication.density || null;
  }
  get jsonSchema() {
    return _JSONSchemasInterface.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
  }
}
exports.PlanewaveCutoffsContextProvider = PlanewaveCutoffsContextProvider;
(0, _ApplicationContextMixin.applicationContextMixin)(PlanewaveCutoffsContextProvider.prototype);