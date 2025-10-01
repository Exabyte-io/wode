"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.Workflow = void 0;
var _ide = require("@exabyte-io/ide.js");
var _mode = require("@exabyte-io/mode.js");
var _entity = require("@mat3ra/code/dist/js/entity");
var _workflow = _interopRequireDefault(require("@mat3ra/esse/dist/js/schema/workflow.json"));
var _utils = require("@mat3ra/utils");
var _lodash = _interopRequireDefault(require("lodash"));
var _mixwith = require("mixwith");
var _underscore = _interopRequireDefault(require("underscore"));
var _underscore2 = _interopRequireDefault(require("underscore.string"));
var _enums = require("../enums");
var _subworkflow = require("../subworkflows/subworkflow");
var _units = require("../units");
var _factory = require("../units/factory");
var _utils2 = require("../utils");
var _default = _interopRequireDefault(require("./default"));
var _relaxation = require("./relaxation");
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
} /* eslint-disable max-classes-per-file */
const { MODEL_NAMES } = _mode.tree;
class BaseWorkflow extends (0, _mixwith.mix)(
    _entity.NamedDefaultableRepetitionContextAndRenderInMemoryEntity,
).with(_ide.ComputedEntityMixin, _relaxation.RelaxationLogicMixin) {}
class Workflow extends BaseWorkflow {
    constructor(config) {
        if (!config._id) config._id = Workflow.generateWorkflowId(config.name);
        super(config);
        this._Subworkflow = _subworkflow.Subworkflow;
        this._UnitFactory = _factory.UnitFactory;
        this._Workflow = Workflow;
        this._MapUnit = _units.MapUnit;
        if (!config.skipInitialize) this.initialize();
    }
    initialize() {
        const me = this;
        this._subworkflows = this.prop("subworkflows").map((x) => new me._Subworkflow(x));
        this._units = this.prop("units").map((unit) => me._UnitFactory.create(unit));
        this._json.workflows = this._json.workflows || [];
        this._workflows = this.prop("workflows").map((x) => new me._Workflow(x));
    }
    static get defaultConfig() {
        return _default.default;
    }
    static generateWorkflowId(...args) {
        args[0] = `workflow-${args[0]}`;
        if (this.usePredefinedIds) return _utils.Utils.uuid.getUUIDFromNamespace(...args);
        return _utils.Utils.uuid.getUUID();
    }
    static fromSubworkflow(subworkflow, ClsConstructor = Workflow) {
        const config = {
            name: subworkflow.name,
            subworkflows: [subworkflow.toJSON()],
            units: (0, _utils2.setNextLinks)(
                (0, _utils2.setUnitsHead)([subworkflow.getAsUnit().toJSON()]),
            ),
            properties: subworkflow.properties,
        };
        return new ClsConstructor(config);
    }
    static fromSubworkflows(name, ClsConstructor = Workflow, ...subworkflows) {
        return new ClsConstructor(
            name,
            subworkflows,
            subworkflows.map((sw) => sw.getAsUnit()),
        );
    }

    /**
     * @summary Adds subworkflow to current workflow.
     * @param subworkflow {Subworkflow}
     * @param head {Boolean}
     */
    addSubworkflow(subworkflow, head = false, index = -1) {
        const subworkflowUnit = subworkflow.getAsUnit();
        if (head) {
            this.subworkflows.unshift(subworkflow);
            this.addUnit(subworkflowUnit, head, index);
        } else {
            this.subworkflows.push(subworkflow);
            this.addUnit(subworkflowUnit, head, index);
        }
    }
    removeSubworkflow(id) {
        const subworkflowUnit = this.units.find((u) => u.id === id);
        if (subworkflowUnit) this.removeUnit(subworkflowUnit.flowchartId);
    }
    subworkflowId(index) {
        const sw = this.prop(`subworkflows[${index}]`);
        return sw ? sw._id : null;
    }
    replaceSubworkflowAtIndex(index, newSubworkflow) {
        this._subworkflows[index] = newSubworkflow;
        this.setUnits((0, _utils2.setNextLinks)((0, _utils2.setUnitsHead)(this._units)));
    }
    get units() {
        return this._units;
    }
    setUnits(arr) {
        this._units = arr;
    }

    // returns a list of `app` Classes
    get usedApplications() {
        const swApplications = this.subworkflows.map((sw) => sw.application);
        const wfApplications = _lodash.default.flatten(
            this.workflows.map((w) => w.usedApplications),
        );
        return _lodash.default.uniqBy(swApplications.concat(wfApplications), (a) => a.name);
    }

    // return application names
    get usedApplicationNames() {
        return this.usedApplications.map((a) => a.name);
    }
    get usedApplicationVersions() {
        return this.usedApplications.map((a) => a.version);
    }
    get usedApplicationNamesWithVersions() {
        return this.usedApplications.map((a) => `${a.name} ${a.version}`);
    }
    get usedModels() {
        return _lodash.default.uniq(this.subworkflows.map((sw) => sw.model.type));
    }
    get humanReadableUsedModels() {
        return this.usedModels.filter((m) => m !== "unknown").map((m) => MODEL_NAMES[m]);
    }
    toJSON(exclude = []) {
        return _lodash.default.omit(
            {
                ...super.toJSON(),
                units: this._units.map((x) => x.toJSON()),
                subworkflows: this._subworkflows.map((x) => x.toJSON()),
                workflows: this.workflows.map((x) => x.toJSON()),
                ...(this.compute
                    ? {
                          compute: this.compute,
                      }
                    : {}), // {"compute": null } won't pass esse validation
            },
            exclude,
        );
    }
    get isDefault() {
        return this.prop("isDefault", false);
    }
    get isMultiMaterial() {
        const fromSubworkflows = this.subworkflows.some((sw) => sw.isMultiMaterial);
        return this.prop("isMultiMaterial") || fromSubworkflows;
    }
    set isMultiMaterial(value) {
        this.setProp("isMultiMaterial", value);
    }
    set isUsingDataset(value) {
        this.setProp("isUsingDataset", value);
    }
    get isUsingDataset() {
        return !!this.prop("isUsingDataset", false);
    }
    get properties() {
        return _lodash.default.uniq(
            _lodash.default.flatten(this._subworkflows.map((x) => x.properties)),
        );
    }
    get humanReadableProperties() {
        return this.properties.map((name) => _underscore2.default.humanize(name));
    }
    get systemName() {
        return _underscore2.default.slugify(
            `${this.usedApplicationNames.join(":")}-${this.name.toLowerCase()}`,
        );
    }
    get defaultDescription() {
        return `${this.usedModels
            .join(", ")
            .toUpperCase()} workflow using ${this.usedApplicationNames.join(", ")}.`;
    }
    get exabyteId() {
        return this.prop("exabyteId");
    }
    get hash() {
        return this.prop("hash", "");
    }
    get isOutdated() {
        return this.prop("isOutdated", false);
    }
    get history() {
        return this.prop("history", []);
    }
    setMethodData(methodData) {
        this.subworkflows.forEach((sw) => {
            const method = methodData.getMethodBySubworkflow(sw);
            if (method) sw.model.setMethod(method);
        });
        this.workflows.forEach((wf) => {
            wf.subworkflows.forEach((sw) => {
                const method = methodData.getMethodBySubworkflow(sw);
                if (method) sw.model.setMethod(method);
            });
        });
    }

    /**
     * @param unit {Unit}
     * @param head {Boolean}
     * @param index {Number}
     */
    addUnit(unit, head = false, index = -1) {
        const { units } = this;
        if (units.length === 0) {
            unit.head = true;
            this.setUnits([unit]);
        } else {
            if (head) {
                units.unshift(unit);
            } else if (index >= 0) {
                units.splice(index, 0, unit);
            } else {
                units.push(unit);
            }
            this.setUnits((0, _utils2.setNextLinks)((0, _utils2.setUnitsHead)(units)));
        }
    }
    removeUnit(flowchartId) {
        if (this.units.length < 2) return;
        const unit = this.units.find((x) => x.flowchartId === flowchartId);
        const previousUnit = this.units.find((x) => x.next === unit.flowchartId);
        if (previousUnit) {
            delete previousUnit.next;
        }
        this._subworkflows = this._subworkflows.filter((x) => x.id !== unit.id);
        this._units = (0, _utils2.setNextLinks)(
            (0, _utils2.setUnitsHead)(this._units.filter((x) => x.flowchartId !== flowchartId)),
        );
    }

    /**
     * @return Subworkflow[]
     */
    get subworkflows() {
        return this._subworkflows;
    }
    get workflows() {
        return this._workflows;
    }

    /*
     * @param type {String|Object} Unit type, map or subworkflow
     * @param head {Boolean}
     * @param index {Number} Index at which the unit will be added. -1 by default (ignored).
     */
    addUnitType(type, head = false, index = -1) {
        switch (type) {
            case _enums.UNIT_TYPES.map:
                // eslint-disable-next-line no-case-declarations
                const workflowConfig = _default.default;
                // eslint-disable-next-line no-case-declarations
                const mapUnit = new this._MapUnit();
                workflowConfig._id = this._Workflow.generateWorkflowId(workflowConfig.name);
                this.prop("workflows").push(workflowConfig);
                this._workflows = this.prop("workflows").map((x) => new this._Workflow(x));
                mapUnit.setWorkflowId(workflowConfig._id);
                this.addUnit(mapUnit, head, index);
                break;
            case _enums.UNIT_TYPES.subworkflow:
                this.addSubworkflow(this._Subworkflow.createDefault(), head, index);
                break;
            default:
                console.log(`unit_type=${type} unrecognized, skipping.`);
        }
    }
    addMapUnit(mapUnit, mapWorkflow) {
        const mapWorkflowConfig = mapWorkflow.toJSON();
        if (!mapWorkflowConfig._id)
            mapWorkflowConfig._id = this._Workflow.generateWorkflowId(mapWorkflowConfig.name);
        mapUnit.setWorkflowId(mapWorkflowConfig._id);
        this.addUnit(mapUnit);
        this._json.workflows.push(mapWorkflowConfig);
        const me = this;
        this._workflows = this.prop("workflows").map((x) => new me._Workflow(x));
    }
    findSubworkflowById(id) {
        if (!id) return;
        const workflows = this.workflows || [];
        const subworkflows = this.subworkflows || [];
        const subworkflow = subworkflows.find((sw) => sw.id === id);
        if (subworkflow) return subworkflow;
        const workflow = workflows.find((w) => w.findSubworkflowById(id));
        if (workflow) return workflow.findSubworkflowById(id);
        console.warn("attempted to find a non-existing subworkflow");
    }
    get allSubworkflows() {
        const subworkflowsList = [];
        this.subworkflows.forEach((sw) => subworkflowsList.push(sw));
        this.workflows.forEach((workflow) => {
            return Array.prototype.push.apply(subworkflowsList, workflow.allSubworkflows);
        });
        return subworkflowsList;
    }

    /**
     * @summary Calculates hash of the workflow. Meaningful fields are units and subworkflows.
     * units and subworkflows must be sorted topologically before hashing (already sorted).
     */
    calculateHash() {
        const meaningfulFields = {
            units: _underscore.default.map(this.units, (u) => u.calculateHash()).join(),
            subworkflows: _underscore.default
                .map(this.subworkflows, (sw) => sw.calculateHash())
                .join(),
            workflows: _underscore.default.map(this.workflows, (w) => w.calculateHash()).join(),
        };
        return _utils.Utils.hash.calculateHashFromObject(meaningfulFields);
    }
}
exports.Workflow = Workflow;
_defineProperty(Workflow, "getDefaultComputeConfig", _ide.getDefaultComputeConfig);
_defineProperty(Workflow, "jsonSchema", _workflow.default);
_defineProperty(Workflow, "usePredefinedIds", false);
