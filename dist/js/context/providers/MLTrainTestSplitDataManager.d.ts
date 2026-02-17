import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { MlTrainTestSplitContextItemSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import { type ApplicationContextMixin, type ApplicationExternalContext } from "../mixins/ApplicationContextMixin";
import { type UnitContext } from "./base/ContextProvider";
import JSONSchemaDataProvider, { type JinjaExternalContext } from "./base/JSONSchemaDataProvider";
type Schema = MlTrainTestSplitContextItemSchema;
type ExternalContext = JinjaExternalContext & ApplicationExternalContext;
type Base = typeof JSONSchemaDataProvider<Schema, ExternalContext> & Constructor<ApplicationContextMixin>;
declare const MLTrainTestSplitDataManager_base: Base;
export default class MLTrainTestSplitDataManager extends MLTrainTestSplitDataManager_base {
    readonly name: "mlTrainTestSplit";
    readonly domain: "important";
    readonly entityName: "unit";
    static createFromUnitContext(unitContext: UnitContext, externalContext: ExternalContext): MLTrainTestSplitDataManager;
    readonly jsonSchema: JSONSchema7 | undefined;
    readonly uiSchema: {
        readonly target_column_name: {};
        readonly problem_category: {};
    };
    readonly extraData: {};
    constructor(contextItem: Partial<Schema>, externalContext: ExternalContext);
    getDefaultData(): {
        fraction_held_as_test_set: number;
    };
}
export {};
