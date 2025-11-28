import type { WorkflowBaseUnitSchema } from "@mat3ra/esse/dist/js/types";
import { BaseUnit } from "./BaseUnit";
type Schema = WorkflowBaseUnitSchema;
export declare class SubworkflowUnit extends BaseUnit implements Schema {
    constructor(config: Partial<Schema>);
    contextProviders: never[];
}
export {};
