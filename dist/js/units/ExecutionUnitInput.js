"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ade_1 = require("@mat3ra/ade");
const entity_1 = require("@mat3ra/code/dist/js/entity");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const nunjucks_1 = __importDefault(require("nunjucks"));
class ExecutionUnitInput extends entity_1.InMemoryEntity {
    static get jsonSchema() {
        return JSONSchemasInterface_1.default.getSchemaById("workflow/unit/input/-inputItem");
    }
    static createFromTemplate(template) {
        return new ExecutionUnitInput({
            template,
            rendered: template.content,
            isManuallyChanged: false,
        });
    }
    constructor(config) {
        const { template } = config;
        const templateInstance = template instanceof ade_1.Template ? template : new ade_1.Template(template);
        super({ ...config, template: templateInstance.toJSON() });
    }
    render(renderingContext) {
        if (this.isManuallyChanged) {
            return this;
        }
        const rendered = nunjucks_1.default.compile(this.template.content).render(renderingContext);
        this.rendered = rendered || this.template.content;
        return this;
    }
}
exports.default = ExecutionUnitInput;
