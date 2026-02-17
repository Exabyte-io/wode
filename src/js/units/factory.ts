import type { WorkflowSubworkflowUnitSchema, WorkflowUnitSchema } from "@mat3ra/esse/dist/js/types";

import { UnitType } from "../enums";
import AssertionUnit from "./AssertionUnit";
import AssignmentUnit from "./AssignmentUnit";
import ConditionUnit from "./ConditionUnit";
import ExecutionUnit from "./ExecutionUnit";
import IOUnit from "./IOUnit";
import MapUnit from "./MapUnit";
import ReduceUnit from "./ReduceUnit";
import SubworkflowUnit from "./SubworkflowUnit";

export type AnyWorkflowUnit = MapUnit | SubworkflowUnit | ReduceUnit;

export type AnySubworkflowUnit =
    | ExecutionUnit
    | AssignmentUnit
    | ConditionUnit
    | IOUnit
    | AssertionUnit;

export class UnitFactory {
    static createInWorkflow(config: WorkflowUnitSchema): AnyWorkflowUnit {
        switch (config.type) {
            case UnitType.map:
                return new MapUnit(config);
            case UnitType.subworkflow:
                return new SubworkflowUnit(config);
            case UnitType.reduce:
                return new ReduceUnit(config);
            default:
                throw new Error(`Unknown unit type: ${config.type}`);
        }
    }

    static createInSubworkflow(config: WorkflowSubworkflowUnitSchema): AnySubworkflowUnit {
        switch (config.type) {
            case UnitType.execution:
                return new ExecutionUnit(config);
            case UnitType.assignment:
                return new AssignmentUnit(config);
            case UnitType.condition:
                return new ConditionUnit(config);
            case UnitType.io:
                return new IOUnit(config);
            case UnitType.assertion:
                return new AssertionUnit(config);
            default:
                throw new Error(`Unknown unit type: ${config.type}`);
        }
    }
}
