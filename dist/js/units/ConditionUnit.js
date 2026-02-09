"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
const ConditionUnitSchemaMixin_1 = require("../generated/ConditionUnitSchemaMixin");
const BaseUnit_1 = __importDefault(require("./BaseUnit"));
class ConditionUnit extends BaseUnit_1.default {
    constructor(config) {
        super({
            name: enums_1.UnitType.condition,
            type: enums_1.UnitType.condition,
            input: [],
            results: [],
            preProcessors: [],
            postProcessors: [],
            then: undefined,
            else: undefined,
            statement: "true",
            maxOccurrences: 100,
            ...config,
        });
    }
    getHashObject() {
        return { statement: this.statement, maxOccurrences: this.maxOccurrences };
    }
}
(0, ConditionUnitSchemaMixin_1.conditionUnitSchemaMixin)(ConditionUnit.prototype);
exports.default = ConditionUnit;
