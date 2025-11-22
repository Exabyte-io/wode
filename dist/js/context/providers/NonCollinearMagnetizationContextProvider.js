"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NonCollinearMagnetizationContextProvider = void 0;
var _ade = require("@mat3ra/ade");
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
var _lodash = _interopRequireDefault(require("lodash"));
var _MaterialContextMixin = require("../mixins/MaterialContextMixin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class NonCollinearMagnetizationContextProvider extends _ade.JSONSchemaFormDataProvider {
  constructor(config) {
    super(config);
    this.initMaterialContextMixin();
    this.isStartingMagnetization = _lodash.default.get(this.data, "isStartingMagnetization", true);
    this.isConstrainedMagnetization = _lodash.default.get(this.data, "isConstrainedMagnetization", false);
    this.isExistingChargeDensity = _lodash.default.get(this.data, "isExistingChargeDensity", false);
    this.isArbitrarySpinDirection = _lodash.default.get(this.data, "isArbitrarySpinDirection", false);
    this.isFixedMagnetization = _lodash.default.get(this.data, "isFixedMagnetization", false);
    this.constrainedMagnetization = _lodash.default.get(this.data, "constrainedMagnetization", {});
  }
  get uniqueElementsWithLabels() {
    const elementsWithLabelsArray = this.material?.Basis?.elementsWithLabelsArray || [];
    return [...new Set(elementsWithLabelsArray)];
  }
  get defaultData() {
    const startingMagnetization = this.uniqueElementsWithLabels.map((element, index) => {
      return {
        index: index + 1,
        atomicSpecies: element,
        value: 0.0
      };
    });
    const spinAngles = this.uniqueElementsWithLabels.map((element, index) => {
      return {
        index: index + 1,
        atomicSpecies: element,
        angle1: 0.0,
        angle2: 0.0
      };
    });
    return {
      isExistingChargeDensity: false,
      isStartingMagnetization: true,
      isConstrainedMagnetization: false,
      isArbitrarySpinAngle: false,
      isFixedMagnetization: false,
      lforcet: true,
      spinAngles,
      startingMagnetization,
      constrainedMagnetization: {
        lambda: 0.0,
        constrainType: "atomic direction"
      },
      fixedMagnetization: {
        x: 0.0,
        y: 0.0,
        z: 0.0
      }
    };
  }
  get uiSchemaStyled() {
    return {
      isExistingChargeDensity: {},
      lforcet: {
        "ui:readonly": !this.isExistingChargeDensity,
        "ui:widget": "radio",
        "ui:options": {
          inline: true
        }
      },
      isArbitrarySpinDirection: {},
      spinAngles: {
        items: {
          atomicSpecies: {
            ...this.defaultFieldStyles,
            "ui:readonly": true
          },
          angle1: this.defaultFieldStyles,
          angle2: this.defaultFieldStyles
        },
        "ui:readonly": !this.isArbitrarySpinDirection,
        "ui:options": {
          addable: false,
          orderable: false,
          removable: false
        }
      },
      isStartingMagnetization: {},
      startingMagnetization: {
        items: {
          atomicSpecies: {
            ...this.defaultFieldStyles,
            "ui:readonly": true
          },
          value: {
            "ui:classNames": "col-xs-6"
          }
        },
        "ui:readonly": !this.isStartingMagnetization,
        "ui:options": {
          addable: false,
          orderable: false,
          removable: false
        }
      },
      isConstrainedMagnetization: {},
      constrainedMagnetization: {
        constrainType: this.defaultFieldStyles,
        lambda: this.defaultFieldStyles,
        "ui:readonly": !this.isConstrainedMagnetization
      },
      isFixedMagnetization: {
        "ui:readonly": !(this.isConstrainedMagnetization && this.constrainedMagnetization?.constrainType === "total")
      },
      fixedMagnetization: {
        x: this.defaultFieldStyles,
        y: this.defaultFieldStyles,
        z: this.defaultFieldStyles,
        "ui:readonly": !(this.isFixedMagnetization && this.isConstrainedMagnetization && this.constrainedMagnetization?.constrainType === "total")
      }
    };
  }
  get jsonSchema() {
    return _JSONSchemasInterface.default.getPatchedSchemaById("context-providers-directory/non-collinear-magnetization-context-provider", {
      isExistingChargeDensity: {
        default: false
      },
      isStartingMagnetization: {
        default: true
      },
      isArbitrarySpinAngle: {
        default: false
      },
      isConstrainedMagnetization: {
        default: false
      },
      isFixedMagnetization: {
        default: true
      },
      startingMagnetization: {
        minItems: this.uniqueElementsWithLabels.length,
        maxItems: this.uniqueElementsWithLabels.length
      },
      "startingMagnetization.items.properties.value": {
        default: 0.0,
        minimum: -1.0,
        maximum: 1.0
      },
      spinAngles: {
        minItems: this.uniqueElementsWithLabels.length,
        maxItems: this.uniqueElementsWithLabels.length
      },
      "spinAngles.items.properties.angle1": {
        default: 0.0
      },
      "spinAngles.items.properties.angle2": {
        default: 0.0
      },
      "constrainedMagnetization.properties.constrainType": {
        default: "atomic direction"
      },
      "constrainedMagnetization.properties.lambda": {
        default: 0.0
      },
      "fixedMagnetization.properties.x": {
        default: 0.0
      },
      "fixedMagnetization.properties.y": {
        default: 0.0
      },
      "fixedMagnetization.properties.z": {
        default: 0.0
      }
    });
  }
}
exports.NonCollinearMagnetizationContextProvider = NonCollinearMagnetizationContextProvider;
(0, _MaterialContextMixin.materialContextMixin)(NonCollinearMagnetizationContextProvider.prototype);