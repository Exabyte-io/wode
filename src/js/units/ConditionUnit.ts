import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { ConditionUnitSchema } from "@mat3ra/esse/dist/js/types";

import { UNIT_TYPES } from "../enums";
import {
    type ConditionUnitSchemaMixin,
    conditionUnitSchemaMixin,
} from "../generated/ConditionUnitSchemaMixin";
import { BaseUnit } from "./BaseUnit";

type Schema = ConditionUnitSchema;
type Base = typeof BaseUnit & Constructor<ConditionUnitSchemaMixin>;

export class ConditionUnit extends (BaseUnit as Base) implements Schema {
    constructor(config: Partial<Schema>) {
        super({
            name: UNIT_TYPES.condition as Schema["name"],
            type: UNIT_TYPES.condition as Schema["type"],
            input: [],
            results: [],
            preProcessors: [],
            postProcessors: [],
            then: undefined,
            else: undefined,
            statement: "true",
            maxOccurrences: 100,
            ...config,
        });
    }

    getHashObject(): object {
        return { statement: this.statement, maxOccurrences: this.maxOccurrences };
    }

    contextProviders = [];
}

conditionUnitSchemaMixin(ConditionUnit.prototype);
