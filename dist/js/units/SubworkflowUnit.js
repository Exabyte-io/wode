"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubworkflowUnit = void 0;
const enums_1 = require("../enums");
const BaseUnit_1 = require("./BaseUnit");
class SubworkflowUnit extends BaseUnit_1.BaseUnit {
    constructor(config) {
        super({ name: "New Subworkflow", type: enums_1.UNIT_TYPES.subworkflow, ...config });
        this.contextProviders = [];
    }
}
exports.SubworkflowUnit = SubworkflowUnit;
