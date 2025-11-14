"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointsPathFormDataProvider = exports.ExplicitPointsPathFormDataProvider = exports.ExplicitPointsPath2PIBAFormDataProvider = void 0;
var _JSONSchemaFormDataProvider = _interopRequireDefault(require("@mat3ra/ade/dist/js/context/JSONSchemaFormDataProvider"));
var _math = require("@mat3ra/code/dist/js/math");
var _made = require("@mat3ra/made");
var _underscore = _interopRequireDefault(require("underscore.string"));
var _ApplicationContextMixin = require("../mixins/ApplicationContextMixin");
var _MaterialContextMixin = require("../mixins/MaterialContextMixin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file */
/* eslint react/prop-types: 0 */

const defaultPoint = "Г";
const defaultSteps = 10;
class PointsPathFormDataProvider extends _JSONSchemaFormDataProvider.default {
  constructor(config) {
    super(config);
    this.initMaterialContextMixin();
    this.initApplicationContextMixin();
    this.reciprocalLattice = new _made.Made.ReciprocalLattice(this.material.lattice);
    this.symmetryPoints = this.symmetryPointsFromMaterial;
  }
  get isEditedIsSetToFalseOnMaterialUpdate() {
    return this.isMaterialUpdated || this.isMaterialCreatedDefault;
  }
  get defaultData() {
    return this.reciprocalLattice.defaultKpointPath;
  }
  get symmetryPointsFromMaterial() {
    return this.reciprocalLattice.symmetryPoints;
  }
  get jsonSchema() {
    // no need to pass context to get symmetry points on client
    const points = [].concat(this.symmetryPoints).map(x => x.point);
    return {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: " ",
      description: "path in reciprocal space",
      type: "array",
      items: {
        type: "object",
        properties: {
          point: {
            type: "string",
            default: defaultPoint,
            enum: points
          },
          steps: {
            type: "integer",
            default: defaultSteps
          }
        }
      },
      minItems: 1
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get uiSchema() {
    return {
      items: {}
    };
  }
  get uiSchemaStyled() {
    return {
      items: {
        point: this.defaultFieldStyles,
        steps: this.defaultFieldStyles
      }
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get templates() {
    return {};
  }
  getBrillouinZoneImageComponent(title) {
    const hasRequiredFn = typeof this.material.getBrillouinZoneImageComponent === "function";
    if (!hasRequiredFn) {
      console.log("PointsPathFormDataProvider: Material class has no function" + " 'getBrillouinZoneImageComponent'! Returning empty Object instead.");
      return null;
    }
    return this.material.getBrillouinZoneImageComponent(title);
  }
  get useExplicitPath() {
    return this.application.name === "vasp";
  }

  // override yieldData to avoid storing explicit path in saved context
  yieldDataForRendering() {
    return this.yieldData(this.useExplicitPath);
  }
  transformData(path = [], useExplicitPath = false) {
    const rawData = path.map(p => {
      const point = this.symmetryPoints.find(sp => sp.point === p.point);
      return {
        ...p,
        coordinates: point.coordinates
      };
    });
    const processedData = useExplicitPath ? this._convertToExplicitPath(rawData) : rawData;
    // make coordinates into string and add formatting
    return processedData.map(p => {
      const coordinates = this.is2PIBA ? this.get2PIBACoordinates(p.coordinates) : p.coordinates;
      p.coordinates = coordinates.map(c => _underscore.default.sprintf("%14.9f", c));
      return p;
    });
  }
  get2PIBACoordinates(point) {
    return this.reciprocalLattice.getCartesianCoordinates(point);
  }

  // Initially, path contains symmetry points with steps counts.
  // This function explicitly calculates each point between symmetry points by step counts.
  // eslint-disable-next-line class-methods-use-this
  _convertToExplicitPath(path) {
    const points = [];
    for (let i = 0; i < path.length - 1; i++) {
      const startPoint = path[i];
      const endPoint = path[i + 1];
      const middlePoints = _math.math.calculateSegmentsBetweenPoints3D(startPoint.coordinates, endPoint.coordinates, startPoint.steps);
      points.push(startPoint.coordinates);
      points.push(...middlePoints);
      // Include endPoint into path for the last section, otherwise it will be included by next loop iteration
      if (path.length - 2 === i) points.push(endPoint.coordinates);
    }
    return points.map(x => {
      return {
        coordinates: x,
        steps: 1
      };
    });
  }
}
exports.PointsPathFormDataProvider = PointsPathFormDataProvider;
class ExplicitPointsPathFormDataProvider extends PointsPathFormDataProvider {
  // eslint-disable-next-line class-methods-use-this
  get useExplicitPath() {
    return true;
  }
}
exports.ExplicitPointsPathFormDataProvider = ExplicitPointsPathFormDataProvider;
class ExplicitPointsPath2PIBAFormDataProvider extends ExplicitPointsPathFormDataProvider {
  // eslint-disable-next-line class-methods-use-this
  get is2PIBA() {
    return true;
  }
}
exports.ExplicitPointsPath2PIBAFormDataProvider = ExplicitPointsPath2PIBAFormDataProvider;
(0, _MaterialContextMixin.materialContextMixin)(PointsPathFormDataProvider.prototype);
(0, _ApplicationContextMixin.applicationContextMixin)(PointsPathFormDataProvider.prototype);