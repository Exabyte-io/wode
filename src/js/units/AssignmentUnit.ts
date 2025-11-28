import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { AssignmentUnitSchema } from "@mat3ra/esse/dist/js/types";

import { UNIT_TYPES } from "../enums";
import {
    type AssignmentUnitSchemaMixin,
    assignmentUnitSchemaMixin,
} from "../generated/AssignmentUnitSchemaMixin";
import { BaseUnit } from "./BaseUnit";

type Schema = AssignmentUnitSchema;
type Base = typeof BaseUnit & Constructor<AssignmentUnitSchemaMixin>;

export class AssignmentUnit extends (BaseUnit as Base) implements Schema {
    constructor(config: Partial<Schema>) {
        super({
            name: UNIT_TYPES.assignment,
            type: UNIT_TYPES.assignment,
            operand: "X",
            value: "1",
            input: [],
            ...config,
        });
    }

    contextProviders = [];

    getHashObject(): object {
        return { input: this.input, operand: this.operand, value: this.value };
    }
}

assignmentUnitSchemaMixin(AssignmentUnit.prototype);
