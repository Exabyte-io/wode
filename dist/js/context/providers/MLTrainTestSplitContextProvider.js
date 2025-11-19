"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MLTrainTestSplitContextProvider = void 0;
var _ade = require("@mat3ra/ade");
var _ApplicationContextMixin = require("../mixins/ApplicationContextMixin");
class MLTrainTestSplitContextProvider extends _ade.ContextProvider {
  constructor(config) {
    super(config);
    this.initApplicationContextMixin();
  }

  // eslint-disable-next-line class-methods-use-this
  get uiSchema() {
    return {
      target_column_name: {},
      problem_category: {}
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get defaultData() {
    return {
      fraction_held_as_test_set: 0.2
    };
  }
  get jsonSchema() {
    return {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: " ",
      description: "Fraction held as the test set. For example, a value of 0.2 corresponds to an 80/20 train/test split.",
      type: "object",
      properties: {
        fraction_held_as_test_set: {
          type: "number",
          default: this.defaultData.fraction_held_as_test_set,
          minimum: 0,
          maximum: 1
        }
      }
    };
  }
}
exports.MLTrainTestSplitContextProvider = MLTrainTestSplitContextProvider;
(0, _ApplicationContextMixin.applicationContextMixin)(MLTrainTestSplitContextProvider.prototype);