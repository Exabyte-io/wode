import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type DefaultableInMemoryEntityConstructor,
    defaultableEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import {
    type NamedInMemoryEntityConstructor,
    namedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type {
    ApplicationSchema,
    SubworkflowSchema,
    WorkflowSchema,
} from "@mat3ra/esse/dist/js/types";
import { tree } from "@mat3ra/mode";
import { SubworkflowStandata } from "@mat3ra/standata";
import { Utils } from "@mat3ra/utils";
// import { mix } from "mixwith";
import _ from "underscore";
import s from "underscore.string";

import { UnitType } from "../enums";
import { type WorkflowSchemaMixin, workflowSchemaMixin } from "../generated/WorkflowSchemaMixin";
import { Subworkflow } from "../subworkflows/subworkflow";
import { MapUnit } from "../units";
import { type AnyUnit, UnitFactory } from "../units/factory";
import { setNextLinks, setUnitsHead } from "../utils";
import defaultWorkflowConfig from "./default";
import { RelaxationLogicMixin } from "./relaxation";

const { MODEL_NAMES } = tree;

// class BaseWorkflow extends mix(NamedDefaultableRepetitionContextAndRenderInMemoryEntity).with(
//     ComputedEntityMixin,
//     RelaxationLogicMixin,
// ) {}

type Base = typeof InMemoryEntity &
    DefaultableInMemoryEntityConstructor &
    NamedInMemoryEntityConstructor &
    Constructor<WorkflowSchemaMixin>;

type GenerateWorkflowIdParams = {
    name: string;
    properties?: string[];
    subworkflows?: SubworkflowSchema[];
    applicationName?: string;
};

export class Workflow extends (InMemoryEntity as Base) {
    static usePredefinedIds = false;

    static readonly defaultConfig = defaultWorkflowConfig;

    static get jsonSchema() {
        return JSONSchemasInterface.getSchemaById("workflow");
    }

    private subworkflowInstances: Subworkflow[];

    private unitInstances: AnyUnit[];

    private workflowInstances: Workflow[];

    private static generateDefaultWorkflowId() {
        return Utils.uuid.getUUID();
    }

    private static generateStandataWorkflowId({
        name,
        properties,
        subworkflows,
        applicationName,
    }: GenerateWorkflowIdParams) {
        const propsInfo = properties?.length ? properties.sort().join(",") : "";
        const swInfo = subworkflows?.length
            ? subworkflows.map((sw) => sw.name || "unknown").join(",")
            : "";
        const seed = [`workflow-${name}`, applicationName, propsInfo, swInfo]
            .filter((p) => p)
            .join("-");

        return Utils.uuid.getUUIDFromNamespace(seed);
    }

    static fromSubworkflow(subworkflow: Subworkflow) {
        const config = {
            name: subworkflow.name,
            subworkflows: [subworkflow.toJSON()],
            units: setNextLinks(setUnitsHead([subworkflow.getAsUnit().toJSON()])),
            properties: subworkflow.properties,
            applicationName: subworkflow.application.name,
            workflows: [] as WorkflowSchema[],
        };
        return new Workflow(config);
    }

    constructor(config: WorkflowSchema & { applicationName?: string }) {
        if (!config._id) {
            if (Workflow.usePredefinedIds) {
                if (!config.applicationName) {
                    throw new Error("applicationName is required when usePredefinedIds is true");
                }
                config._id = Workflow.generateStandataWorkflowId(config);
            } else {
                config._id = Workflow.generateDefaultWorkflowId();
            }
        }

        super(config);

        this.subworkflowInstances = this.subworkflows.map((x) => new Subworkflow(x));
        this.unitInstances = this.units.map((unit) => UnitFactory.createInWorkflow(unit));
        this.workflowInstances = this.workflows?.map((x) => new Workflow(x)) || [];
    }

    get workflows() {
        return this.prop<WorkflowSchema[]>("workflows");
    }

    set workflows(value: WorkflowSchema[] | undefined) {
        this.setProp("workflows", value);
    }

    addSubworkflow(subworkflow: Subworkflow, head = false, index = -1) {
        const subworkflowUnit = subworkflow.getAsUnit();

        if (head) {
            this.subworkflowInstances.unshift(subworkflow);
            this.addUnit(subworkflowUnit, head, index);
        } else {
            this.subworkflowInstances.push(subworkflow);
            this.addUnit(subworkflowUnit, head, index);
        }
    }

    removeSubworkflow(id: string) {
        const subworkflowUnit = this.unitInstances.find((u) => u.id === id);

        if (subworkflowUnit) {
            this.removeUnit(subworkflowUnit.flowchartId);
        }
    }

    setUnits(arr: AnyUnit[]) {
        this.unitInstances = arr;
    }

    get usedApplications(): ApplicationSchema[] {
        const swApplications = this.subworkflows.map((sw) => sw.application);
        const wfApplications = this.workflowInstances.map((w) => w.usedApplications).flat();

        const usedApplications = [...swApplications, ...wfApplications].reduce((acc, app) => {
            if (!acc.some((a) => a.name === app.name)) {
                acc.push(app);
            }
            return acc;
        }, [] as ApplicationSchema[]);

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

    toJSON(): WorkflowSchema & AnyObject {
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
        return this.properties.map((name) => s.humanize(name));
    }

    get systemName() {
        const applicationNames = this.usedApplications.map((a) => a.name);
        return s.slugify(`${applicationNames.join(":")}-${this.name.toLowerCase()}`);
    }

    get defaultDescription() {
        return `${this.usedModels.join(", ").toUpperCase()} workflow using ${this.usedApplications
            .map((a) => a.name)
            .join(", ")}.`;
    }

    // TODO-question: clarify head logic
    private addUnit(unit: AnyUnit, head = false, index = -1) {
        const [...unitInstances] = this.unitInstances;

        if (unitInstances.length === 0) {
            unit.head = true;
            this.setUnits([unit]);
        } else {
            if (head) {
                unitInstances.unshift(unit);
            } else if (index >= 0) {
                unitInstances.splice(index, 0, unit);
            } else {
                unitInstances.push(unit);
            }
            this.setUnits(setNextLinks(setUnitsHead(unitInstances)));
        }
    }

    private removeUnit(flowchartId: string) {
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

        this.unitInstances = setNextLinks(
            setUnitsHead(this.unitInstances.filter((x) => x.flowchartId !== flowchartId)),
        );
    }

    /*
     * @param type {String|Object} Unit type, map or subworkflow
     * @param head {Boolean}
     * @param index {Number} Index at which the unit will be added. -1 by default (ignored).
     */
    addUnitType(type: UnitType, head = false, index = -1) {
        switch (type) {
            case UnitType.map: {
                const mapWorkflowConfig = {
                    ...defaultWorkflowConfig,
                    _id: Workflow.generateDefaultWorkflowId(),
                };
                const mapUnit = new MapUnit({
                    workflowId: mapWorkflowConfig._id,
                });

                this.workflows = [...(this.workflows || []), mapWorkflowConfig];
                this.workflowInstances = this.workflows.map((x) => new Workflow(x));

                this.addUnit(mapUnit, head, index);

                break;
            }
            case UnitType.subworkflow:
                this.addSubworkflow(Subworkflow.createDefault(), head, index);
                break;
            default:
                console.log(`unit_type=${type} unrecognized, skipping.`);
        }
    }

    addMapUnit(mapUnit: MapUnit, mapWorkflow: Workflow) {
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
        const subworkflowsList: Subworkflow[] = [];
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
    calculateHash(): string {
        const meaningfulFields = {
            units: _.map(this.unitInstances, (u) => u.calculateHash()).join(),
            subworkflows: _.map(this.subworkflowInstances, (sw) => sw.calculateHash()).join(),
            workflows: _.map(this.workflowInstances, (w) => w.calculateHash()).join(),
        };
        return Utils.hash.calculateHashFromObject(meaningfulFields);
    }

    get hasRelaxation() {
        return Boolean(this.getRelaxationSubworkflow());
    }

    toggleRelaxation() {
        const relaxSubworkflow = this.getRelaxationSubworkflow();
        if (relaxSubworkflow?._id) {
            this.removeSubworkflow(relaxSubworkflow._id);
        } else {
            const vcRelax = this.getStandataRelaxationSubworkflow();
            if (vcRelax) {
                this.addSubworkflow(new Subworkflow(vcRelax), true);
            }
        }
    }

    private getStandataRelaxationSubworkflow() {
        // TODO: fix standata type
        return new SubworkflowStandata().getRelaxationSubworkflowByApplication(
            this.subworkflowInstances[0].application.name,
        ) as unknown as SubworkflowSchema;
    }

    private getRelaxationSubworkflow() {
        const standataSubworkflow = this.getStandataRelaxationSubworkflow();

        return this.subworkflows.find((sw) => {
            return standataSubworkflow && standataSubworkflow.systemName === sw.systemName;
        });
    }
}

namedEntityMixin(Workflow.prototype);
defaultableEntityMixin(Workflow);
workflowSchemaMixin(Workflow.prototype);
