import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { DataIOUnitSchema } from "@mat3ra/esse/dist/js/types";
import { Made } from "@mat3ra/made";
import { type IOUnitSchemaMixin } from "../generated/IOUnitSchemaMixin";
import { BaseUnit } from "./BaseUnit";
type Schema = DataIOUnitSchema;
type Base = typeof BaseUnit & Constructor<IOUnitSchemaMixin>;
declare const IOUnit_base: Base;
export declare class IOUnit extends IOUnit_base implements Schema {
    /**
     * IO Unit Builder for Object Storage sources.
     *
     * @param config - config object with other parameters:
     * @param config.name - the name of the unit this builder is creating
     * @param config.subtype - "input", "output", or "dataframe"
     * @param config.input - input containing information on the file to download
     * @param config.enableRender - Whether to use Jinja templating at runtime
     */
    constructor(config: Partial<Schema>);
    static getIOConfig(): Partial<Schema> & Pick<Schema, "name" | "type">;
    contextProviders: never[];
    materials: InstanceType<typeof Made.Material>[];
    defaultTargets: string[];
    features: string[];
    targets: string[];
    ids: string[];
    jobId: string | null;
    initialize(config: Partial<Schema>): void;
    get featuresWithoutId(): string[];
    get availableFeatures(): string[];
    get availableFeaturesWithoutId(): string[];
    /**
     * @summary Checks whether selected features contain only IO_ID_COLUMN ('exabyteId').
     * Used to identify that no features are selected yet (features set always contains ID_COLUMN)
     */
    get onlyIdFeatureSelected(): boolean;
    /**
     * @summary Returns object with targets as key and arrays of appropriate values.
     * E.g. {'band_gap:indirect': [0.1, 0.3], 'pressure': [100, undefined]}
     */
    get valuesByTarget(): Record<string, unknown[]>;
    get dataFrameConfig(): Partial<Schema>;
    get isDataFrame(): boolean;
    setMaterials(materials: InstanceType<typeof Made.Material>[]): void;
    addFeature(feature: string): void;
    removeFeature(feature: string): void;
    addTarget(target: string): void;
    removeTarget(target: string): void;
    hasFeature(feature: string): boolean;
    hasTarget(target: string): boolean;
    toJSON(): Record<string, unknown>;
}
export {};
