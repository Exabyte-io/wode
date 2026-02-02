import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { MLSettingsContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";

import {
    type ApplicationContextMixin,
    type ApplicationExternalContext,
    applicationContextMixin,
} from "../mixins/ApplicationContextMixin";
import { type ContextItem } from "./base/ContextProvider";
import JSONSchemaDataProvider, { type JinjaExternalContext } from "./base/JSONSchemaDataProvider";

type Name = "mlSettings";
type Data = MLSettingsContextProviderSchema;

export type MLSettingsDataManagerContextItem = ContextItem<Data>;
export type MLSettingsDataManagerExternalContext = JinjaExternalContext &
    ApplicationExternalContext;

type ExternalContext = MLSettingsDataManagerExternalContext;
type Base = typeof JSONSchemaDataProvider<Name, Data, object, ExternalContext> &
    Constructor<ApplicationContextMixin>;

const jsonSchemaId = "context-providers-directory/ml-settings-context-provider";

const defaultData = {
    target_column_name: "target",
    problem_category: "regression" as const,
};

export default class MLSettingsDataManager extends (JSONSchemaDataProvider as Base) {
    readonly name = "mlSettings" as const;

    readonly domain = "important" as const;

    readonly jsonSchema: JSONSchema7 | undefined;

    readonly uiSchema = {
        target_column_name: {},
        problem_category: {},
    };

    constructor(contextItem: ContextItem<Data>, externalContext: ExternalContext) {
        super(contextItem, externalContext);
        this.initApplicationContextMixin(externalContext);

        this.jsonSchema = JSONSchemasInterface.getPatchedSchemaById(jsonSchemaId, {
            target_column_name: { default: defaultData.target_column_name },
            problem_category: { default: defaultData.problem_category },
        });
    }

    // eslint-disable-next-line class-methods-use-this
    getDefaultData() {
        return defaultData;
    }
}

applicationContextMixin(MLSettingsDataManager.prototype);
