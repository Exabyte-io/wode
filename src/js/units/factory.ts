import type { WorkflowBaseUnitSchema } from "@mat3ra/esse/dist/js/types";

import { UNIT_TYPES } from "../enums";
import { AssertionUnit } from "./AssertionUnit";
import { AssignmentUnit } from "./AssignmentUnit";
import { BaseUnit } from "./BaseUnit";
import { ConditionUnit } from "./ConditionUnit";
import { ExecutionUnit } from "./ExecutionUnit";
import { IOUnit } from "./IOUnit";
import { MapUnit } from "./MapUnit";
import { ProcessingUnit } from "./ProcessingUnit";
import { ReduceUnit } from "./ReduceUnit";
import { SubworkflowUnit } from "./SubworkflowUnit";

export class UnitFactory {
    static AssertionUnit = AssertionUnit;

    static AssignmentUnit = AssignmentUnit;

    static BaseUnit = BaseUnit;

    static ConditionUnit = ConditionUnit;

    static ExecutionUnit = ExecutionUnit;

    static IOUnit = IOUnit;

    static MapUnit = MapUnit;

    static ProcessingUnit = ProcessingUnit;

    static SubworkflowUnit = SubworkflowUnit;

    static create(config: Partial<WorkflowBaseUnitSchema> & Pick<WorkflowBaseUnitSchema, "type">) {
        switch (config.type) {
            case UNIT_TYPES.execution:
                return new this.ExecutionUnit(config);
            case UNIT_TYPES.assignment:
                return new this.AssignmentUnit(config);
            case UNIT_TYPES.condition:
                return new this.ConditionUnit(config);
            case UNIT_TYPES.io:
                return new this.IOUnit(config);
            case UNIT_TYPES.processing:
                return new this.ProcessingUnit(config);
            case UNIT_TYPES.map:
                return new this.MapUnit(config);
            case UNIT_TYPES.subworkflow:
                return new this.SubworkflowUnit(config);
            case UNIT_TYPES.assertion:
                return new this.AssertionUnit(config);
            default:
                return new this.BaseUnit(config);
        }
    }
}
