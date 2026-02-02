import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type DefaultableInMemoryEntityConstructor } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import { type NamedInMemoryEntityConstructor } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { ApplicationSchema, WorkflowSchema } from "@mat3ra/esse/dist/js/types";
import { UnitType } from "../enums";
import { type WorkflowSchemaMixin } from "../generated/WorkflowSchemaMixin";
import { Subworkflow } from "../subworkflows/subworkflow";
import { MapUnit } from "../units";
import { type AnyUnit } from "../units/factory";
type Base = typeof InMemoryEntity & DefaultableInMemoryEntityConstructor & NamedInMemoryEntityConstructor & Constructor<WorkflowSchemaMixin>;
declare const Workflow_base: Base;
export declare class Workflow extends Workflow_base {
    static usePredefinedIds: boolean;
    static readonly defaultConfig: WorkflowSchema;
    static get jsonSchema(): import("json-schema").JSONSchema7 | undefined;
    private subworkflowInstances;
    private unitInstances;
    private workflowInstances;
    private static generateDefaultWorkflowId;
    private static generateStandataWorkflowId;
    static fromSubworkflow(subworkflow: Subworkflow): Workflow;
    constructor(config: WorkflowSchema & {
        applicationName?: string;
    });
    get workflows(): WorkflowSchema[] | undefined;
    set workflows(value: WorkflowSchema[] | undefined);
    addSubworkflow(subworkflow: Subworkflow, head?: boolean, index?: number): void;
    removeSubworkflow(id: string): void;
    setUnits(arr: AnyUnit[]): void;
    get usedApplications(): ApplicationSchema[];
    get usedApplicationVersions(): string[];
    get usedApplicationNamesWithVersions(): string[];
    get usedModels(): ("dft" | "ml" | "unknown")[];
    get humanReadableUsedModels(): string[];
    toJSON(): WorkflowSchema & AnyObject;
    get properties(): string[];
    get humanReadableProperties(): string[];
    get systemName(): string;
    get defaultDescription(): string;
    private addUnit;
    private removeUnit;
    addUnitType(type: UnitType, head?: boolean, index?: number): void;
    addMapUnit(mapUnit: MapUnit, mapWorkflow: Workflow): void;
    get allSubworkflows(): Subworkflow[];
    /**
     * @summary Calculates hash of the workflow. Meaningful fields are units and subworkflows.
     * units and subworkflows must be sorted topologically before hashing (already sorted).
     */
    calculateHash(): string;
    get hasRelaxation(): boolean;
    toggleRelaxation(): void;
    private getStandataRelaxationSubworkflow;
    private getRelaxationSubworkflow;
}
export {};
