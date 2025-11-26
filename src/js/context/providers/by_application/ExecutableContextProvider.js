import { ContextProvider } from "@mat3ra/ade";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";

export default class ExecutableContextProvider extends ContextProvider {
    jsonSchemaId = "context-provider";

    constructor(config) {
        super({
            ...config,
            domain: "executable",
        });
    }

    get jsonSchema() {
        return JSONSchemasInterface.getSchemaById(this.jsonSchemaId);
    }
}
