export class NEBFormDataProvider extends JSONSchemaFormDataProvider {
    jsonSchemaId: string;
    get defaultData(): {
        nImages: number;
    };
    get jsonSchemaPatchConfig(): {
        nImages: {
            default: number;
        };
    };
    get uiSchema(): {
        nImages: {};
    };
    get jsonSchema(): import("json-schema").JSONSchema7 | undefined;
}
import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
