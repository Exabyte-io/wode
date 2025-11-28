"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnitConfigBuilder = void 0;
var _utils = require("@mat3ra/code/dist/js/utils");
var _underscore = _interopRequireDefault(require("underscore"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UnitConfigBuilder {
  constructor({
    name,
    type,
    flowchartId
  }) {
    this.type = type;
    this._name = name;
    this._head = false;
    this._results = [];
    this._monitors = [];
    this._preProcessors = [];
    this._postProcessors = [];
    this._flowchartId = flowchartId || this.constructor.generateFlowChartId();
  }
  name(str) {
    this._name = str;
    return this;
  }
  head(bool) {
    this._head = bool;
    return this;
  }
  static generateFlowChartId() {
    return (0, _utils.getUUID)();
  }
  flowchartId(flowchartId) {
    this._flowchartId = flowchartId;
    return this;
  }
  static _stringArrayToNamedObject(array) {
    return array.map(name => _underscore.default.isString(name) ? {
      name
    } : name);
  }
  addPreProcessors(preProcessorNames) {
    this._preProcessors = _underscore.default.union(this.constructor._stringArrayToNamedObject(preProcessorNames), this._preProcessors);
    return this;
  }
  addPostProcessors(postProcessorNames) {
    this._postProcessors = _underscore.default.union(this.constructor._stringArrayToNamedObject(postProcessorNames), this._postProcessors);
    return this;
  }
  addResults(resultNames) {
    this._results = _underscore.default.union(this.constructor._stringArrayToNamedObject(resultNames), this._results);
    return this;
  }
  addMonitors(monitorNames) {
    this._monitors = _underscore.default.union(this.constructor._stringArrayToNamedObject(monitorNames), this._monitors);
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
      postProcessors: this._postProcessors
    };
  }
}
exports.UnitConfigBuilder = UnitConfigBuilder;