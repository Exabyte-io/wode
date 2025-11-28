"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExplicitPointsPath2PIBAFormDataProvider = exports.ExplicitPointsPathFormDataProvider = exports.PointsPathFormDataProvider = void 0;
/* eslint-disable max-classes-per-file */
/* eslint react/prop-types: 0 */
const ade_1 = require("@mat3ra/ade");
const math_1 = require("@mat3ra/code/dist/js/math");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const made_1 = require("@mat3ra/made");
const underscore_string_1 = __importDefault(require("underscore.string"));
const ApplicationContextMixin_1 = require("../mixins/ApplicationContextMixin");
const MaterialContextMixin_1 = require("../mixins/MaterialContextMixin");
const defaultPoint = "Г";
const defaultSteps = 10;
class PointsPathFormDataProvider extends ade_1.JSONSchemaFormDataProvider {
    constructor(config) {
        super(config);
        this.jsonSchemaId = "context-providers-directory/points-path-data-provider";
        this.initMaterialContextMixin();
        this.initApplicationContextMixin();
        this.reciprocalLattice = new made_1.Made.ReciprocalLattice(this.material.lattice);
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
    get jsonSchemaPatchConfig() {
        const points = [].concat(this.symmetryPoints).map((x) => x.point);
        return {
            "items.properties.point": {
                default: defaultPoint,
                enum: points,
            },
            "items.properties.steps": {
                default: defaultSteps,
            },
        };
    }
    get jsonSchema() {
        return JSONSchemasInterface_1.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
    }
    // eslint-disable-next-line class-methods-use-this
    get uiSchema() {
        return {
            items: {},
        };
    }
    get uiSchemaStyled() {
        return {
            items: {
                point: this.defaultFieldStyles,
                steps: this.defaultFieldStyles,
            },
        };
    }
    // eslint-disable-next-line class-methods-use-this
    get templates() {
        return {};
    }
    getBrillouinZoneImageComponent(title) {
        const hasRequiredFn = typeof this.material.getBrillouinZoneImageComponent === "function";
        if (!hasRequiredFn) {
            console.log("PointsPathFormDataProvider: Material class has no function" +
                " 'getBrillouinZoneImageComponent'! Returning empty Object instead.");
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
        const rawData = path.map((p) => {
            const point = this.symmetryPoints.find((sp) => sp.point === p.point);
            return { ...p, coordinates: point.coordinates };
        });
        const processedData = useExplicitPath ? this._convertToExplicitPath(rawData) : rawData;
        // make coordinates into string and add formatting
        return processedData.map((p) => {
            const coordinates = this.is2PIBA
                ? this.get2PIBACoordinates(p.coordinates)
                : p.coordinates;
            p.coordinates = coordinates.map((c) => underscore_string_1.default.sprintf("%14.9f", c));
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
            const middlePoints = math_1.math.calculateSegmentsBetweenPoints3D(startPoint.coordinates, endPoint.coordinates, startPoint.steps);
            points.push(startPoint.coordinates);
            points.push(...middlePoints);
            // Include endPoint into path for the last section, otherwise it will be included by next loop iteration
            if (path.length - 2 === i)
                points.push(endPoint.coordinates);
        }
        return points.map((x) => {
            return {
                coordinates: x,
                steps: 1,
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
(0, MaterialContextMixin_1.materialContextMixin)(PointsPathFormDataProvider.prototype);
(0, ApplicationContextMixin_1.applicationContextMixin)(PointsPathFormDataProvider.prototype);
