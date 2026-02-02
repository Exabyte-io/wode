import type { IonDynamicsContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import type { ContextItem, ExternalContext } from "./base/ContextProvider";
import JSONSchemaFormDataProvider from "./base/JSONSchemaFormDataProvider";
type Data = IonDynamicsContextProviderSchema;
type Name = "dynamics";
export type IonDynamicsContextProviderContextItem = ContextItem<Data>;
export type IonDynamicsContextProviderExternalContext = ExternalContext;
export default class IonDynamicsContextProvider extends JSONSchemaFormDataProvider<Name, Data> {
    readonly name: "dynamics";
    readonly domain: "important";
    readonly uiSchema: {
        numberOfSteps: {};
        timeStep: {};
        electronMass: {};
        temperature: {};
    };
    readonly jsonSchema: JSONSchema7 | undefined;
    constructor(contextItem: ContextItem<Data>, externalContext: ExternalContext);
    getDefaultData(): {
        numberOfSteps: number;
        timeStep: number;
        electronMass: number;
        temperature: number;
    };
}
export {};
