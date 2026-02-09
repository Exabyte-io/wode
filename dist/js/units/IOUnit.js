"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
const IOUnitSchemaMixin_1 = require("../generated/IOUnitSchemaMixin");
const BaseUnit_1 = __importDefault(require("./BaseUnit"));
class IOUnit extends BaseUnit_1.default {
    constructor(config) {
        super({ name: enums_1.UnitType.io, subtype: "input", ...config, type: enums_1.UnitType.io });
    }
}
(0, IOUnitSchemaMixin_1.iOUnitSchemaMixin)(IOUnit.prototype);
exports.default = IOUnit;
