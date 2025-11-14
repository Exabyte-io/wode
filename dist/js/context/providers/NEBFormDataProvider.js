"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NEBFormDataProvider = void 0;
var _ade = require("@mat3ra/ade");
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
    return {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: " ",
      description: "Number of intermediate NEB images.",
      type: "object",
      properties: {
        nImages: {
          type: "number",
          default: this.defaultData.nImages
        }
      }
    };
  }
}
exports.NEBFormDataProvider = NEBFormDataProvider;