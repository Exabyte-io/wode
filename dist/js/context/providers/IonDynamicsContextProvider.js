"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IonDynamicsContextProvider = void 0;
var _JSONSchemaFormDataProvider = _interopRequireDefault(require("@mat3ra/ade/dist/js/context/JSONSchemaFormDataProvider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultMDConfig = {
  numberOfSteps: 100,
  timeStep: 5.0,
  electronMass: 100.0,
  temperature: 300.0
};
class IonDynamicsContextProvider extends _JSONSchemaFormDataProvider.default {
  // eslint-disable-next-line class-methods-use-this
  get defaultData() {
    return defaultMDConfig;
  }

  // eslint-disable-next-line class-methods-use-this
  get uiSchema() {
    return {
      numberOfSteps: {},
      timeStep: {},
      electronMass: {},
      temperature: {}
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get jsonSchema() {
    return {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      description: "Important parameters for molecular dynamics calculation",
      properties: {
        numberOfSteps: {
          type: "integer",
          title: "numberOfSteps",
          default: defaultMDConfig.numberOfSteps
        },
        timeStep: {
          type: "number",
          title: "timeStep (Hartree a.u.)",
          default: defaultMDConfig.timeStep
        },
        electronMass: {
          type: "number",
          title: "Effective electron mass",
          default: defaultMDConfig.electronMass
        },
        temperature: {
          type: "number",
          title: "Ionic temperature (K)",
          default: defaultMDConfig.temperature
        }
      }
    };
  }
}
exports.IonDynamicsContextProvider = IonDynamicsContextProvider;