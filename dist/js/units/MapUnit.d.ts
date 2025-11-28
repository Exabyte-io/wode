import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { MapUnitSchema } from "@mat3ra/esse/dist/js/types";
import { type MapUnitSchemaMixin } from "../generated/MapUnitSchemaMixin";
import { BaseUnit } from "./BaseUnit";
type Schema = MapUnitSchema;
export declare const defaultMapConfig: Partial<Schema> & Pick<Schema, "name" | "type">;
type Base = typeof BaseUnit & Constructor<MapUnitSchemaMixin>;
declare const MapUnit_base: Base;
export declare class MapUnit extends MapUnit_base implements Schema {
    constructor(config: Partial<Schema>);
    setWorkflowId(id: string): void;
    contextProviders: never[];
}
export {};
