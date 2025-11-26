"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _JobContextMixin = require("../../../mixins/JobContextMixin");
var _MaterialContextMixin = require("../../../mixins/MaterialContextMixin");
var _MaterialsContextMixin = require("../../../mixins/MaterialsContextMixin");
var _MaterialsSetContextMixin = require("../../../mixins/MaterialsSetContextMixin");
var _MethodDataContextMixin = require("../../../mixins/MethodDataContextMixin");
var _WorkflowContextMixin = require("../../../mixins/WorkflowContextMixin");
var _ExecutableContextProvider = _interopRequireDefault(require("../ExecutableContextProvider"));
var _VASPContextProvider = _interopRequireDefault(require("./VASPContextProvider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class VASPNEBContextProvider extends _ExecutableContextProvider.default {
  constructor(config) {
    super(config);
    _defineProperty(this, "jsonSchemaId", "context-providers-directory/by-application/vasp-neb-context-provider");
    _defineProperty(this, "_materials", []);
    this.initMaterialContextMixin();
    this.initMaterialsContextMixin();
    this.initMaterialsSetContextMixin();
    this.initMethodDataContextMixin();
    this.initWorkflowContextMixin();
    this.initJobContextMixin();
  }
  getData() {
    const sortedMaterials = this.sortMaterialsByIndexInSet(this.materials);
    const VASPContexts = sortedMaterials.map(material => {
      const context = {
        ...this.config.context,
        material
      };
      const config = {
        ...this.config,
        context
      };
      return new _VASPContextProvider.default(config).getData();
    });
    return {
      FIRST_IMAGE: VASPContexts[0].POSCAR_WITH_CONSTRAINTS,
      LAST_IMAGE: VASPContexts[VASPContexts.length - 1].POSCAR_WITH_CONSTRAINTS,
      INTERMEDIATE_IMAGES: VASPContexts.slice(1, VASPContexts.length - 1).map(data => data.POSCAR_WITH_CONSTRAINTS)
    };
  }
}
exports.default = VASPNEBContextProvider;
(0, _MaterialContextMixin.materialContextMixin)(VASPNEBContextProvider.prototype);
(0, _MaterialsContextMixin.materialsContextMixin)(VASPNEBContextProvider.prototype);
(0, _MaterialsSetContextMixin.materialsSetContextMixin)(VASPNEBContextProvider.prototype);
(0, _MethodDataContextMixin.methodDataContextMixin)(VASPNEBContextProvider.prototype);
(0, _WorkflowContextMixin.workflowContextMixin)(VASPNEBContextProvider.prototype);
(0, _JobContextMixin.jobContextMixin)(VASPNEBContextProvider.prototype);