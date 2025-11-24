import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";

export class NEBFormDataProvider extends JSONSchemaFormDataProvider {
    jsonSchemaId = "context-providers-directory/neb-data-provider";

    // eslint-disable-next-line class-methods-use-this
    get defaultData() {
        return {
            nImages: 1,
        };
    }

    get jsonSchemaPatchConfig() {
        return {
            nImages: { default: this.defaultData.nImages },
        };
    }

    // eslint-disable-next-line class-methods-use-this
    get uiSchema() {
        return {
            nImages: {},
        };
    }

    get jsonSchema() {
        return JSONSchemasInterface.getPatchedSchemaById(
            this.jsonSchemaId,
            this.jsonSchemaPatchConfig,
        );
    }
}
