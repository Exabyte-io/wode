import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { BoundaryConditionsDataProviderSchema } from "@mat3ra/esse/dist/js/types";
import { type MaterialContextMixin, type MaterialExternalContext } from "../mixins/MaterialContextMixin";
import type { ContextItem } from "./base/ContextProvider";
import JSONSchemaDataProvider, { type JinjaExternalContext } from "./base/JSONSchemaDataProvider";
type Name = "boundaryConditions";
type Data = BoundaryConditionsDataProviderSchema;
export type BoundaryConditionsFormDataManagerContextItem = ContextItem<Data>;
export type BoundaryConditionsFormDataManagerExternalContext = JinjaExternalContext & MaterialExternalContext;
type ExternalContext = BoundaryConditionsFormDataManagerExternalContext;
type Base = typeof JSONSchemaDataProvider<Name, Data, object, ExternalContext> & Constructor<MaterialContextMixin>;
declare const BoundaryConditionsFormDataManager_base: Base;
export default class BoundaryConditionsFormDataManager extends BoundaryConditionsFormDataManager_base {
    readonly name: "boundaryConditions";
    readonly domain: "important";
    readonly humanName = "Boundary Conditions";
    readonly uiSchema: {
        type: {
            "ui:disabled": boolean;
        };
        offset: {
            "ui:disabled": boolean;
        };
        electricField: {};
        targetFermiEnergy: {};
    };
    constructor(contextItem: ContextItem<Data>, externalContext: ExternalContext);
    getDefaultData(): Data;
    get jsonSchema(): import("json-schema").JSONSchema7 | undefined;
}
export {};
