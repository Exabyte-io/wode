import { ContextProvider } from "@mat3ra/ade";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";

import { applicationContextMixin } from "../mixins/ApplicationContextMixin";

export class MLSettingsContextProvider extends ContextProvider {
    constructor(config) {
        super(config);
        this.initApplicationContextMixin();
    }

    // eslint-disable-next-line class-methods-use-this
    get uiSchema() {
        return {
            target_column_name: {},
            problem_category: {},
        };
    }

    // eslint-disable-next-line class-methods-use-this
    get defaultData() {
        return {
            target_column_name: "target",
            problem_category: "regression",
        };
    }

    get jsonSchema() {
        return JSONSchemasInterface.getPatchedSchemaById(
            "context-providers-directory/ml-settings-context-provider",
            {
                target_column_name: { default: this.defaultData.target_column_name },
                problem_category: { default: this.defaultData.problem_category },
            },
        );
    }
}

applicationContextMixin(MLSettingsContextProvider.prototype);
