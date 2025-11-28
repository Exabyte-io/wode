import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { DataIOUnitSchema } from "@mat3ra/esse/dist/js/types";
import { Made } from "@mat3ra/made";
import lodash from "lodash";

import { IO_ID_COLUMN, UNIT_TYPES } from "../enums";
import { type IOUnitSchemaMixin, iOUnitSchemaMixin } from "../generated/IOUnitSchemaMixin";
import { BaseUnit } from "./BaseUnit";

type Schema = DataIOUnitSchema;
type Base = typeof BaseUnit & Constructor<IOUnitSchemaMixin>;

export class IOUnit extends (BaseUnit as Base) implements Schema {
    /**
     * IO Unit Builder for Object Storage sources.
     *
     * @param config - config object with other parameters:
     * @param config.name - the name of the unit this builder is creating
     * @param config.subtype - "input", "output", or "dataframe"
     * @param config.input - input containing information on the file to download
     * @param config.enableRender - Whether to use Jinja templating at runtime
     */
    constructor(config: Partial<Schema>) {
        super({ ...IOUnit.getIOConfig(), ...config });
        this.initialize(config);
    }

    static getIOConfig(): Partial<Schema> & Pick<Schema, "name" | "type"> {
        return {
            name: UNIT_TYPES.io as Schema["name"],
            type: UNIT_TYPES.io as Schema["type"],
            subtype: "input",
        };
    }

    contextProviders = [];

    materials: InstanceType<typeof Made.Material>[] = [];

    defaultTargets: string[] = ["band_gaps:direct", "band_gaps:indirect"];

    features: string[] = [];

    targets: string[] = [];

    ids: string[] = [];

    jobId: string | null = null;

    initialize(config: Partial<Schema>) {
        this.materials = [];
        this.features = (lodash.get(config, "input.0.endpoint_options.data.features", []) ||
            []) as string[];
        this.targets = (lodash.get(
            config,
            "input.0.endpoint_options.data.targets",
            this.defaultTargets,
        ) || []) as string[];
        this.ids = (lodash.get(config, "input.0.endpoint_options.data.ids", []) || []) as string[];
        this.jobId = null;
    }

    get featuresWithoutId(): string[] {
        return this.features.filter((x) => x !== IO_ID_COLUMN);
    }

    get availableFeatures(): string[] {
        const { materials } = this;
        return lodash.uniq(
            lodash
                .flatten(
                    materials.map((x) =>
                        lodash.keys(
                            (
                                x as unknown as { propertiesDict(): Record<string, unknown> }
                            ).propertiesDict(),
                        ),
                    ),
                )
                .concat(this.features),
        );
    }

    get availableFeaturesWithoutId(): string[] {
        return this.availableFeatures.filter((feature) => feature !== IO_ID_COLUMN);
    }

    /**
     * @summary Checks whether selected features contain only IO_ID_COLUMN ('exabyteId').
     * Used to identify that no features are selected yet (features set always contains ID_COLUMN)
     */
    get onlyIdFeatureSelected(): boolean {
        return lodash.isEmpty(lodash.without(this.features, IO_ID_COLUMN));
    }

    /**
     * @summary Returns object with targets as key and arrays of appropriate values.
     * E.g. {'band_gap:indirect': [0.1, 0.3], 'pressure': [100, undefined]}
     */
    get valuesByTarget(): Record<string, unknown[]> {
        const values = this.dataGridValues as Record<string, unknown>[];
        const result: Record<string, unknown[]> = {};
        this.targets.forEach((target) => {
            result[target] = values.map((v) => v[target]);
        });
        return result;
    }

    get dataFrameConfig(): Partial<Schema> {
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

    get isDataFrame(): boolean {
        return this.subtype === "dataFrame";
    }

    setMaterials(materials: InstanceType<typeof Made.Material>[]) {
        this.materials = materials;
        this.ids = materials.map((m) => (m as unknown as { exabyteId: string }).exabyteId);
    }

    addFeature(feature: string) {
        // only add if not already present
        if (this.features.indexOf(feature) === -1) this.features.push(feature);
    }

    removeFeature(feature: string) {
        if (this.featuresWithoutId.length === 1) {
            throw new Error("At least one feature is required");
        }
        this.features = this.features.filter((x) => feature !== x && x !== IO_ID_COLUMN);
    }

    addTarget(target: string) {
        if (this.targets.indexOf(target) === -1) this.targets.push(target);
    }

    removeTarget(target: string) {
        if (this.targets.length === 1) {
            throw new Error("At least one target is required");
        }
        this.targets = this.targets.filter((x) => target !== x);
    }

    hasFeature(feature: string): boolean {
        return this.features.indexOf(feature) > -1;
    }

    hasTarget(target: string): boolean {
        return this.targets.indexOf(target) > -1;
    }

    toJSON(): Record<string, unknown> {
        const config = this.isDataFrame ? this.dataFrameConfig : {};
        return this.clean({ ...super.toJSON(), ...config });
    }
}

iOUnitSchemaMixin(IOUnit.prototype);
