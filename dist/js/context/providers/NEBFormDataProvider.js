"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NEBFormDataProvider = void 0;
var _ade = require("@mat3ra/ade");
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class NEBFormDataProvider extends _ade.JSONSchemaFormDataProvider {
  // eslint-disable-next-line class-methods-use-this
  get defaultData() {
    return {
      nImages: 1
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get uiSchema() {
    return {
      nImages: {}
    };
  }
  get jsonSchema() {
    return _JSONSchemasInterface.default.getPatchedSchemaById("context-providers-directory/neb-data-provider", {
      nImages: {
        default: this.defaultData.nImages
      }
    });
  }
}
exports.NEBFormDataProvider = NEBFormDataProvider;