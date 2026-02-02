import type { HubbardJContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import type { ContextItem } from "../base/ContextProvider";
import HubbardContextProvider, { type HubbardExternalContext } from "./HubbardContextProvider";
type Name = "hubbard_j";
type Data = HubbardJContextProviderSchema;
export type HubbardJContextManagerContextItem = ContextItem<Data>;
export default class HubbardJContextManager extends HubbardContextProvider<Name, Data> {
    readonly name: "hubbard_j";
    readonly uiSchemaStyled: {
        readonly "ui:options": {
            readonly addable: true;
            readonly orderable: true;
            readonly removable: true;
        };
    };
    readonly jsonSchema: JSONSchema7 | undefined;
    constructor(contextItem: ContextItem<Data>, externalContext: HubbardExternalContext);
    getDefaultData(): Data;
}
export {};
