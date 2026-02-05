import { Template } from "@mat3ra/ade";
import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { TemplateSchema } from "@mat3ra/esse/dist/js/types";
import nunjucks from "nunjucks";

import type { ExecutionUnitInputSchemaMixin } from "./generated/ExecutionUnitInputSchemaMixin";

type Schema = ExecutionUnitInputSchemaMixin;
type JSON = Schema & AnyObject;
type Base = typeof InMemoryEntity & Constructor<ExecutionUnitInputSchemaMixin>;
type ConstructorConfig = Schema | (Omit<Schema, "template"> & { template: Template });

export default class ExecutionUnitInput extends (InMemoryEntity as Base) implements Schema {
    declare _json: JSON;

    declare toJSON: () => JSON;

    declare toJSONQuick: () => JSON;

    static get jsonSchema() {
        return JSONSchemasInterface.getSchemaById("workflow/unit/input/-inputItem");
    }

    static createFromTemplate(template: Template | TemplateSchema) {
        return new ExecutionUnitInput({
            template,
            rendered: template.content,
            isManuallyChanged: false,
        });
    }

    constructor(config: ConstructorConfig) {
        const { template } = config;
        const templateInstance = template instanceof Template ? template : new Template(template);

        super({ ...config, template: templateInstance.toJSON() });
    }

    render(renderingContext: Record<string, unknown>) {
        if (this.isManuallyChanged) {
            return this;
        }

        const rendered = nunjucks.compile(this.template.content).render(renderingContext);

        this.rendered = rendered || this.template.content;

        return this;
    }
}
