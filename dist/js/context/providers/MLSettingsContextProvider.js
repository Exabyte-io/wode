"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MLSettingsContextProvider = void 0;
var _ade = require("@mat3ra/ade");
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
var _ApplicationContextMixin = require("../mixins/ApplicationContextMixin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MLSettingsContextProvider extends _ade.ContextProvider {
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
      target_column_name: "target",
      problem_category: "regression"
    };
  }
  get jsonSchema() {
    return _JSONSchemasInterface.default.getPatchedSchemaById("context-providers-directory/ml-settings-context-provider", {
      target_column_name: {
        default: this.defaultData.target_column_name
      },
      problem_category: {
        default: this.defaultData.problem_category
      }
    });
  }
}
exports.MLSettingsContextProvider = MLSettingsContextProvider;
(0, _ApplicationContextMixin.applicationContextMixin)(MLSettingsContextProvider.prototype);