import type { HubbardUContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import type { ContextItem } from "../base/ContextProvider";
import HubbardContextProvider, { type HubbardExternalContext } from "./HubbardContextProvider";
type Name = "hubbard_u";
type Data = HubbardUContextProviderSchema;
export type HubbardUContextManagerContextItem = ContextItem<Data>;
export default class HubbardUContextManager extends HubbardContextProvider<Name, Data> {
    readonly name: "hubbard_u";
    readonly uiSchemaStyled: {
        readonly "ui:options": {
            readonly addable: true;
            readonly orderable: false;
            readonly removable: true;
        };
    };
    readonly jsonSchema: JSONSchema7 | undefined;
    constructor(contextItem: ContextItem<Data>, externalContext: HubbardExternalContext);
    getDefaultData(): Data;
}
export {};
