import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
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

const jsonSchemaId = "context-providers-directory/neb-data-provider";

const defaultData = {
    nImages: 1,
};

export default class NEBFormDataManager extends JSONSchemaFormDataProvider<Name, Data> {
    readonly name = "neb" as const;

    readonly domain = "important" as const;

    readonly uiSchema = {
        nImages: {},
    };

    readonly jsonSchema: JSONSchema7 | undefined;

    constructor(contextItem: ContextItem<Data>, externalContext: ExternalContext) {
        super(contextItem, externalContext);

        this.jsonSchema = JSONSchemasInterface.getPatchedSchemaById(jsonSchemaId, {
            nImages: { default: defaultData.nImages },
        });
    }

    // eslint-disable-next-line class-methods-use-this
    getDefaultData() {
        return defaultData;
    }
}
