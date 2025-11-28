"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOUnit = void 0;
const lodash_1 = __importDefault(require("lodash"));
const enums_1 = require("../enums");
const IOUnitSchemaMixin_1 = require("../generated/IOUnitSchemaMixin");
const BaseUnit_1 = require("./BaseUnit");
class IOUnit extends BaseUnit_1.BaseUnit {
    /**
     * IO Unit Builder for Object Storage sources.
     *
     * @param config - config object with other parameters:
     * @param config.name - the name of the unit this builder is creating
     * @param config.subtype - "input", "output", or "dataframe"
     * @param config.input - input containing information on the file to download
     * @param config.enableRender - Whether to use Jinja templating at runtime
     */
    constructor(config) {
        super({ ...IOUnit.getIOConfig(), ...config });
        this.contextProviders = [];
        this.materials = [];
        this.defaultTargets = ["band_gaps:direct", "band_gaps:indirect"];
        this.features = [];
        this.targets = [];
        this.ids = [];
        this.jobId = null;
        this.initialize(config);
    }
    static getIOConfig() {
        return {
            name: enums_1.UNIT_TYPES.io,
            type: enums_1.UNIT_TYPES.io,
            subtype: "input",
        };
    }
    initialize(config) {
        this.materials = [];
        this.features = (lodash_1.default.get(config, "input.0.endpoint_options.data.features", []) ||
            []);
        this.targets = (lodash_1.default.get(config, "input.0.endpoint_options.data.targets", this.defaultTargets) || []);
        this.ids = (lodash_1.default.get(config, "input.0.endpoint_options.data.ids", []) || []);
        this.jobId = null;
    }
    get featuresWithoutId() {
        return this.features.filter((x) => x !== enums_1.IO_ID_COLUMN);
    }
    get availableFeatures() {
        const { materials } = this;
        return lodash_1.default.uniq(lodash_1.default
            .flatten(materials.map((x) => lodash_1.default.keys(x.propertiesDict())))
            .concat(this.features));
    }
    get availableFeaturesWithoutId() {
        return this.availableFeatures.filter((feature) => feature !== enums_1.IO_ID_COLUMN);
    }
    /**
     * @summary Checks whether selected features contain only IO_ID_COLUMN ('exabyteId').
     * Used to identify that no features are selected yet (features set always contains ID_COLUMN)
     */
    get onlyIdFeatureSelected() {
        return lodash_1.default.isEmpty(lodash_1.default.without(this.features, enums_1.IO_ID_COLUMN));
    }
    /**
     * @summary Returns object with targets as key and arrays of appropriate values.
     * E.g. {'band_gap:indirect': [0.1, 0.3], 'pressure': [100, undefined]}
     */
    get valuesByTarget() {
        const values = this.dataGridValues;
        const result = {};
        this.targets.forEach((target) => {
            result[target] = values.map((v) => v[target]);
        });
        return result;
    }
    get dataFrameConfig() {
        return {
            subtype: "dataFrame",
            source: "api",
            input: [
                {
                    endpoint: "dataframe",
                    endpoint_options: {
                        method: "POST",
                        data: {
                            targets: this.targets,
                            features: this.features,
                            ids: this.ids,
                            jobId: this.jobId,
                        },
                        headers: {},
                        params: {},
                    },
                },
            ],
        };
    }
    get isDataFrame() {
        return this.subtype === "dataFrame";
    }
    setMaterials(materials) {
        this.materials = materials;
        this.ids = materials.map((m) => m.exabyteId);
    }
    addFeature(feature) {
        // only add if not already present
        if (this.features.indexOf(feature) === -1)
            this.features.push(feature);
    }
    removeFeature(feature) {
        if (this.featuresWithoutId.length === 1) {
            throw new Error("At least one feature is required");
        }
        this.features = this.features.filter((x) => feature !== x && x !== enums_1.IO_ID_COLUMN);
    }
    addTarget(target) {
        if (this.targets.indexOf(target) === -1)
            this.targets.push(target);
    }
    removeTarget(target) {
        if (this.targets.length === 1) {
            throw new Error("At least one target is required");
        }
        this.targets = this.targets.filter((x) => target !== x);
    }
    hasFeature(feature) {
        return this.features.indexOf(feature) > -1;
    }
    hasTarget(target) {
        return this.targets.indexOf(target) > -1;
    }
    toJSON() {
        const config = this.isDataFrame ? this.dataFrameConfig : {};
        return this.clean({ ...super.toJSON(), ...config });
    }
}
exports.IOUnit = IOUnit;
(0, IOUnitSchemaMixin_1.iOUnitSchemaMixin)(IOUnit.prototype);
