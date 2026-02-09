import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { SubworkflowUnitSchema } from "@mat3ra/esse/dist/js/types";

import { UnitType } from "../enums";
import {
    type SubworkflowUnitSchemaMixin,
    subworkflowUnitSchemaMixin,
} from "../generated/SubworkflowUnitSchemaMixin";
import BaseUnit from "./BaseUnit";

type Schema = SubworkflowUnitSchema;
type Base = typeof BaseUnit<Schema> & Constructor<SubworkflowUnitSchemaMixin>;

class SubworkflowUnit extends (BaseUnit as Base) implements Schema {
    declare toJSON: () => Schema & AnyObject;

    declare _json: Schema & AnyObject;

    constructor(config: Partial<Schema>) {
        super({ name: "New Subworkflow", ...config, type: UnitType.subworkflow });
    }
}

subworkflowUnitSchemaMixin(SubworkflowUnit.prototype);

export default SubworkflowUnit;
