import type { WorkflowBaseUnitSchema } from "@mat3ra/esse/dist/js/types";
import { AssertionUnit } from "./AssertionUnit";
import { AssignmentUnit } from "./AssignmentUnit";
import { BaseUnit } from "./BaseUnit";
import { ConditionUnit } from "./ConditionUnit";
import { ExecutionUnit } from "./ExecutionUnit";
import { IOUnit } from "./IOUnit";
import { MapUnit } from "./MapUnit";
import { ProcessingUnit } from "./ProcessingUnit";
import { SubworkflowUnit } from "./SubworkflowUnit";
export declare class UnitFactory {
    static AssertionUnit: typeof AssertionUnit;
    static AssignmentUnit: typeof AssignmentUnit;
    static BaseUnit: typeof BaseUnit;
    static ConditionUnit: typeof ConditionUnit;
    static ExecutionUnit: typeof ExecutionUnit;
    static IOUnit: typeof IOUnit;
    static MapUnit: typeof MapUnit;
    static ProcessingUnit: typeof ProcessingUnit;
    static SubworkflowUnit: typeof SubworkflowUnit;
    static create(config: Partial<WorkflowBaseUnitSchema> & Pick<WorkflowBaseUnitSchema, "type">): any;
}
