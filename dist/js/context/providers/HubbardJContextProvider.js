"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HubbardJContextProvider = void 0;
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
var _HubbardUContextProvider = require("./HubbardUContextProvider");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultHubbardConfig = {
  paramType: "U",
  atomicSpecies: "",
  atomicOrbital: "2p",
  value: 1.0
};
class HubbardJContextProvider extends _HubbardUContextProvider.HubbardUContextProvider {
  get defaultData() {
    return [{
      ...defaultHubbardConfig,
      atomicSpecies: this.firstElement
    }];
  }
  get uiSchemaStyled() {
    return {
      "ui:options": {
        addable: true,
        orderable: true,
        removable: true
      },
      items: {
        paramType: this.defaultFieldStyles,
        atomicSpecies: this.defaultFieldStyles,
        atomicOrbital: this.defaultFieldStyles,
        value: this.defaultFieldStyles
      }
    };
  }
  get jsonSchema() {
    return _JSONSchemasInterface.default.getPatchedSchemaById("context-providers-directory/hubbard-j-context-provider", {
      "items.properties.paramType": {
        default: defaultHubbardConfig.paramType
      },
      "items.properties.atomicSpecies": {
        enum: this.uniqueElementsWithLabels,
        default: this.firstElement
      },
      "items.properties.atomicOrbital": {
        enum: this.orbitalList,
        default: defaultHubbardConfig.atomicOrbital
      },
      "items.properties.value": {
        default: defaultHubbardConfig.value
      }
    });
  }
}
exports.HubbardJContextProvider = HubbardJContextProvider;