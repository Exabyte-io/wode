import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { HubbardLegacyContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";

import type { ContextItem } from "../base/ContextProvider";
import HubbardContextProvider, { type HubbardExternalContext } from "./HubbardContextProvider";

type Name = "hubbard_legacy";
type Data = HubbardLegacyContextProviderSchema;
export type HubbardContextManagerLegacyContextItem = ContextItem<Data>;

const defaultHubbardConfig = {
    hubbardUValue: 1.0,
};

const jsonSchemaId = "context-providers-directory/hubbard-legacy-context-provider";

export default class HubbardContextManagerLegacy extends HubbardContextProvider<Name, Data> {
    readonly name = "hubbard_legacy" as const;

    readonly domain = "important" as const;

    readonly jsonSchema: JSONSchema7 | undefined;

    readonly uiSchemaStyled = {
        "ui:options": {
            addable: true,
            orderable: false,
            removable: true,
        },
        items: {
            atomicSpeciesIndex: { "ui:readonly": true },
        },
    } as const;

    constructor(contextItem: ContextItem<Data>, externalContext: HubbardExternalContext) {
        super(contextItem, externalContext);

        this.jsonSchema = JSONSchemasInterface.getPatchedSchemaById(jsonSchemaId, {
            "items.properties.atomicSpecies": {
                enum: this.uniqueElementsWithLabels,
            },
            "items.properties.hubbardUValue": {
                default: defaultHubbardConfig.hubbardUValue,
            },
        });
    }

    getDefaultData(): Data {
        return [
            {
                ...defaultHubbardConfig,
                atomicSpecies: this.firstElement,
                atomicSpeciesIndex: this.uniqueElementsWithLabels?.length > 0 ? 1 : undefined,
            },
        ];
    }

    setData(data: Data) {
        const hubbardUValues = data.map((row) => {
            const atomicSpeciesIndex =
                this.uniqueElementsWithLabels?.length > 0
                    ? this.uniqueElementsWithLabels.indexOf(row.atomicSpecies || "") + 1
                    : undefined;

            return {
                ...row,
                atomicSpeciesIndex,
            };
        }) as Data;

        super.setData(hubbardUValues);
    }
}
