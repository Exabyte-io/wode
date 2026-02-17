"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMapConfig = void 0;
const enums_1 = require("../enums");
const MapUnitSchemaMixin_1 = require("../generated/MapUnitSchemaMixin");
const BaseUnit_1 = __importDefault(require("./BaseUnit"));
exports.defaultMapConfig = {
    name: enums_1.UnitType.map,
    type: enums_1.UnitType.map,
    workflowId: "",
    input: {
        target: "MAP_DATA",
        scope: "global",
        name: "",
        values: [],
        useValues: false,
    },
};
class MapUnit extends BaseUnit_1.default {
    constructor(config) {
        super({ ...exports.defaultMapConfig, ...config });
    }
    setWorkflowId(id) {
        this.setProp("workflowId", id);
    }
}
(0, MapUnitSchemaMixin_1.mapUnitSchemaMixin)(MapUnit.prototype);
exports.default = MapUnit;
