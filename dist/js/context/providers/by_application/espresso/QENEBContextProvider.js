"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _JobContextMixin = require("../../../mixins/JobContextMixin");
var _MaterialContextMixin = require("../../../mixins/MaterialContextMixin");
var _MaterialsContextMixin = require("../../../mixins/MaterialsContextMixin");
var _MaterialsSetContextMixin = require("../../../mixins/MaterialsSetContextMixin");
var _MethodDataContextMixin = require("../../../mixins/MethodDataContextMixin");
var _WorkflowContextMixin = require("../../../mixins/WorkflowContextMixin");
var _ExecutableContextProvider = _interopRequireDefault(require("../ExecutableContextProvider"));
var _QEPWXContextProvider = _interopRequireDefault(require("./QEPWXContextProvider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class QENEBContextProvider extends _ExecutableContextProvider.default {
  constructor(config) {
    super(config);
    _defineProperty(this, "_material", undefined);
    _defineProperty(this, "_materials", []);
    _defineProperty(this, "_materialsSet", undefined);
    this.initJobContextMixin();
    this.initMaterialsContextMixin();
    this.initMethodDataContextMixin();
    this.initWorkflowContextMixin();
    this.initMaterialContextMixin();
    this.initMaterialsSetContextMixin();
  }
  getData() {
    const sortedMaterials = this.sortMaterialsByIndexInSet(this.materials);
    const PWXContexts = sortedMaterials.map(material => {
      const context = {
        ...this.config.context,
        material
      };
      const config = {
        ...this.config,
        context
      };
      return new _QEPWXContextProvider.default(config).getData();
    });
    return {
      ..._lodash.default.omit(PWXContexts[0], ["ATOMIC_POSITIONS", "ATOMIC_POSITIONS_WITHOUT_CONSTRAINTS"]),
      FIRST_IMAGE: PWXContexts[0].ATOMIC_POSITIONS,
      LAST_IMAGE: PWXContexts[PWXContexts.length - 1].ATOMIC_POSITIONS,
      INTERMEDIATE_IMAGES: PWXContexts.slice(1, PWXContexts.length - 1).map(data => data.ATOMIC_POSITIONS)
    };
  }
}
exports.default = QENEBContextProvider;
(0, _MaterialContextMixin.materialContextMixin)(QENEBContextProvider.prototype);
(0, _MaterialsContextMixin.materialsContextMixin)(QENEBContextProvider.prototype);
(0, _MethodDataContextMixin.methodDataContextMixin)(QENEBContextProvider.prototype);
(0, _WorkflowContextMixin.workflowContextMixin)(QENEBContextProvider.prototype);
(0, _JobContextMixin.jobContextMixin)(QENEBContextProvider.prototype);
(0, _MaterialsSetContextMixin.materialsSetContextMixin)(QENEBContextProvider.prototype);