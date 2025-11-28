export class NEBFormDataProvider extends JSONSchemaFormDataProvider {
    get defaultData(): {
        nImages: number;
    };
    get uiSchema(): {
        nImages: {};
    };
    get jsonSchema(): {
        $schema: string;
        title: string;
        description: string;
        type: string;
        properties: {
            nImages: {
                type: string;
                default: number;
            };
        };
    };
}
import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
