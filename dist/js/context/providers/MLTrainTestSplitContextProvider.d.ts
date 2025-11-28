export class MLTrainTestSplitContextProvider extends ContextProvider {
    constructor(config: any);
    jsonSchemaId: string;
    get uiSchema(): {
        target_column_name: {};
        problem_category: {};
    };
    get defaultData(): {
        fraction_held_as_test_set: number;
    };
    get jsonSchemaPatchConfig(): {
        fraction_held_as_test_set: {
            default: number;
        };
    };
    get jsonSchema(): import("json-schema").JSONSchema7 | undefined;
}
import { ContextProvider } from "@mat3ra/ade";
