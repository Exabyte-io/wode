import { UNIT_TYPES } from "../enums";
import { AssertionUnit } from "./assertion";
import { AssignmentUnit } from "./assignment";
import { BaseUnit } from "./base";
import { ConditionUnit } from "./condition";
import { ExecutionUnit } from "./execution";
import { IOUnit } from "./io";
import { MapUnit } from "./map";
import { ProcessingUnit } from "./processing";
import { SubworkflowUnit } from "./subworkflow";

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

    static create(config) {
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
