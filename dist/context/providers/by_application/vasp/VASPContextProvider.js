"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.default = void 0;
var _JobContextMixin = require("../../../mixins/JobContextMixin");
var _MaterialContextMixin = require("../../../mixins/MaterialContextMixin");
var _MaterialsContextMixin = require("../../../mixins/MaterialsContextMixin");
var _MethodDataContextMixin = require("../../../mixins/MethodDataContextMixin");
var _WorkflowContextMixin = require("../../../mixins/WorkflowContextMixin");
var _ExecutableContextProvider = _interopRequireDefault(require("../ExecutableContextProvider"));
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
class VASPContextProvider extends _ExecutableContextProvider.default {
    constructor(config) {
        super(config);
        _defineProperty(this, "_material", undefined);
        _defineProperty(this, "_materials", []);
        this.initJobContextMixin();
        this.initMaterialsContextMixin();
        this.initMethodDataContextMixin();
        this.initWorkflowContextMixin();
        this.initMaterialContextMixin();
    }

    // eslint-disable-next-line class-methods-use-this
    buildVASPContext(material) {
        return {
            // TODO: figure out whether we need two separate POSCARS, maybe one is enough
            POSCAR: material.getAsPOSCAR(true, true),
            POSCAR_WITH_CONSTRAINTS: material.getAsPOSCAR(true),
        };
    }
    getDataPerMaterial() {
        if (!this.materials || this.materials.length <= 1) return {};
        return {
            perMaterial: this.materials.map((material) => this.buildVASPContext(material)),
        };
    }

    /*
     * @NOTE: Overriding getData makes this provider "stateless", ie. delivering data from scratch each time and not
     *        considering the content of `this.data`, and `this.isEdited` field(s).
     */
    getData() {
        // consider adjusting so that below values are read from PlanewaveDataManager
        // ECUTWFC;
        // ECUTRHO;

        return {
            ...this.buildVASPContext(this.material),
            ...this.getDataPerMaterial(),
        };
    }
}
exports.default = VASPContextProvider;
(0, _MaterialContextMixin.materialContextMixin)(VASPContextProvider.prototype);
(0, _MaterialsContextMixin.materialsContextMixin)(VASPContextProvider.prototype);
(0, _MethodDataContextMixin.methodDataContextMixin)(VASPContextProvider.prototype);
(0, _WorkflowContextMixin.workflowContextMixin)(VASPContextProvider.prototype);
(0, _JobContextMixin.jobContextMixin)(VASPContextProvider.prototype);
