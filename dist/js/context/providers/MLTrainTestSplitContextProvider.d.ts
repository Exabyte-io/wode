export class MLTrainTestSplitContextProvider extends ContextProvider {
    constructor(config: any);
    get uiSchema(): {
        target_column_name: {};
        problem_category: {};
    };
    get defaultData(): {
        fraction_held_as_test_set: number;
    };
    get jsonSchema(): {
        $schema: string;
        title: string;
        description: string;
        type: string;
        properties: {
            fraction_held_as_test_set: {
                type: string;
                default: number;
                minimum: number;
                maximum: number;
            };
        };
    };
}
import { ContextProvider } from "@mat3ra/ade";
