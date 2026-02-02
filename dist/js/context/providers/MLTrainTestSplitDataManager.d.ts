import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { MLTrainTestSplitContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import { type ApplicationContextMixin, type ApplicationExternalContext } from "../mixins/ApplicationContextMixin";
import { type ContextItem } from "./base/ContextProvider";
import JSONSchemaDataProvider, { type JinjaExternalContext } from "./base/JSONSchemaDataProvider";
type Name = "mlTrainTestSplit";
type Data = MLTrainTestSplitContextProviderSchema;
export type MLTrainTestSplitDataManagerContextItem = ContextItem<Data>;
export type MLTrainTestSplitDataManagerExternalContext = JinjaExternalContext & ApplicationExternalContext;
type ExternalContext = MLTrainTestSplitDataManagerExternalContext;
type Base = typeof JSONSchemaDataProvider<Name, Data> & Constructor<ApplicationContextMixin>;
declare const MLTrainTestSplitDataManager_base: Base;
export default class MLTrainTestSplitDataManager extends MLTrainTestSplitDataManager_base {
    readonly name: "mlTrainTestSplit";
    readonly domain: "important";
    readonly jsonSchema: JSONSchema7 | undefined;
    readonly uiSchema: {
        target_column_name: {};
        problem_category: {};
    };
    constructor(contextItem: ContextItem<Data>, externalContext: ExternalContext);
    getDefaultData(): {
        fraction_held_as_test_set: number;
    };
}
export {};
