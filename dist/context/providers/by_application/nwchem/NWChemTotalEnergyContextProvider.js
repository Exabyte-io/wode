"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _periodicTable = require("@exabyte-io/periodic-table.js");
var _lodash = _interopRequireDefault(require("lodash"));
var _underscore = _interopRequireDefault(require("underscore"));
var _underscore2 = _interopRequireDefault(require("underscore.string"));
var _JobContextMixin = require("../../../mixins/JobContextMixin");
var _MaterialContextMixin = require("../../../mixins/MaterialContextMixin");
var _MethodDataContextMixin = require("../../../mixins/MethodDataContextMixin");
var _WorkflowContextMixin = require("../../../mixins/WorkflowContextMixin");
var _ExecutableContextProvider = _interopRequireDefault(require("../ExecutableContextProvider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class NWChemTotalEnergyContextProvider extends _ExecutableContextProvider.default {
  constructor(config) {
    super(config);
    _defineProperty(this, "_material", undefined);
    this.initMethodDataContextMixin();
    this.initWorkflowContextMixin();
    this.initJobContextMixin();
    this.initMaterialContextMixin();
  }
  get atomicPositionsWithoutConstraints() {
    return this.material.Basis.atomicPositions;
  }
  get atomicPositions() {
    const basis = this.material.Basis;
    basis.toCartesian();
    return basis.getAtomicPositionsWithConstraintsAsStrings();
  }
  get atomSymbols() {
    return this.material.Basis.uniqueElements;
  }
  get cartesianAtomicPositions() {
    return this.material.Basis.toCartesian !== undefined;
  }
  get ATOMIC_SPECIES() {
    return _underscore.default.map(this.atomSymbols, symbol => {
      return NWChemTotalEnergyContextProvider.symbolToAtomicSpecies(symbol);
    }).join("\n");
  }

  /*
   * @NOTE: Overriding getData makes this provider "stateless", ie. delivering data from scratch each time and not
   *        considering the content of `this.data`, and `this.isEdited` field(s).
   */
  getData() {
    /*
    TODO: Create ability for user to define CHARGE, MULT, BASIS and FUNCTIONAL parameters.
     */
    const CHARGE = 0;
    const MULT = 1;
    const BASIS = "6-31G";
    const FUNCTIONAL = "B3LYP";
    return {
      CHARGE,
      MULT,
      BASIS,
      NAT: this.atomicPositions.length,
      NTYP: this.atomSymbols.length,
      ATOMIC_POSITIONS: this.atomicPositions.join("\n"),
      ATOMIC_POSITIONS_WITHOUT_CONSTRAINTS: this.atomicPositionsWithoutConstraints.join("\n"),
      ATOMIC_SPECIES: this.ATOMIC_SPECIES,
      FUNCTIONAL,
      CARTESIAN: this.cartesianAtomicPositions
    };
  }
  static symbolToAtomicSpecies(symbol, pseudo) {
    const el = _periodicTable.PERIODIC_TABLE[symbol];
    const filename = pseudo ? _lodash.default.get(pseudo, "filename", _underscore2.default.strRightBack(pseudo.path || "", "/")) : "";
    return el ? _underscore2.default.sprintf("%s %f %s", symbol, el.atomic_mass, filename) : undefined;
  }
}
exports.default = NWChemTotalEnergyContextProvider;
(0, _MaterialContextMixin.materialContextMixin)(NWChemTotalEnergyContextProvider.prototype);
(0, _MethodDataContextMixin.methodDataContextMixin)(NWChemTotalEnergyContextProvider.prototype);
(0, _WorkflowContextMixin.workflowContextMixin)(NWChemTotalEnergyContextProvider.prototype);
(0, _JobContextMixin.jobContextMixin)(NWChemTotalEnergyContextProvider.prototype);