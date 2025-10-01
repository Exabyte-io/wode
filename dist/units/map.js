"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.defaultMapConfig = exports.MapUnit = void 0;
var _enums = require("../enums");
var _base = require("./base");
const defaultMapConfig = (exports.defaultMapConfig = {
    name: _enums.UNIT_TYPES.map,
    type: _enums.UNIT_TYPES.map,
    workflowId: "",
    input: {
        target: "MAP_DATA",
        scope: "global",
        name: "",
        values: [],
        useValues: false,
    },
});
class MapUnit extends _base.BaseUnit {
    constructor(config) {
        super({
            ...defaultMapConfig,
            ...config,
        });
    }
    get input() {
        return this.prop("input");
    }
    get workflowId() {
        return this.prop("workflowId");
    }
    setWorkflowId(id) {
        this.setProp("workflowId", id);
    }
}
exports.MapUnit = MapUnit;
