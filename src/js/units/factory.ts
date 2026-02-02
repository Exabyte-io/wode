import type {
    AssertionUnitSchema,
    AssignmentUnitSchema,
    ConditionUnitSchema,
    DataIOUnitSchema,
    MapUnitSchema,
    ProcessingUnitSchema,
    ReduceUnitSchema,
    SubworkflowUnitSchema,
} from "@mat3ra/esse/dist/js/types";

import { UnitType } from "../enums";
import { AssertionUnit } from "./AssertionUnit";
import { AssignmentUnit } from "./AssignmentUnit";
import { ConditionUnit } from "./ConditionUnit";
import { type ExecutionUnitSchema, ExecutionUnit } from "./ExecutionUnit";
import { IOUnit } from "./IOUnit";
import { MapUnit } from "./MapUnit";
import { ProcessingUnit } from "./ProcessingUnit";
import { ReduceUnit } from "./ReduceUnit";
import { SubworkflowUnit } from "./SubworkflowUnit";

export type UnitConfig =
    | ExecutionUnitSchema
    | AssignmentUnitSchema
    | ConditionUnitSchema
    | DataIOUnitSchema
    | ProcessingUnitSchema
    | MapUnitSchema
    | SubworkflowUnitSchema
    | AssertionUnitSchema
    | ReduceUnitSchema;

export type AnyUnit =
    // | ExecutionUnit
    // | AssignmentUnit
    // | ConditionUnit
    // | IOUnit
    // | ProcessingUnit
    MapUnit | SubworkflowUnit;
// | AssertionUnit;
// | ReduceUnit;

export type AnySubworkflowUnit =
    | ExecutionUnit
    | AssignmentUnit
    | ConditionUnit
    | IOUnit
    | ProcessingUnit
    | AssertionUnit;

export class UnitFactory {
    static createInWorkflow(config: UnitConfig): AnyUnit {
        switch (config.type) {
            // case UnitType.execution:
            //     return new ExecutionUnit(config);
            // case UnitType.assignment:
            //     return new AssignmentUnit(config);
            // case UnitType.condition:
            //     return new ConditionUnit(config);
            // case UnitType.io:
            //     return new IOUnit(config);
            // case UnitType.processing:
            //     return new ProcessingUnit(config);
            case UnitType.map:
                return new MapUnit(config);
            case UnitType.subworkflow:
                return new SubworkflowUnit(config);
            // case UnitType.assertion:
            //     return new AssertionUnit(config);
            // TODO-question: why there was no reduce unit in the factory?
            // case UnitType.reduce:
            //     return new ReduceUnit(config.name, config.mapFlowchartId, config.input);
            default:
                throw new Error(`Unknown unit type: ${config.type}`);
        }
    }

    static createInSubworkflow(config: UnitConfig): AnySubworkflowUnit {
        switch (config.type) {
            case UnitType.execution:
                return new ExecutionUnit(config);
            case UnitType.assignment:
                return new AssignmentUnit(config);
            case UnitType.condition:
                return new ConditionUnit(config);
            case UnitType.io:
                return new IOUnit(config);
            case UnitType.processing:
                return new ProcessingUnit(config);
            case UnitType.assertion:
                return new AssertionUnit(config);
            // // TODO-question: why there was no reduce unit in the factory?
            // case UnitType.reduce:
            //     return new ReduceUnit(config.name, config.mapFlowchartId, config.input);
            default:
                throw new Error(`Unknown unit type: ${config.type}`);
        }
    }
}
