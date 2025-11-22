"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MLTrainTestSplitContextProvider = void 0;
var _ade = require("@mat3ra/ade");
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
var _ApplicationContextMixin = require("../mixins/ApplicationContextMixin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
    return _JSONSchemasInterface.default.getPatchedSchemaById("context-providers-directory/ml-train-test-split-context-provider", {
      fraction_held_as_test_set: {
        default: this.defaultData.fraction_held_as_test_set
      }
    });
  }
}
exports.MLTrainTestSplitContextProvider = MLTrainTestSplitContextProvider;
(0, _ApplicationContextMixin.applicationContextMixin)(MLTrainTestSplitContextProvider.prototype);