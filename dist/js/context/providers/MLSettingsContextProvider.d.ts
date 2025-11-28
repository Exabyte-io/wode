export class MLSettingsContextProvider extends ContextProvider {
    constructor(config: any);
    jsonSchemaId: string;
    get uiSchema(): {
        target_column_name: {};
        problem_category: {};
    };
    get defaultData(): {
        target_column_name: string;
        problem_category: string;
    };
    get jsonSchemaPatchConfig(): {
        target_column_name: {
            default: string;
        };
        problem_category: {
            default: string;
        };
    };
    get jsonSchema(): import("json-schema").JSONSchema7 | undefined;
}
import { ContextProvider } from "@mat3ra/ade";
