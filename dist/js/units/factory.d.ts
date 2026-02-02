import type { AssertionUnitSchema, AssignmentUnitSchema, ConditionUnitSchema, DataIOUnitSchema, MapUnitSchema, ProcessingUnitSchema, ReduceUnitSchema, SubworkflowUnitSchema } from "@mat3ra/esse/dist/js/types";
import { AssertionUnit } from "./AssertionUnit";
import { AssignmentUnit } from "./AssignmentUnit";
import { ConditionUnit } from "./ConditionUnit";
import { type ExecutionUnitSchema, ExecutionUnit } from "./ExecutionUnit";
import { IOUnit } from "./IOUnit";
import { MapUnit } from "./MapUnit";
import { ProcessingUnit } from "./ProcessingUnit";
import { SubworkflowUnit } from "./SubworkflowUnit";
export type UnitConfig = ExecutionUnitSchema | AssignmentUnitSchema | ConditionUnitSchema | DataIOUnitSchema | ProcessingUnitSchema | MapUnitSchema | SubworkflowUnitSchema | AssertionUnitSchema | ReduceUnitSchema;
export type AnyUnit = MapUnit | SubworkflowUnit;
export type AnySubworkflowUnit = ExecutionUnit | AssignmentUnit | ConditionUnit | IOUnit | ProcessingUnit | AssertionUnit;
export declare class UnitFactory {
    static createInWorkflow(config: UnitConfig): AnyUnit;
    static createInSubworkflow(config: UnitConfig): AnySubworkflowUnit;
}
