import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { ProcessingUnitSchema } from "@mat3ra/esse/dist/js/types";

import { UNIT_TYPES } from "../enums";
import {
    type ProcessingUnitSchemaMixin,
    processingUnitSchemaMixin,
} from "../generated/ProcessingUnitSchemaMixin";
import { BaseUnit } from "./BaseUnit";

type Schema = ProcessingUnitSchema;
type Base = typeof BaseUnit & Constructor<ProcessingUnitSchemaMixin>;

export class ProcessingUnit extends (BaseUnit as Base) implements Schema {
    constructor(config: Partial<Schema>) {
        super({
            name: UNIT_TYPES.processing as Schema["name"],
            type: UNIT_TYPES.processing as Schema["type"],
            ...config,
        });
    }

    contextProviders = [];

    setOperation(op: ProcessingUnitSchema["operation"]) {
        this.setProp("operation", op);
    }

    setOperationType(type: ProcessingUnitSchema["operationType"]) {
        this.setProp("operationType", type);
    }

    setInput(input: ProcessingUnitSchema["inputData"]) {
        this.setProp("inputData", input);
    }
}

processingUnitSchemaMixin(ProcessingUnit.prototype);
