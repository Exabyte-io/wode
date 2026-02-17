import type { WorkflowSubworkflowUnitSchema, WorkflowUnitSchema } from "@mat3ra/esse/dist/js/types";
import AssertionUnit from "./AssertionUnit";
import AssignmentUnit from "./AssignmentUnit";
import ConditionUnit from "./ConditionUnit";
import ExecutionUnit from "./ExecutionUnit";
import IOUnit from "./IOUnit";
import MapUnit from "./MapUnit";
import ReduceUnit from "./ReduceUnit";
import SubworkflowUnit from "./SubworkflowUnit";
export type AnyWorkflowUnit = MapUnit | SubworkflowUnit | ReduceUnit;
export type AnySubworkflowUnit = ExecutionUnit | AssignmentUnit | ConditionUnit | IOUnit | AssertionUnit;
export declare class UnitFactory {
    static createInWorkflow(config: WorkflowUnitSchema): AnyWorkflowUnit;
    static createInSubworkflow(config: WorkflowSubworkflowUnitSchema): AnySubworkflowUnit;
}
