"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HubbardUContextProvider = void 0;
var _JSONSchemaFormDataProvider = _interopRequireDefault(require("@mat3ra/ade/dist/js/context/JSONSchemaFormDataProvider"));
var _MaterialContextMixin = require("../mixins/MaterialContextMixin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultHubbardConfig = {
  atomicSpecies: "",
  atomicOrbital: "2p",
  hubbardUValue: 1.0
};
class HubbardUContextProvider extends _JSONSchemaFormDataProvider.default {
  constructor(config) {
    super(config);
    this.initMaterialContextMixin();
    this.uniqueElements = this.material?.Basis?.uniqueElements || [];
    this.orbitalList = ["2p", "3s", "3p", "3d", "4s", "4p", "4d", "4f", "5s", "5p", "5d", "5f", "6s", "6p", "6d", "7s", "7p", "7d"];
    const _elementsWithLabels = this.material?.Basis?.elementsWithLabelsArray || [];
    this.uniqueElementsWithLabels = [...new Set(_elementsWithLabels)];
    this.firstElement = this.uniqueElementsWithLabels?.length > 0 ? this.uniqueElementsWithLabels[0] : "";
  }
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
        orderable: false,
        removable: true
      },
      items: {
        atomicSpecies: this.defaultFieldStyles,
        atomicOrbital: this.defaultFieldStyles,
        hubbardUValue: this.defaultFieldStyles
      }
    };
  }
  get jsonSchema() {
    return {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "",
      description: "Hubbard U parameters for DFT+U or DFT+U+V calculation.",
      type: "array",
      items: {
        type: "object",
        properties: {
          atomicSpecies: {
            type: "string",
            title: "Atomic species",
            enum: this.uniqueElementsWithLabels,
            default: this.firstElement
          },
          atomicOrbital: {
            type: "string",
            title: "Atomic orbital",
            enum: this.orbitalList,
            default: defaultHubbardConfig.atomicOrbital
          },
          hubbardUValue: {
            type: "number",
            title: "Hubbard U (eV)",
            default: defaultHubbardConfig.hubbardUValue
          }
        }
      }
    };
  }
}
exports.HubbardUContextProvider = HubbardUContextProvider;
(0, _MaterialContextMixin.materialContextMixin)(HubbardUContextProvider.prototype);