import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { MapUnitSchema } from "@mat3ra/esse/dist/js/types";

import { UnitType } from "../enums";
import { type MapUnitSchemaMixin, mapUnitSchemaMixin } from "../generated/MapUnitSchemaMixin";
import BaseUnit from "./BaseUnit";

type Schema = MapUnitSchema;

export const defaultMapConfig = {
    name: UnitType.map as string,
    type: UnitType.map as const,
    workflowId: "",
    input: {
        target: "MAP_DATA",
        scope: "global",
        name: "",
        values: [],
        useValues: false,
    },
};

type Base = typeof BaseUnit<Schema> & Constructor<MapUnitSchemaMixin>;

class MapUnit extends (BaseUnit as Base) implements Schema {
    declare toJSON: () => Schema & AnyObject;

    declare _json: Schema & AnyObject;

    constructor(config?: Partial<Schema>) {
        super({ ...defaultMapConfig, ...config });
    }

    setWorkflowId(id: string) {
        this.setProp("workflowId", id);
    }
}

mapUnitSchemaMixin(MapUnit.prototype);

export default MapUnit;
