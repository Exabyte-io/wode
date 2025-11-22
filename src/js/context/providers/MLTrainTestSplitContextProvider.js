import { ContextProvider } from "@mat3ra/ade";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";

import { applicationContextMixin } from "../mixins/ApplicationContextMixin";

export class MLTrainTestSplitContextProvider extends ContextProvider {
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
            fraction_held_as_test_set: 0.2,
        };
    }

    get jsonSchema() {
        return JSONSchemasInterface.getPatchedSchemaById(
            "context-providers-directory/ml-train-test-split-context-provider",
            {
                fraction_held_as_test_set: { default: this.defaultData.fraction_held_as_test_set },
            },
        );
    }
}

applicationContextMixin(MLTrainTestSplitContextProvider.prototype);
