import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { MlSettingsContextItemSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import { type ApplicationContextMixin, type ApplicationExternalContext } from "../mixins/ApplicationContextMixin";
import { type UnitContext } from "./base/ContextProvider";
import JSONSchemaDataProvider, { type JinjaExternalContext } from "./base/JSONSchemaDataProvider";
type Schema = MlSettingsContextItemSchema;
type ExternalContext = JinjaExternalContext & ApplicationExternalContext;
type Base = typeof JSONSchemaDataProvider<Schema, ExternalContext> & Constructor<ApplicationContextMixin>;
declare const MLSettingsDataManager_base: Base;
export default class MLSettingsDataManager extends MLSettingsDataManager_base {
    readonly name: "mlSettings";
    readonly domain: "important";
    readonly entityName: "unit";
    static createFromUnitContext(unitContext: UnitContext, externalContext: ExternalContext): MLSettingsDataManager;
    readonly jsonSchema: JSONSchema7 | undefined;
    readonly uiSchema: {
        readonly target_column_name: {};
        readonly problem_category: {};
    };
    readonly extraData: {};
    constructor(contextItem: Partial<Schema>, externalContext: ExternalContext);
    getDefaultData(): {
        target_column_name: string;
        problem_category: "regression";
    };
}
export {};
