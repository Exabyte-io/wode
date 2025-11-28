"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseUnit = void 0;
var _entity = require("@mat3ra/code/dist/js/entity");
var _TaggableMixin = require("@mat3ra/code/dist/js/entity/mixins/TaggableMixin");
var _utils = require("@mat3ra/code/dist/js/utils");
var _lodash = _interopRequireDefault(require("lodash"));
var _enums = require("../enums");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line max-len
class BaseUnit extends _entity.NamedDefaultableRepetitionRuntimeItemsImportantSettingsContextAndRenderHashedInMemoryEntity {
  constructor(config) {
    super({
      ...config,
      status: config.status || _enums.UNIT_STATUSES.idle,
      statusTrack: config.statusTrack || [],
      flowchartId: config.flowchartId || BaseUnit.generateFlowChartId(),
      tags: config.tags || []
    });
  }
  static generateFlowChartId() {
    return (0, _utils.getUUID)();
  }
  get flowchartId() {
    return this.prop("flowchartId");
  }
  get head() {
    return this.prop("head", false);
  }
  set head(bool) {
    this.setProp("head", bool);
  }
  get next() {
    return this.prop("next");
  }
  set next(flowchartId) {
    this.setProp("next", flowchartId);
  }
  get status() {
    return _lodash.default.get(this.lastStatusUpdate, "status") || _enums.UNIT_STATUSES.idle;
  }
  set status(s) {
    this.setProp("status", s);
  }
  get lastStatusUpdate() {
    const statusTrack = this.prop("statusTrack", []).filter(s => (s.repetition || 0) === this.repetition);
    const sortedStatusTrack = _lodash.default.sortBy(statusTrack || [], x => x.trackedAt);
    return sortedStatusTrack[sortedStatusTrack.length - 1];
  }
  get type() {
    return this.prop("type");
  }
  get isDraft() {
    return this.prop("isDraft", false);
  }
  getHashObject() {
    return {
      ...this.hashObjectFromRuntimeItems,
      type: this.type
    };
  }

  /**
   * Checks whether a unit is currently in a given status (e.g. idle, active, etc). The full list can be found
   * in the UNIT_STATUSES variable in enums.js.
   * @param status (String) name of the status to check
   * @returns Boolean
   */
  isInStatus(status) {
    return this.status === status;
  }
  clone(extraContext) {
    const flowchartIDOverrideConfigAsExtraContext = {
      flowchartId: BaseUnit.generateFlowChartId(),
      ...extraContext
    };
    return super.clone(flowchartIDOverrideConfigAsExtraContext);
  }
}
exports.BaseUnit = BaseUnit;
(0, _TaggableMixin.taggableMixin)(BaseUnit.prototype);