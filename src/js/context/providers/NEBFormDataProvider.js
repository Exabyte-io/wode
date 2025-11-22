import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";

export class NEBFormDataProvider extends JSONSchemaFormDataProvider {
    // eslint-disable-next-line class-methods-use-this
    get defaultData() {
        return {
            nImages: 1,
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
            "context-providers-directory/neb-data-provider",
            {
                nImages: { default: this.defaultData.nImages },
            },
        );
    }
}
