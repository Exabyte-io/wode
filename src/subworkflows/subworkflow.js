import { Application } from "@exabyte-io/ade.js";
import { Model, ModelFactory } from "@exabyte-io/mode.js";
import {
    ContextAndRenderFieldsMixin,
    NamedDefaultableRepetitionImportantSettingsInMemoryEntity,
} from "@mat3ra/code/dist/js/entity";
import { Utils } from "@mat3ra/utils";
import lodash from "lodash";
import { mix } from "mixwith";
import _ from "underscore";

import { UNIT_TYPES } from "../enums";
import { UnitFactory } from "../units";
import { setNextLinks, setUnitsHead } from "../utils";
import { ConvergenceMixin } from "./convergence";

/* eslint max-classes-per-file:0 */

class BaseSubworkflow extends mix(NamedDefaultableRepetitionImportantSettingsInMemoryEntity).with(
    ConvergenceMixin,
    ContextAndRenderFieldsMixin,
) {}

export class Subworkflow extends BaseSubworkflow {
    static usePredefinedIds = false;

    constructor(config) {
        super(config);
        this._Application = Application;
        this._ModelFactory = ModelFactory;
        this._UnitFactory = UnitFactory;
        this.initialize();
    }

    initialize() {
        this._application = new this._Application(this.prop("application"));
        this._model = this._ModelFactory.create({
            ...this.prop("model"),
            application: this.prop("application"),
        });
        this._units = setNextLinks(setUnitsHead(this.prop("units", [])), this.id).map((cfg) =>
            this._UnitFactory.create(
                Object.assign(cfg, { application: this.application.toJSON() }),
            ),
        );
    }

    static generateSubworkflowId(...args) {
        args[0] = `subworkflow-${args[0]}`;
        if (this.usePredefinedIds) return Utils.uuid.getUUIDFromNamespace(...args);
        return Utils.uuid.getUUID();
    }

    static get defaultConfig() {
        const defaultName = "New Subworkflow";
        return {
            _id: this.generateSubworkflowId(defaultName),
            name: defaultName,
            application: Application.defaultConfig,
            model: Model.defaultConfig,
            properties: [],
            units: [],
        };
    }

    /*
     * @returns {SubworkflowUnit}
     */
    getAsUnit() {
        return this._UnitFactory.create({
            type: UNIT_TYPES.subworkflow,
            _id: this.id,
            name: this.name,
        });
    }

    /*
     * @summary Used to generate initial application tree, therefore omit setting application.
     */
    static fromArguments(
        application,
        model,
        method,
        name,
        units = [],
        config = {},
        Cls = Subworkflow,
    ) {
        return new Cls({
            ...config,
            _id: Cls.generateSubworkflowId(name),
            name,
            application: application.toJSON(),
            properties: lodash.sortedUniq(
                lodash.flatten(units.filter((x) => x.resultNames).map((x) => x.resultNames)),
            ),
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
        } else {
            // propagate new application version to all units
            this.units
                .filter((unit) => typeof unit.setApplication === "function")
                .forEach((unit) => unit.setApplication(application, true));
        }

        this.setProp("application", application.toJSON());
        // set model to the default one for the application selected
        this.setModel(
            this._ModelFactory.createFromApplication({
                application: this.prop("application"),
            }),
        );
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
        const unitsWithContextProviders = this.units.filter(
            (u) => u.allContextProviders && u.allContextProviders.length,
        );
        const allContextProviders = _.flatten(
            unitsWithContextProviders.map((u) => u.allContextProviders),
        );
        const subworkflowContextProviders = allContextProviders.filter(
            (p) => p.isSubworkflowContextProvider,
        );
        return _.uniq(subworkflowContextProviders, (p) => p.name);
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
            .filter((u) => u.type === UNIT_TYPES.assignment)
            .forEach((u) => {
                ctx[u.operand] = u.value;
            });
        return ctx;
    }

    render(context = {}) {
        const ctx = {
            ...context,
            application: this.application,
            methodData: this.model.method.data,
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
        } else {
            if (index >= 0) units.splice(index, 0, unit);
            else units.push(unit);
            this.setUnits(setNextLinks(setUnitsHead(units)));
        }
    }

    removeUnit(flowchartId) {
        const previousUnit = this.units.find((x) => x.next === flowchartId);
        if (previousUnit) previousUnit.unsetProp("next");
        // TODO: remove the setNextLinks and setUnitsHead and handle the logic via flowchart designer
        this.setUnits(
            setNextLinks(setUnitsHead(this.units.filter((x) => x.flowchartId !== flowchartId))),
        );
    }

    get properties() {
        return lodash.flatten(this.units.map((x) => x.resultNames));
    }

    getUnit(flowchartId) {
        return this.units.find((x) => x.flowchartId === flowchartId);
    }

    unitIndex(flowchartId) {
        return lodash.findIndex(this.units, (unit) => {
            return unit.flowchartId === flowchartId;
        });
    }

    replaceUnit(index, unit) {
        this.units[index] = unit;
        this.setUnits(setNextLinks(setUnitsHead(this.units)));
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
        return this.model.method.data;
    }

    /**
     * @summary Calculates hash of the subworkflow. Meaningful fields are units, app and model.
     * units must be sorted topologically before hashing (already sorted).
     */
    calculateHash() {
        const config = this.toJSON();
        const meaningfulFields = {
            application: Utils.specific.removeTimestampableKeysFromConfig(config.application),
            model: this._calculateModelHash(),
            units: _.map(this.units, (u) => u.calculateHash()).join(),
        };
        return Utils.hash.calculateHashFromObject(meaningfulFields);
    }

    _calculateModelHash() {
        const { model } = this.toJSON();
        // ignore empty data object
        if (this.model.method.omitInHashCalculation) delete model.method.data;
        return Utils.hash.calculateHashFromObject(model);
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
