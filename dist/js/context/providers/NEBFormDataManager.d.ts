import type { NEBDataProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import type { ContextItem } from "./base/ContextProvider";
import type { JinjaExternalContext } from "./base/JSONSchemaDataProvider";
import JSONSchemaFormDataProvider from "./base/JSONSchemaFormDataProvider";
type Name = "neb";
type Data = NEBDataProviderSchema;
export type NEBFormDataManagerContextItem = ContextItem<Data>;
export type NEBFormDataManagerExternalContext = JinjaExternalContext;
type ExternalContext = NEBFormDataManagerExternalContext;
export default class NEBFormDataManager extends JSONSchemaFormDataProvider<Name, Data> {
    readonly name: "neb";
    readonly domain: "important";
    readonly uiSchema: {
        nImages: {};
    };
    readonly jsonSchema: JSONSchema7 | undefined;
    constructor(contextItem: ContextItem<Data>, externalContext: ExternalContext);
    getDefaultData(): {
        nImages: number;
    };
}
export {};
