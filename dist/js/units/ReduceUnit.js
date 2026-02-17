"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
const ReduceUnitSchemaMixin_1 = require("../generated/ReduceUnitSchemaMixin");
const BaseUnit_1 = __importDefault(require("./BaseUnit"));
class ReduceUnit extends BaseUnit_1.default {
    constructor(config) {
        super({ ...config, type: enums_1.UnitType.reduce });
    }
}
(0, ReduceUnitSchemaMixin_1.reduceUnitSchemaMixin)(ReduceUnit.prototype);
exports.default = ReduceUnit;
