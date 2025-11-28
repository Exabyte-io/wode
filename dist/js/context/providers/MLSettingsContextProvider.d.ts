export class MLSettingsContextProvider extends ContextProvider {
    constructor(config: any);
    get uiSchema(): {
        target_column_name: {};
        problem_category: {};
    };
    get defaultData(): {
        target_column_name: string;
        problem_category: string;
    };
    get jsonSchema(): {
        $schema: string;
        title: string;
        description: string;
        type: string;
        properties: {
            target_column_name: {
                type: string;
                default: string;
            };
            problem_category: {
                type: string;
                default: string;
                enum: string[];
            };
        };
    };
}
import { ContextProvider } from "@mat3ra/ade";
