"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
const AssignmentUnitSchemaMixin_1 = require("../generated/AssignmentUnitSchemaMixin");
const BaseUnit_1 = __importDefault(require("./BaseUnit"));
class AssignmentUnit extends BaseUnit_1.default {
    constructor(config) {
        super({
            name: enums_1.UnitType.assignment,
            type: enums_1.UnitType.assignment,
            operand: "X",
            value: "1",
            input: [],
            ...config,
        });
    }
    getHashObject() {
        return { input: this.input, operand: this.operand, value: this.value };
    }
}
(0, AssignmentUnitSchemaMixin_1.assignmentUnitSchemaMixin)(AssignmentUnit.prototype);
exports.default = AssignmentUnit;
