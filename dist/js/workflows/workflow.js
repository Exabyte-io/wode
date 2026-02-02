"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workflow = void 0;
const entity_1 = require("@mat3ra/code/dist/js/entity");
const DefaultableMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/DefaultableMixin");
const NamedEntityMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const mode_1 = require("@mat3ra/mode");
const standata_1 = require("@mat3ra/standata");
const utils_1 = require("@mat3ra/utils");
// import { mix } from "mixwith";
const underscore_1 = __importDefault(require("underscore"));
const underscore_string_1 = __importDefault(require("underscore.string"));
const enums_1 = require("../enums");
const WorkflowSchemaMixin_1 = require("../generated/WorkflowSchemaMixin");
const subworkflow_1 = require("../subworkflows/subworkflow");
const units_1 = require("../units");
const factory_1 = require("../units/factory");
const utils_2 = require("../utils");
const default_1 = __importDefault(require("./default"));
const { MODEL_NAMES } = mode_1.tree;
class Workflow extends entity_1.InMemoryEntity {
    static get jsonSchema() {
        return JSONSchemasInterface_1.default.getSchemaById("workflow");
    }
    static generateDefaultWorkflowId() {
        return utils_1.Utils.uuid.getUUID();
    }
    static generateStandataWorkflowId({ name, properties, subworkflows, applicationName, }) {
        const propsInfo = (properties === null || properties === void 0 ? void 0 : properties.length) ? properties.sort().join(",") : "";
        const swInfo = (subworkflows === null || subworkflows === void 0 ? void 0 : subworkflows.length)
            ? subworkflows.map((sw) => sw.name || "unknown").join(",")
            : "";
        const seed = [`workflow-${name}`, applicationName, propsInfo, swInfo]
            .filter((p) => p)
            .join("-");
        return utils_1.Utils.uuid.getUUIDFromNamespace(seed);
    }
    static fromSubworkflow(subworkflow) {
        const config = {
            name: subworkflow.name,
            subworkflows: [subworkflow.toJSON()],
            units: (0, utils_2.setNextLinks)((0, utils_2.setUnitsHead)([subworkflow.getAsUnit().toJSON()])),
            properties: subworkflow.properties,
            applicationName: subworkflow.application.name,
            workflows: [],
        };
        return new Workflow(config);
    }
    constructor(config) {
        var _a;
        if (!config._id) {
            if (Workflow.usePredefinedIds) {
                if (!config.applicationName) {
                    throw new Error("applicationName is required when usePredefinedIds is true");
                }
                config._id = Workflow.generateStandataWorkflowId(config);
            }
            else {
                config._id = Workflow.generateDefaultWorkflowId();
            }
        }
        super(config);
        this.subworkflowInstances = this.subworkflows.map((x) => new subworkflow_1.Subworkflow(x));
        this.unitInstances = this.units.map((unit) => factory_1.UnitFactory.createInWorkflow(unit));
        this.workflowInstances = ((_a = this.workflows) === null || _a === void 0 ? void 0 : _a.map((x) => new Workflow(x))) || [];
    }
    get workflows() {
        return this.prop("workflows");
    }
    set workflows(value) {
        this.setProp("workflows", value);
    }
    addSubworkflow(subworkflow, head = false, index = -1) {
        const subworkflowUnit = subworkflow.getAsUnit();
        if (head) {
            this.subworkflowInstances.unshift(subworkflow);
            this.addUnit(subworkflowUnit, head, index);
        }
        else {
            this.subworkflowInstances.push(subworkflow);
            this.addUnit(subworkflowUnit, head, index);
        }
    }
    removeSubworkflow(id) {
        const subworkflowUnit = this.unitInstances.find((u) => u.id === id);
        if (subworkflowUnit) {
            this.removeUnit(subworkflowUnit.flowchartId);
        }
    }
    setUnits(arr) {
        this.unitInstances = arr;
    }
    get usedApplications() {
        const swApplications = this.subworkflows.map((sw) => sw.application);
        const wfApplications = this.workflowInstances.map((w) => w.usedApplications).flat();
        const usedApplications = [...swApplications, ...wfApplications].reduce((acc, app) => {
            if (!acc.some((a) => a.name === app.name)) {
                acc.push(app);
            }
            return acc;
        }, []);
        return usedApplications;
    }
    // return application names
    // get usedApplicationNames() {
    //     return this.usedApplications.map((a) => a.name);
    // }
    get usedApplicationVersions() {
        return this.usedApplications.map((a) => a.version);
    }
    get usedApplicationNamesWithVersions() {
        return this.usedApplications.map((a) => `${a.name} ${a.version}`);
    }
    get usedModels() {
        return Array.from(new Set(this.subworkflows.map((sw) => sw.model.type)));
    }
    get humanReadableUsedModels() {
        return this.usedModels.filter((m) => m !== "unknown").map((m) => MODEL_NAMES[m]);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            properties: this.properties,
            units: this.unitInstances.map((x) => x.toJSON()),
            subworkflows: this.subworkflowInstances.map((x) => x.toJSON()),
            workflows: this.workflowInstances.map((x) => x.toJSON()),
        };
    }
    get properties() {
        return [...new Set(this.subworkflows.map((x) => x.properties || []).flat())];
    }
    get humanReadableProperties() {
        return this.properties.map((name) => underscore_string_1.default.humanize(name));
    }
    get systemName() {
        const applicationNames = this.usedApplications.map((a) => a.name);
        return underscore_string_1.default.slugify(`${applicationNames.join(":")}-${this.name.toLowerCase()}`);
    }
    get defaultDescription() {
        return `${this.usedModels.join(", ").toUpperCase()} workflow using ${this.usedApplications
            .map((a) => a.name)
            .join(", ")}.`;
    }
    // TODO-question: clarify head logic
    addUnit(unit, head = false, index = -1) {
        const [...unitInstances] = this.unitInstances;
        if (unitInstances.length === 0) {
            unit.head = true;
            this.setUnits([unit]);
        }
        else {
            if (head) {
                unitInstances.unshift(unit);
            }
            else if (index >= 0) {
                unitInstances.splice(index, 0, unit);
            }
            else {
                unitInstances.push(unit);
            }
            this.setUnits((0, utils_2.setNextLinks)((0, utils_2.setUnitsHead)(unitInstances)));
        }
    }
    removeUnit(flowchartId) {
        if (this.units.length < 2) {
            return;
        }
        const unit = this.unitInstances.find((x) => x.flowchartId === flowchartId);
        if (!unit) {
            return;
        }
        const previousUnit = this.unitInstances.find((x) => x.next === unit.flowchartId);
        if (previousUnit) {
            delete previousUnit.next;
        }
        this.subworkflowInstances = this.subworkflowInstances.filter((x) => x.id !== unit.id);
        this.unitInstances = (0, utils_2.setNextLinks)((0, utils_2.setUnitsHead)(this.unitInstances.filter((x) => x.flowchartId !== flowchartId)));
    }
    /*
     * @param type {String|Object} Unit type, map or subworkflow
     * @param head {Boolean}
     * @param index {Number} Index at which the unit will be added. -1 by default (ignored).
     */
    addUnitType(type, head = false, index = -1) {
        switch (type) {
            case enums_1.UnitType.map: {
                const mapWorkflowConfig = {
                    ...default_1.default,
                    _id: Workflow.generateDefaultWorkflowId(),
                };
                const mapUnit = new units_1.MapUnit({
                    workflowId: mapWorkflowConfig._id,
                });
                this.workflows = [...(this.workflows || []), mapWorkflowConfig];
                this.workflowInstances = this.workflows.map((x) => new Workflow(x));
                this.addUnit(mapUnit, head, index);
                break;
            }
            case enums_1.UnitType.subworkflow:
                this.addSubworkflow(subworkflow_1.Subworkflow.createDefault(), head, index);
                break;
            default:
                console.log(`unit_type=${type} unrecognized, skipping.`);
        }
    }
    addMapUnit(mapUnit, mapWorkflow) {
        const mapWorkflowConfig = {
            _id: Workflow.generateDefaultWorkflowId(),
            ...mapWorkflow.toJSON(),
        };
        mapUnit.setWorkflowId(mapWorkflowConfig._id);
        this.addUnit(mapUnit);
        this.workflows = [...(this.workflows || []), mapWorkflowConfig];
        this.workflowInstances = this.workflows.map((x) => new Workflow(x));
    }
    get allSubworkflows() {
        const subworkflowsList = [];
        this.subworkflowInstances.forEach((sw) => subworkflowsList.push(sw));
        this.workflowInstances.forEach((workflow) => {
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
            units: underscore_1.default.map(this.unitInstances, (u) => u.calculateHash()).join(),
            subworkflows: underscore_1.default.map(this.subworkflowInstances, (sw) => sw.calculateHash()).join(),
            workflows: underscore_1.default.map(this.workflowInstances, (w) => w.calculateHash()).join(),
        };
        return utils_1.Utils.hash.calculateHashFromObject(meaningfulFields);
    }
    get hasRelaxation() {
        return Boolean(this.getRelaxationSubworkflow());
    }
    toggleRelaxation() {
        const relaxSubworkflow = this.getRelaxationSubworkflow();
        if (relaxSubworkflow === null || relaxSubworkflow === void 0 ? void 0 : relaxSubworkflow._id) {
            this.removeSubworkflow(relaxSubworkflow._id);
        }
        else {
            const vcRelax = this.getStandataRelaxationSubworkflow();
            if (vcRelax) {
                this.addSubworkflow(new subworkflow_1.Subworkflow(vcRelax), true);
            }
        }
    }
    getStandataRelaxationSubworkflow() {
        // TODO: fix standata type
        return new standata_1.SubworkflowStandata().getRelaxationSubworkflowByApplication(this.subworkflowInstances[0].application.name);
    }
    getRelaxationSubworkflow() {
        const standataSubworkflow = this.getStandataRelaxationSubworkflow();
        return this.subworkflows.find((sw) => {
            return standataSubworkflow && standataSubworkflow.systemName === sw.systemName;
        });
    }
}
exports.Workflow = Workflow;
Workflow.usePredefinedIds = false;
Workflow.defaultConfig = default_1.default;
(0, NamedEntityMixin_1.namedEntityMixin)(Workflow.prototype);
(0, DefaultableMixin_1.defaultableEntityMixin)(Workflow);
(0, WorkflowSchemaMixin_1.workflowSchemaMixin)(Workflow.prototype);
