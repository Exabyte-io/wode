import { Application } from "@mat3ra/ade";
import { ContextAndRenderFieldsMixin, InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type DefaultableInMemoryEntityConstructor,
    defaultableEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import {
    type NamedInMemoryEntityConstructor,
    namedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type {
    ApplicationSchema,
    BaseMethod,
    BaseModel,
    JobSchema,
    SubworkflowSchema,
} from "@mat3ra/esse/dist/js/types";
import { type Method, Model, ModelFactory } from "@mat3ra/mode";
import { Utils } from "@mat3ra/utils";
import _ from "underscore";

import { UnitTag, UnitType } from "../enums";
import {
    type SubworkflowSchemaMixin,
    subworkflowSchemaMixin,
} from "../generated/SubworkflowSchemaMixin";
import { AssignmentUnit, ConditionUnit, SubworkflowUnit, UnitFactory } from "../units";
import type { AnySubworkflowUnit } from "../units/factory";
import { setNextLinks, setUnitsHead } from "../utils";
import { createConvergenceParameter } from "./convergence/factory";

// class BaseSubworkflow extends mix(NamedDefaultableRepetitionImportantSettingsInMemoryEntity).with(
//     ConvergenceMixin,
//     ContextAndRenderFieldsMixin,
// ) {}

type ConvergenceConfig = {
    parameter: "N_k" | "N_k_nonuniform";
    parameterInitial: number | [number, number, number];
    parameterIncrement: number;
    result: string;
    resultInitial: number;
    condition: string;
    operator: string;
    tolerance: number;
    maxOccurrences: number;
};

type Base = typeof InMemoryEntity &
    DefaultableInMemoryEntityConstructor &
    NamedInMemoryEntityConstructor &
    Constructor<SubworkflowSchemaMixin>;

export class Subworkflow extends (InMemoryEntity as Base) implements SubworkflowSchema {
    static usePredefinedIds = false;

    private ModelFactory: typeof ModelFactory;

    private applicationInstance: Application;

    modelInstance: Model;

    private unitsInstances: AnySubworkflowUnit[];

    declare static createDefault: () => Subworkflow;

    constructor(config: SubworkflowSchema, _ModelFactory = ModelFactory) {
        super(config);
        this.ModelFactory = _ModelFactory;

        this.applicationInstance = new Application(this.application);
        this.modelInstance = this.ModelFactory.create({
            ...this.model,
            application: this.application,
        });
        this.unitsInstances = setNextLinks(
            setUnitsHead(this.units).map((cfg) => UnitFactory.createInSubworkflow(cfg)),
        );
    }

    static generateSubworkflowId(
        name: string,
        application?: ApplicationSchema,
        model?: BaseModel,
        method?: BaseMethod,
    ) {
        const appName = application?.name || "";
        const modelInfo = model ? `${model.type}-${model.subtype || ""}` : "";
        const methodInfo = method ? `${method.type}-${method.subtype || ""}` : "";
        const seed = [`subworkflow-${name}`, appName, modelInfo, methodInfo]
            .filter((p) => p)
            .join("-");

        return this.usePredefinedIds ? Utils.uuid.getUUIDFromNamespace(seed) : Utils.uuid.getUUID();
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

    getAsUnit() {
        return new SubworkflowUnit({
            type: UnitType.subworkflow,
            _id: this.id,
            name: this.name,
            preProcessors: [],
            postProcessors: [],
            monitors: [],
            results: [],
            flowchartId: "",
        });
    }

    /*
     * @summary Used to generate initial application tree, therefore omit setting application.
     */
    static fromArguments(
        application: Application,
        model: Model,
        method: Method,
        name: string,
        units: AnySubworkflowUnit[] = [],
        config = {},
    ) {
        const nameForIdGeneration = config.attributes?.name || name;
        const { functions, attributes, ...cleanConfig } = config;

        // Set the method on the model so it can be properly serialized
        model.setMethod(method);

        return new Subworkflow({
            ...cleanConfig,
            _id: Subworkflow.generateSubworkflowId(nameForIdGeneration, application, model, method),
            name,
            application: application.toJSON(),
            properties: Array.from(
                new Set(
                    units
                        .filter((x) => x.resultNames)
                        .map((x) => x.resultNames)
                        .flat()
                        .sort(),
                ),
            ),
            model: {
                ...model.toJSON(),
                method: method.toJSON(),
            },
            units: units.map((unit) => unit.toJSON()),
        });
    }

    setApplication(application: Application) {
        // TODO: adjust the logic above to take into account whether units need re-rendering after version change etc.
        // reset units if application name changes
        const previousApplicationName = this.application.name;
        this.applicationInstance = application;

        if (previousApplicationName !== application.name) {
            // TODO: figure out how to set a default unit per new application instead of removing all
            this.setUnits([]);
        } else {
            // propagate new application version to all units
            this.unitsInstances
                .filter((unit) => unit.type === UnitType.execution)
                .forEach((unit) => {
                    unit.setApplication({ application });
                });
        }

        this.application = application.toJSON();
        // set model to the default one for the application selected
        this.setModel(
            this.ModelFactory.createFromApplication({
                application: this.application,
            }),
        );
    }

    setModel(model: Model) {
        this.modelInstance = model;
    }

    setUnits(units: AnySubworkflowUnit[]) {
        this.unitsInstances = units;
    }

    toJSON(exclude: string[] = []): SubworkflowSchema & AnyObject {
        return {
            ...super.toJSON(exclude),
            name: this.name,
            properties: this.properties,
            application: this.application,
            model: this.modelInstance.toJSON(),
            units: this.unitsInstances.map((x) => x.toJSON()),
            ...(this.compute ? { compute: this.compute } : {}), // {"compute": null } won't pass esse validation
        };
    }

    get contextProviders() {
        const subworkflowContextProviders = this.unitsInstances
            .filter((u) => u.type === UnitType.execution)
            .filter((u) => u.allContextProviders.length)
            .map((u) => u.allContextProviders)
            .flat()
            .filter((p) => p.entityName === "subworkflow");

        return _.uniq(subworkflowContextProviders, (p) => p.name);
    }

    private getContextFromAssignmentUnits() {
        return this.unitsInstances
            .filter((u) => u.type === UnitType.assignment)
            .reduce((acc, u) => {
                return {
                    ...acc,
                    [u.operand]: u.value,
                };
            }, {} as Record<string, string | number | boolean>);
    }

    render(context = {}) {
        const ctx = {
            ...context,
            application: this.applicationInstance,
            methodData: this.modelInstance.Method.data,
            model: this.modelInstance.toJSON(),
            // context below is assembled from context providers and passed to units to override theirs
            // ...this.context,
            subworkflowContext: this.getContextFromAssignmentUnits(),
        };

        this.unitsInstances.forEach((u) => {
            if (u.type === UnitType.execution) {
                u.render({}, ctx);
            }
        });
    }

    /**
     * TODO: reuse workflow function instead
     */
    addUnit(unit: AnySubworkflowUnit, index = -1) {
        const { unitsInstances } = this;

        if (unitsInstances.length === 0) {
            unit.head = true;
            this.setUnits([unit]);
        } else {
            if (index >= 0) {
                unitsInstances.splice(index, 0, unit);
            } else {
                unitsInstances.push(unit);
            }
            this.setUnits(setNextLinks(setUnitsHead(unitsInstances)));
        }
    }

    removeUnit(flowchartId: string) {
        const previousUnit = this.unitsInstances.find((x) => x.next === flowchartId);

        if (previousUnit) {
            previousUnit.unsetProp("next");
        }

        // TODO: remove the setNextLinks and setUnitsHead and handle the logic via flowchart designer
        this.setUnits(
            setNextLinks(
                setUnitsHead(this.unitsInstances.filter((x) => x.flowchartId !== flowchartId)),
            ),
        );
    }

    get properties() {
        return this.unitsInstances.map((x) => x.resultNames).flat();
    }

    getUnit(flowchartId: string) {
        return this.unitsInstances.find((x) => x.flowchartId === flowchartId);
    }

    unitIndex(flowchartId: string) {
        return this.unitsInstances.findIndex((unit) => {
            return unit.flowchartId === flowchartId;
        });
    }

    replaceUnit(index: number, unit: AnySubworkflowUnit) {
        this.unitsInstances[index] = unit;
        this.setUnits(setNextLinks(setUnitsHead(this.unitsInstances)));
    }

    setIsDraft(bool: boolean) {
        this.isDraft = bool;
    }

    get methodData() {
        return this.modelInstance.Method.data;
    }

    /**
     * @summary Calculates hash of the subworkflow. Meaningful fields are units, app and model.
     * units must be sorted topologically before hashing (already sorted).
     */
    calculateHash() {
        const config = this.toJSON();
        const meaningfulFields = {
            application: Utils.specific.removeTimestampableKeysFromConfig(config.application),
            model: this.calculateModelHash(),
            units: _.map(this.unitsInstances, (u) => u.calculateHash()).join(),
        };
        return Utils.hash.calculateHashFromObject(meaningfulFields);
    }

    private calculateModelHash() {
        const { model } = this.toJSON();

        // ignore empty data object
        if (this.modelInstance.Method.omitInHashCalculation) {
            delete model.method.data;
        }

        return Utils.hash.calculateHashFromObject(model);
    }

    findUnitById(id: string) {
        // TODO: come back and refactor after converting flowchartId to id
        return this.units.find((u) => u.flowchartId === id);
    }

    findUnitKeyById(id: string) {
        const index = this.units.findIndex((u) => u.flowchartId === id);
        return `units.${index}`;
    }

    private findUnitWithTag(tag: UnitTag) {
        return this.units
            .filter((unit) => unit.type === UnitType.assignment)
            .find((unit) => unit.tags?.includes(tag));
    }

    get hasConvergence() {
        return !!this.convergenceParam && !!this.convergenceResult;
    }

    get convergenceParam() {
        return this.findUnitWithTag(UnitTag.hasConvergenceParam)?.operand;
    }

    get convergenceResult() {
        return this.findUnitWithTag(UnitTag.hasConvergenceResult)?.operand;
    }

    convergenceSeries(scopeTrack: JobSchema["scopeTrack"]) {
        if (!this.hasConvergence || !scopeTrack?.length) {
            return [];
        }

        let lastResult;

        return scopeTrack
            .map((scopeItem, i) => {
                return {
                    x: i,
                    // TODO-question: what is the type of scopeItem.scope?.global?
                    param: scopeItem.scope?.global[this.convergenceParam],
                    y: scopeItem.scope?.global[this.convergenceResult],
                };
            })
            .filter(({ y }) => {
                lastResult = y;
                const isNewResult = y !== undefined && y !== lastResult;
                return isNewResult;
            })
            .map((item, i) => {
                return {
                    x: i + 1,
                    param: item.param,
                    y: item.y,
                };
            });
    }

    addConvergence({
        parameter,
        parameterInitial,
        parameterIncrement,
        result,
        resultInitial,
        condition,
        operator,
        tolerance,
        maxOccurrences,
    }: ConvergenceConfig) {
        // Find unit to converge: should contain passed result in its results list
        // TODO: make user to select unit for convergence explicitly
        const unitForConvergence = this.unitsInstances
            .filter((x) => x.type === UnitType.execution)
            .find((x) => {
                return x.resultNames.find((name) => name === result);
            });

        if (!unitForConvergence) {
            // sAlert.error(
            //     `Subworkflow does not contain unit with '${result}' as extracted property.`,
            // );
            throw new Error(
                `Subworkflow does not contain unit with '${result}' as extracted property.`,
            );
        }

        // initialize parameter
        const param = createConvergenceParameter({
            name: parameter,
            initialValue: parameterInitial,
            increment: parameterIncrement,
        });

        // Replace kgrid to be ready for convergence
        // TODO: kgrid should be abstracted and selected by user
        const gridProvider = unitForConvergence.importantSettingsProviders.find((p) => {
            return ["kgrid", "qgrid"].includes(p.name);
        });

        let mergedContext = param.unitContext;

        if (gridProvider) {
            const providerContext = gridProvider.getContextItemData();

            mergedContext = merge(providerContext, param.unitContext);
            gridProvider.setData(mergedContext);
            gridProvider.setIsEdited(true);
        }

        unitForConvergence.updateContext(mergedContext);

        const prevResult = "prev_result";
        const iteration = "iteration";

        // Assignment with result's initial value
        const prevResultInit = new AssignmentUnit({
            name: "init result",
            head: true,
            operand: prevResult,
            value: resultInitial,
        });

        // Assignment with initial value of convergence parameter
        const paramInit = new AssignmentUnit({
            name: "init parameter",
            operand: param.name,
            value: param.initialValue,
            tags: [UnitTag.hasConvergenceParam],
        });

        // Assignment with initial value of iteration counter
        const iterInit = new AssignmentUnit({
            name: "init counter",
            operand: iteration,
            value: 1,
        });

        // Assignment for storing iteration result: extracts 'result' from convergence unit scope
        const storePrevResult = new AssignmentUnit({
            name: "store result",
            input: [
                {
                    scope: unitForConvergence.flowchartId,
                    name: result,
                },
            ],
            operand: prevResult,
            value: result,
        });

        // Assignment for convergence param increase
        const nextStep = new AssignmentUnit({
            name: "update parameter",
            input: param.useVariablesFromUnitContext(unitForConvergence.flowchartId),
            operand: param.name,
            value: param.increment,
            next: unitForConvergence.flowchartId,
        });

        // Final step of convergence
        const exit = new AssignmentUnit({
            name: "exit",
            input: [],
            operand: param.name,
            value: param.finalValue,
        });

        // Final step of convergence
        const storeResult = new AssignmentUnit({
            name: "update result",
            input: [
                {
                    scope: unitForConvergence.flowchartId,
                    name: result,
                },
            ],
            operand: result,
            value: result,
            tags: [UnitTag.hasConvergenceResult],
        });

        // Assign next iteration value
        const nextIter = new AssignmentUnit({
            name: "update counter",
            input: [],
            operand: iteration,
            value: `${iteration} + 1`,
        });

        // Convergence condition unit
        const conditionUnit = new ConditionUnit({
            name: "check convergence",
            statement: `${condition} ${operator} ${tolerance}`,
            then: exit.flowchartId,
            else: storePrevResult.flowchartId,
            maxOccurrences,
            next: storePrevResult.flowchartId,
        });

        this.addUnit(paramInit, 0);
        this.addUnit(prevResultInit, 1);
        this.addUnit(iterInit, 2);
        this.addUnit(storeResult);
        this.addUnit(conditionUnit);
        this.addUnit(storePrevResult);
        this.addUnit(nextIter);
        this.addUnit(nextStep);
        this.addUnit(exit);

        // `addUnit` adjusts the `next` field, hence the below.
        nextStep.next = unitForConvergence.flowchartId;
    }
}

namedEntityMixin(Subworkflow.prototype);
defaultableEntityMixin(Subworkflow);
subworkflowSchemaMixin(Subworkflow.prototype);
