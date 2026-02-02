import type { HubbardVContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import type { ContextItem } from "../base/ContextProvider";
import HubbardContextProvider, { type HubbardExternalContext } from "./HubbardContextProvider";
type Name = "hubbard_v";
type Data = HubbardVContextProviderSchema;
export type HubbardVContextManagerContextItem = ContextItem<Data>;
export default class HubbardVContextManager extends HubbardContextProvider<Name, Data> {
    readonly name: "hubbard_v";
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
