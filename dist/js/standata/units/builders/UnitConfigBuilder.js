"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitConfigBuilder = void 0;
const utils_1 = require("@mat3ra/utils");
// eslint-disable-next-line import/no-extraneous-dependencies
const underscore_1 = __importDefault(require("underscore"));
class UnitConfigBuilder {
    constructor({ name, type, flowchartId }) {
        this.type = type;
        this._name = name;
        this._head = false;
        this._results = [];
        this._monitors = [];
        this._preProcessors = [];
        this._postProcessors = [];
        this._flowchartId = flowchartId || this.constructor.generateFlowChartId(name);
    }
    name(str) {
        this._name = str;
        return this;
    }
    head(bool) {
        this._head = bool;
        return this;
    }
    static generateFlowChartId(...args) {
        if (this.usePredefinedIds)
            return utils_1.Utils.uuid.getUUIDFromNamespace(...args);
        return utils_1.Utils.uuid.getUUID();
    }
    flowchartId(flowchartId) {
        this._flowchartId = flowchartId;
        return this;
    }
    static _stringArrayToNamedObject(array) {
        return array.map((name) => (underscore_1.default.isString(name) ? { name } : name));
    }
    addPreProcessors(preProcessorNames) {
        this._preProcessors = underscore_1.default.union(this.constructor._stringArrayToNamedObject(preProcessorNames), this._preProcessors);
        return this;
    }
    addPostProcessors(postProcessorNames) {
        this._postProcessors = underscore_1.default.union(this.constructor._stringArrayToNamedObject(postProcessorNames), this._postProcessors);
        return this;
    }
    addResults(resultNames) {
        this._results = underscore_1.default.union(this.constructor._stringArrayToNamedObject(resultNames), this._results);
        return this;
    }
    addMonitors(monitorNames) {
        this._monitors = underscore_1.default.union(this.constructor._stringArrayToNamedObject(monitorNames), this._monitors);
        return this;
    }
    build() {
        return {
            type: this.type,
            name: this._name,
            head: this._head,
            results: this._results,
            monitors: this._monitors,
            flowchartId: this._flowchartId,
            preProcessors: this._preProcessors,
            postProcessors: this._postProcessors,
        };
    }
}
exports.UnitConfigBuilder = UnitConfigBuilder;
UnitConfigBuilder.usePredefinedIds = false;
