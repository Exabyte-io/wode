import type { WorkflowBaseUnitSchema } from "@mat3ra/esse/dist/js/types";

import { UNIT_TYPES } from "../enums";
import { BaseUnit } from "./BaseUnit";

type Schema = WorkflowBaseUnitSchema;

export class SubworkflowUnit extends BaseUnit implements Schema {
    constructor(config: Partial<Schema>) {
        super({ name: "New Subworkflow", type: UNIT_TYPES.subworkflow, ...config });
    }

    contextProviders = [];
}
