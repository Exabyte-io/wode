import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { MapUnitSchema } from "@mat3ra/esse/dist/js/types";

import { UNIT_TYPES } from "../enums";
import { type MapUnitSchemaMixin, mapUnitSchemaMixin } from "../generated/MapUnitSchemaMixin";
import { BaseUnit } from "./BaseUnit";

type Schema = MapUnitSchema;

export const defaultMapConfig: Partial<Schema> & Pick<Schema, "name" | "type"> = {
    name: UNIT_TYPES.map as Schema["name"],
    type: UNIT_TYPES.map as Schema["type"],
    workflowId: "",
    input: {
        target: "MAP_DATA",
        scope: "global",
        name: "",
        values: [],
        useValues: false,
    },
};

type Base = typeof BaseUnit & Constructor<MapUnitSchemaMixin>;

export class MapUnit extends (BaseUnit as Base) implements Schema {
    constructor(config: Partial<Schema>) {
        super({ ...defaultMapConfig, ...config });
    }

    setWorkflowId(id: string) {
        this.setProp("workflowId", id);
    }

    contextProviders = [];
}

mapUnitSchemaMixin(MapUnit.prototype);
