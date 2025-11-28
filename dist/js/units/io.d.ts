export class IOUnit extends BaseUnit {
    static getIOConfig(): {
        name: string;
        type: string;
        subtype: string;
    };
    /**
     * IO Unit Builder for Object Storage sources.
     *
     * @param {Object} config - config object with other parameters:
     * @param {String} config.name - the name of the unit this builder is creating
     * @param {String} config.subtype - "input", "output", or "dataframe"
     * @param {Object} config.input - input containing information on the file to download
     * @param {Boolean} config.enableRender - Whether to use Jinja templating at runtime
     */
    constructor(config: {
        name: string;
        subtype: string;
        input: Object;
        enableRender: boolean;
    });
    initialize(config: any): void;
    _materials: any;
    _defaultTargets: string[] | undefined;
    _features: any;
    _targets: any;
    _ids: any;
    _jobId: any;
    get materials(): any;
    get defaultTargets(): string[] | undefined;
    get features(): any;
    get featuresWithoutId(): any;
    get availableFeatures(): any[];
    get availableFeaturesWithoutId(): any[];
    get targets(): any;
    /**
     * @summary Checks whether selected features contain only IO_ID_COLUMN ('exabyteId').
     * Used to identify that no features are selected yet (features set always contains ID_COLUMN)
     */
    get onlyIdFeatureSelected(): boolean;
    /**
     * @summary Returns object with targets as key and arrays of appropriate values.
     * E.g. {'band_gap:indirect': [0.1, 0.3], 'pressure': [100, undefined]}
     */
    get valuesByTarget(): {};
    get dataFrameConfig(): {
        subtype: string;
        source: string;
        input: {
            endpoint: string;
            endpoint_options: {
                method: string;
                data: {
                    targets: any;
                    features: any;
                    ids: any;
                    jobId: any;
                };
                headers: {};
                params: {};
            };
        }[];
    };
    get isDataFrame(): boolean;
    setMaterials(materials: any): void;
    addFeature(feature: any): void;
    removeFeature(feature: any): void;
    addTarget(target: any): void;
    removeTarget(target: any): void;
    hasFeature(feature: any): boolean;
    hasTarget(target: any): boolean;
    toJSON(): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
}
import { BaseUnit } from "./base";
