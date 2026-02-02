import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { MLSettingsContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import { type ApplicationContextMixin, type ApplicationExternalContext } from "../mixins/ApplicationContextMixin";
import { type ContextItem } from "./base/ContextProvider";
import JSONSchemaDataProvider, { type JinjaExternalContext } from "./base/JSONSchemaDataProvider";
type Name = "mlSettings";
type Data = MLSettingsContextProviderSchema;
export type MLSettingsDataManagerContextItem = ContextItem<Data>;
export type MLSettingsDataManagerExternalContext = JinjaExternalContext & ApplicationExternalContext;
type ExternalContext = MLSettingsDataManagerExternalContext;
type Base = typeof JSONSchemaDataProvider<Name, Data, object, ExternalContext> & Constructor<ApplicationContextMixin>;
declare const MLSettingsDataManager_base: Base;
export default class MLSettingsDataManager extends MLSettingsDataManager_base {
    readonly name: "mlSettings";
    readonly domain: "important";
    readonly jsonSchema: JSONSchema7 | undefined;
    readonly uiSchema: {
        target_column_name: {};
        problem_category: {};
    };
    constructor(contextItem: ContextItem<Data>, externalContext: ExternalContext);
    getDefaultData(): {
        target_column_name: string;
        problem_category: "regression";
    };
}
export {};
