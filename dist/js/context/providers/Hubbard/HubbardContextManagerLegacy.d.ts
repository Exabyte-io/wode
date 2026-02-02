import type { HubbardLegacyContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import type { ContextItem } from "../base/ContextProvider";
import HubbardContextProvider, { type HubbardExternalContext } from "./HubbardContextProvider";
type Name = "hubbard_legacy";
type Data = HubbardLegacyContextProviderSchema;
export type HubbardContextManagerLegacyContextItem = ContextItem<Data>;
export default class HubbardContextManagerLegacy extends HubbardContextProvider<Name, Data> {
    readonly name: "hubbard_legacy";
    readonly domain: "important";
    readonly jsonSchema: JSONSchema7 | undefined;
    readonly uiSchemaStyled: {
        readonly "ui:options": {
            readonly addable: true;
            readonly orderable: false;
            readonly removable: true;
        };
        readonly items: {
            readonly atomicSpeciesIndex: {
                readonly "ui:readonly": true;
            };
        };
    };
    constructor(contextItem: ContextItem<Data>, externalContext: HubbardExternalContext);
    getDefaultData(): Data;
    setData(data: Data): void;
}
export {};
