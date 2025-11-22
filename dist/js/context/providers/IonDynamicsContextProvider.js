"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IonDynamicsContextProvider = void 0;
var _ade = require("@mat3ra/ade");
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultMDConfig = {
  numberOfSteps: 100,
  timeStep: 5.0,
  electronMass: 100.0,
  temperature: 300.0
};
class IonDynamicsContextProvider extends _ade.JSONSchemaFormDataProvider {
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
    return _JSONSchemasInterface.default.getPatchedSchemaById("context-providers-directory/ion-dynamics-context-provider", {
      numberOfSteps: {
        default: defaultMDConfig.numberOfSteps
      },
      timeStep: {
        default: defaultMDConfig.timeStep
      },
      electronMass: {
        default: defaultMDConfig.electronMass
      },
      temperature: {
        default: defaultMDConfig.temperature
      }
    });
  }
}
exports.IonDynamicsContextProvider = IonDynamicsContextProvider;