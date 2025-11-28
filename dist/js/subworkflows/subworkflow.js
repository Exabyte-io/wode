"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subworkflow = void 0;
const ade_1 = require("@mat3ra/ade");
const entity_1 = require("@mat3ra/code/dist/js/entity");
const mode_1 = require("@mat3ra/mode");
const utils_1 = require("@mat3ra/utils");
const lodash_1 = __importDefault(require("lodash"));
const mixwith_1 = require("mixwith");
const underscore_1 = __importDefault(require("underscore"));
const enums_1 = require("../enums");
const units_1 = require("../units");
const utils_2 = require("../utils");
const convergence_1 = require("./convergence");
/* eslint max-classes-per-file:0 */
class BaseSubworkflow extends (0, mixwith_1.mix)(entity_1.NamedDefaultableRepetitionImportantSettingsInMemoryEntity).with(convergence_1.ConvergenceMixin, entity_1.ContextAndRenderFieldsMixin) {
}
class Subworkflow extends BaseSubworkflow {
    constructor(config, _Application = ade_1.Application, _ModelFactory = mode_1.ModelFactory, _UnitFactory = units_1.UnitFactory) {
        super(config);
        this._Application = _Application;
        this._ModelFactory = _ModelFactory;
        this._UnitFactory = _UnitFactory;
        this.initialize();
    }
    initialize() {
        this._application = new this._Application(this.prop("application"));
        this._model = this._ModelFactory.create({
            ...this.prop("model"),
            application: this.prop("application"),
        });
        this._units = (0, utils_2.setNextLinks)((0, utils_2.setUnitsHead)(this.prop("units", [])), this.id).map((cfg) => this._UnitFactory.create(Object.assign(cfg, { application: this.application.toJSON() })));
    }
    static generateSubworkflowId(name, application = null, model = null, method = null) {
        var _a, _b, _c, _d;
        const appName = application ? application.name || application : "";
        const modelInfo = model
            ? `${(((_a = model.toJSON) === null || _a === void 0 ? void 0 : _a.call(model)) || model).type}-${(((_b = model.toJSON) === null || _b === void 0 ? void 0 : _b.call(model)) || model).subtype || ""}`
            : "";
        const methodInfo = method
            ? `${(((_c = method.toJSON) === null || _c === void 0 ? void 0 : _c.call(method)) || method).type}-${(((_d = method.toJSON) === null || _d === void 0 ? void 0 : _d.call(method)) || method).subtype || ""}`
            : "";
        const seed = [`subworkflow-${name}`, appName, modelInfo, methodInfo]
            .filter((p) => p)
            .join("-");
        if (this.usePredefinedIds)
            return utils_1.Utils.uuid.getUUIDFromNamespace(seed);
        return utils_1.Utils.uuid.getUUID();
    }
    static get defaultConfig() {
        const defaultName = "New Subworkflow";
        return {
            _id: this.generateSubworkflowId(defaultName),
            name: defaultName,
            application: ade_1.Application.defaultConfig,
            model: mode_1.Model.defaultConfig,
            properties: [],
            units: [],
        };
    }
    /*
     * @returns {SubworkflowUnit}
     */
    getAsUnit() {
        return this._UnitFactory.create({
            type: enums_1.UNIT_TYPES.subworkflow,
            _id: this.id,
            name: this.name,
        });
    }
    /*
     * @summary Used to generate initial application tree, therefore omit setting application.
     */
    static fromArguments(application, model, method, name, units = [], config = {}, Cls = Subworkflow) {
        var _a;
        const nameForIdGeneration = ((_a = config.attributes) === null || _a === void 0 ? void 0 : _a.name) || name;
        const { functions, attributes, ...cleanConfig } = config;
        // Set the method on the model so it can be properly serialized
        model.setMethod(method);
        return new Cls({
            ...cleanConfig,
            _id: Cls.generateSubworkflowId(nameForIdGeneration, application, model, method),
            name,
            application: application.toJSON(),
            properties: lodash_1.default.sortedUniq(lodash_1.default.flatten(units.filter((x) => x.resultNames).map((x) => x.resultNames))),
            model: {
                ...model.toJSON(),
                method: method.toJSON(),
            },
            units: units.map((unit) => (unit.toJSON ? unit.toJSON() : unit)),
        });
    }
    get application() {
        return this._application;
    }
    setApplication(application) {
        // TODO: adjust the logic above to take into account whether units need re-rendering after version change etc.
        // reset units if application name changes
        const previousApplicationName = this.application.name;
        this._application = application;
        if (previousApplicationName !== application.name) {
            // TODO: figure out how to set a default unit per new application instead of removing all
            this.setUnits([]);
        }
        else {
            // propagate new application version to all units
            this.units
                .filter((unit) => typeof unit.setApplication === "function")
                .forEach((unit) => unit.setApplication(application, true));
        }
        this.setProp("application", application.toJSON());
        // set model to the default one for the application selected
        this.setModel(this._ModelFactory.createFromApplication({
            application: this.prop("application"),
        }));
    }
    get model() {
        return this._model;
    }
    setModel(model) {
        this._model = model;
    }
    get units() {
        return this._units;
    }
    setUnits(units) {
        this._units = units;
    }
    toJSON(exclude = []) {
        return {
            ...super.toJSON(exclude),
            model: this.model.toJSON(),
            units: this.units.map((x) => x.toJSON()),
            ...(this.compute ? { compute: this.compute } : {}), // {"compute": null } won't pass esse validation
        };
    }
    get contextProviders() {
        const unitsWithContextProviders = this.units.filter((u) => u.allContextProviders && u.allContextProviders.length);
        const allContextProviders = underscore_1.default.flatten(unitsWithContextProviders.map((u) => u.allContextProviders));
        const subworkflowContextProviders = allContextProviders.filter((p) => p.isSubworkflowContextProvider);
        return underscore_1.default.uniq(subworkflowContextProviders, (p) => p.name);
    }
    /**
     * Extracts a reduced version of the entity config to be stored inside redux state.
     * This is used to track changes to context, monitors, properties, etc. when multiple materials are in state.
     */
    extractReducedExternalDependentConfig() {
        return {
            id: this.id,
            context: this.context || {},
            units: this.units.map((unit) => unit.extractReducedExternalDependentConfig()),
        };
    }
    /**
     * Applies the reduced config obtained from extractReducedExternalDependentConfig on the entity.
     */
    applyReducedExternalDependentConfig(config) {
        this.context = config.context || {};
        this.units.forEach((unit) => {
            const unitConfig = (config.units || []).find((c) => c.id === unit.flowchartId);
            unit.applyReducedExternalDependentConfig(unitConfig || {});
        });
    }
    get contextFromAssignmentUnits() {
        const ctx = {};
        this.units
            .filter((u) => u.type === enums_1.UNIT_TYPES.assignment)
            .forEach((u) => {
            ctx[u.operand] = u.value;
        });
        return ctx;
    }
    render(context = {}) {
        const ctx = {
            ...context,
            application: this.application,
            methodData: this.model.Method.data,
            model: this.model.toJSON(),
            // context below is assembled from context providers and passed to units to override theirs
            ...this.context,
            subworkflowContext: this.contextFromAssignmentUnits,
        };
        this.units.forEach((u) => u.render(ctx));
    }
    /**
     * TODO: reuse workflow function instead
     * @param unit {Unit}
     * @param head {Boolean}
     * @param index {Number}
     */
    addUnit(unit, index = -1) {
        const { units } = this;
        if (units.length === 0) {
            unit.head = true;
            this.setUnits([unit]);
        }
        else {
            if (index >= 0)
                units.splice(index, 0, unit);
            else
                units.push(unit);
            this.setUnits((0, utils_2.setNextLinks)((0, utils_2.setUnitsHead)(units)));
        }
    }
    removeUnit(flowchartId) {
        const previousUnit = this.units.find((x) => x.next === flowchartId);
        if (previousUnit)
            previousUnit.unsetProp("next");
        // TODO: remove the setNextLinks and setUnitsHead and handle the logic via flowchart designer
        this.setUnits((0, utils_2.setNextLinks)((0, utils_2.setUnitsHead)(this.units.filter((x) => x.flowchartId !== flowchartId))));
    }
    get properties() {
        return lodash_1.default.flatten(this.units.map((x) => x.resultNames));
    }
    getUnit(flowchartId) {
        return this.units.find((x) => x.flowchartId === flowchartId);
    }
    unitIndex(flowchartId) {
        return lodash_1.default.findIndex(this.units, (unit) => {
            return unit.flowchartId === flowchartId;
        });
    }
    replaceUnit(index, unit) {
        this.units[index] = unit;
        this.setUnits((0, utils_2.setNextLinks)((0, utils_2.setUnitsHead)(this.units)));
    }
    // eslint-disable-next-line class-methods-use-this
    get scopeVariables() {
        return ["N_k", "N_k_nonuniform"];
    }
    // eslint-disable-next-line class-methods-use-this
    get scalarResults() {
        return ["total_energy", "pressure"];
    }
    get isMultiMaterial() {
        return this.prop("isMultiMaterial", false);
    }
    get isDraft() {
        return this.prop("isDraft", false);
    }
    setIsDraft(bool) {
        return this.setProp("isDraft", bool);
    }
    get methodData() {
        return this.model.Method.data;
    }
    /**
     * @summary Calculates hash of the subworkflow. Meaningful fields are units, app and model.
     * units must be sorted topologically before hashing (already sorted).
     */
    calculateHash() {
        const config = this.toJSON();
        const meaningfulFields = {
            application: utils_1.Utils.specific.removeTimestampableKeysFromConfig(config.application),
            model: this._calculateModelHash(),
            units: underscore_1.default.map(this.units, (u) => u.calculateHash()).join(),
        };
        return utils_1.Utils.hash.calculateHashFromObject(meaningfulFields);
    }
    _calculateModelHash() {
        const { model } = this.toJSON();
        // ignore empty data object
        if (this.model.Method.omitInHashCalculation)
            delete model.method.data;
        return utils_1.Utils.hash.calculateHashFromObject(model);
    }
    findUnitById(id) {
        // TODO: come back and refactor after converting flowchartId to id
        return this.units.find((u) => u.flowchartId === id);
    }
    findUnitKeyById(id) {
        const index = this.units.findIndex((u) => u.flowchartId === id);
        return `units.${index}`;
    }
    findUnitWithTag(tag) {
        return this.units.find((unit) => unit.tags.includes(tag));
    }
    get hasConvergence() {
        return !!this.convergenceParam && !!this.convergenceResult && !!this.convergenceSeries;
    }
}
exports.Subworkflow = Subworkflow;
Subworkflow.usePredefinedIds = false;
