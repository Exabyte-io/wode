"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitFactory = void 0;
const enums_1 = require("../enums");
const AssertionUnit_1 = require("./AssertionUnit");
const AssignmentUnit_1 = require("./AssignmentUnit");
const BaseUnit_1 = require("./BaseUnit");
const ConditionUnit_1 = require("./ConditionUnit");
const ExecutionUnit_1 = require("./ExecutionUnit");
const IOUnit_1 = require("./IOUnit");
const MapUnit_1 = require("./MapUnit");
const ProcessingUnit_1 = require("./ProcessingUnit");
const SubworkflowUnit_1 = require("./SubworkflowUnit");
class UnitFactory {
    static create(config) {
        switch (config.type) {
            case enums_1.UNIT_TYPES.execution:
                return new this.ExecutionUnit(config);
            case enums_1.UNIT_TYPES.assignment:
                return new this.AssignmentUnit(config);
            case enums_1.UNIT_TYPES.condition:
                return new this.ConditionUnit(config);
            case enums_1.UNIT_TYPES.io:
                return new this.IOUnit(config);
            case enums_1.UNIT_TYPES.processing:
                return new this.ProcessingUnit(config);
            case enums_1.UNIT_TYPES.map:
                return new this.MapUnit(config);
            case enums_1.UNIT_TYPES.subworkflow:
                return new this.SubworkflowUnit(config);
            case enums_1.UNIT_TYPES.assertion:
                return new this.AssertionUnit(config);
            default:
                return new this.BaseUnit(config);
        }
    }
}
exports.UnitFactory = UnitFactory;
UnitFactory.AssertionUnit = AssertionUnit_1.AssertionUnit;
UnitFactory.AssignmentUnit = AssignmentUnit_1.AssignmentUnit;
UnitFactory.BaseUnit = BaseUnit_1.BaseUnit;
UnitFactory.ConditionUnit = ConditionUnit_1.ConditionUnit;
UnitFactory.ExecutionUnit = ExecutionUnit_1.ExecutionUnit;
UnitFactory.IOUnit = IOUnit_1.IOUnit;
UnitFactory.MapUnit = MapUnit_1.MapUnit;
UnitFactory.ProcessingUnit = ProcessingUnit_1.ProcessingUnit;
UnitFactory.SubworkflowUnit = SubworkflowUnit_1.SubworkflowUnit;
