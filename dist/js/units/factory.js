"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitFactory = void 0;
const enums_1 = require("../enums");
const AssertionUnit_1 = require("./AssertionUnit");
const AssignmentUnit_1 = require("./AssignmentUnit");
const ConditionUnit_1 = require("./ConditionUnit");
const ExecutionUnit_1 = require("./ExecutionUnit");
const IOUnit_1 = require("./IOUnit");
const MapUnit_1 = require("./MapUnit");
const ProcessingUnit_1 = require("./ProcessingUnit");
const SubworkflowUnit_1 = require("./SubworkflowUnit");
class UnitFactory {
    static createInWorkflow(config) {
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
            case enums_1.UnitType.map:
                return new MapUnit_1.MapUnit(config);
            case enums_1.UnitType.subworkflow:
                return new SubworkflowUnit_1.SubworkflowUnit(config);
            // case UnitType.assertion:
            //     return new AssertionUnit(config);
            // TODO-question: why there was no reduce unit in the factory?
            // case UnitType.reduce:
            //     return new ReduceUnit(config.name, config.mapFlowchartId, config.input);
            default:
                throw new Error(`Unknown unit type: ${config.type}`);
        }
    }
    static createInSubworkflow(config) {
        switch (config.type) {
            case enums_1.UnitType.execution:
                return new ExecutionUnit_1.ExecutionUnit(config);
            case enums_1.UnitType.assignment:
                return new AssignmentUnit_1.AssignmentUnit(config);
            case enums_1.UnitType.condition:
                return new ConditionUnit_1.ConditionUnit(config);
            case enums_1.UnitType.io:
                return new IOUnit_1.IOUnit(config);
            case enums_1.UnitType.processing:
                return new ProcessingUnit_1.ProcessingUnit(config);
            case enums_1.UnitType.assertion:
                return new AssertionUnit_1.AssertionUnit(config);
            // // TODO-question: why there was no reduce unit in the factory?
            // case UnitType.reduce:
            //     return new ReduceUnit(config.name, config.mapFlowchartId, config.input);
            default:
                throw new Error(`Unknown unit type: ${config.type}`);
        }
    }
}
exports.UnitFactory = UnitFactory;
