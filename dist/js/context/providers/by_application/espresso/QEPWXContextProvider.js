"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _periodicTable = require("@exabyte-io/periodic-table.js");
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
var _path = _interopRequireDefault(require("path"));
var _underscore = _interopRequireDefault(require("underscore.string"));
var _JobContextMixin = require("../../../mixins/JobContextMixin");
var _MaterialContextMixin = require("../../../mixins/MaterialContextMixin");
var _MaterialsContextMixin = require("../../../mixins/MaterialsContextMixin");
var _MethodDataContextMixin = require("../../../mixins/MethodDataContextMixin");
var _WorkflowContextMixin = require("../../../mixins/WorkflowContextMixin");
var _ExecutableContextProvider = _interopRequireDefault(require("../ExecutableContextProvider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class QEPWXContextProvider extends _ExecutableContextProvider.default {
  constructor(config) {
    super(config);
    _defineProperty(this, "jsonSchemaId", "context-providers-directory/by-application/qe-pwx-context-provider");
    _defineProperty(this, "_material", undefined);
    _defineProperty(this, "_materials", []);
    this.initMaterialsContextMixin();
    this.initMethodDataContextMixin();
    this.initWorkflowContextMixin();
    this.initJobContextMixin();
    this.initMaterialContextMixin();
  }
  static atomSymbols(material) {
    return material.Basis.uniqueElements;
  }
  static uniqueElementsWithLabels(material) {
    // return unique items
    return [...new Set(material.Basis.elementsWithLabelsArray)];
  }

  /** Returns the input text block for atomic positions WITH constraints.
   */
  static atomicPositionsWithConstraints(material) {
    return material.Basis.getAtomicPositionsWithConstraintsAsStrings().join("\n");
  }

  /** Returns the input text block for atomic positions
   *  Note: does NOT include constraints
   */
  static atomicPositions(material) {
    return material.Basis.atomicPositions.join("\n");
  }
  static NAT(material) {
    return material.Basis.atomicPositions.length;
  }
  static NTYP(material) {
    return material.Basis.uniqueElements.length;
  }
  static NTYP_WITH_LABELS(material) {
    return this.uniqueElementsWithLabels(material).length;
  }
  get jsonSchema() {
    return _JSONSchemasInterface.default.getSchemaById(this.jsonSchemaId);
  }
  buildQEPWXContext(material) {
    const IBRAV = 0; // use CELL_PARAMETERS to define Bravais lattice

    return {
      IBRAV,
      RESTART_MODE: this.RESTART_MODE,
      ATOMIC_SPECIES: this.ATOMIC_SPECIES(material),
      ATOMIC_SPECIES_WITH_LABELS: this.ATOMIC_SPECIES_WITH_LABELS(material),
      NAT: QEPWXContextProvider.NAT(material),
      NTYP: QEPWXContextProvider.NTYP(material),
      NTYP_WITH_LABELS: QEPWXContextProvider.NTYP_WITH_LABELS(material),
      ATOMIC_POSITIONS: QEPWXContextProvider.atomicPositionsWithConstraints(material),
      ATOMIC_POSITIONS_WITHOUT_CONSTRAINTS: QEPWXContextProvider.atomicPositions(material),
      CELL_PARAMETERS: QEPWXContextProvider.CELL_PARAMETERS(material)
    };
  }
  getDataPerMaterial() {
    if (!this.materials || this.materials.length <= 1) return {};
    return {
      perMaterial: this.materials.map(material => this.buildQEPWXContext(material))
    };
  }

  /*
   * @NOTE: Overriding getData makes this provider "stateless", ie. delivering data from scratch each time and not
   *        considering the content of `this.data`, and `this.isEdited` field(s).
   */
  getData() {
    // the below values are read from PlanewaveDataManager instead
    // ECUTWFC = 40;
    // ECUTRHO = 200;

    return {
      ...this.buildQEPWXContext(this.material),
      ...this.getDataPerMaterial()
    };
  }
  get RESTART_MODE() {
    return this.job.parentJob || this.workflow.hasRelaxation ? "restart" : "from_scratch";
  }
  getPseudoBySymbol(symbol) {
    return (this.methodData.pseudo || []).find(p => p.element === symbol);
  }

  /** Builds ATOMIC SPECIES block of pw.x input in the format
   *  X   Mass_X   PseudoPot_X
   *  where X            is the atom label
   *        Mass_X       is the mass of element X [amu]
   *        PseudoPot_X  is the pseudopotential filename associated with element X
   *
   *  Note: assumes this.methodData is defined
   */
  ATOMIC_SPECIES(material) {
    return QEPWXContextProvider.atomSymbols(material).map(symbol => {
      const pseudo = this.getPseudoBySymbol(symbol);
      return QEPWXContextProvider.symbolToAtomicSpecie(symbol, pseudo);
    }).join("\n");
  }
  ATOMIC_SPECIES_WITH_LABELS(material) {
    return QEPWXContextProvider.uniqueElementsWithLabels(material).map(symbol => {
      const symbolWithoutLabel = symbol.replace(/\d$/, "");
      const label = symbol.match(/\d$/g) ? symbol.match(/\d$/g)?.[0] : "";
      const pseudo = this.getPseudoBySymbol(symbolWithoutLabel);
      return QEPWXContextProvider.elementAndPseudoToAtomicSpecieWithLabels(symbolWithoutLabel, pseudo, label);
    }).join("\n");
  }
  static CELL_PARAMETERS(material) {
    return material.Lattice.vectorArrays.map(x => {
      return x.map(y => {
        return _underscore.default.sprintf("%14.9f", y).trim();
      }).join(" ");
    }).join("\n");
  }
  static symbolToAtomicSpecie(symbol, pseudo) {
    const el = _periodicTable.PERIODIC_TABLE[symbol];
    const filename = pseudo?.filename || _path.default.basename(pseudo?.path || "");
    return _underscore.default.sprintf("%s %f %s", symbol, el.atomic_mass, filename) || "";
  }
  static elementAndPseudoToAtomicSpecieWithLabels(symbol, pseudo, label = "") {
    const el = _periodicTable.PERIODIC_TABLE[symbol];
    const filename = pseudo?.filename || _path.default.basename(pseudo?.path || "");
    return _underscore.default.sprintf("%s%s %f %s", symbol, label, el.atomic_mass, filename) || "";
  }
}
exports.default = QEPWXContextProvider;
(0, _MaterialContextMixin.materialContextMixin)(QEPWXContextProvider.prototype);
(0, _MaterialsContextMixin.materialsContextMixin)(QEPWXContextProvider.prototype);
(0, _MethodDataContextMixin.methodDataContextMixin)(QEPWXContextProvider.prototype);
(0, _WorkflowContextMixin.workflowContextMixin)(QEPWXContextProvider.prototype);
(0, _JobContextMixin.jobContextMixin)(QEPWXContextProvider.prototype);