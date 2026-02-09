import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { DynamicsContextItemSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";

import type { BaseExternalContext, UnitContext } from "./base/ContextProvider";
import JSONSchemaFormDataProvider from "./base/JSONSchemaFormDataProvider";

type Schema = DynamicsContextItemSchema;

const jsonSchemaId = "context-providers-directory/ion-dynamics-context-provider";

const defaultData = {
    numberOfSteps: 100,
    timeStep: 5.0,
    electronMass: 100.0,
    temperature: 300.0,
};

export default class IonDynamicsDataManager extends JSONSchemaFormDataProvider<Schema> {
    readonly name = "dynamics" as const;

    readonly domain = "important" as const;

    readonly entityName = "unit" as const;

    static createFromUnitContext(unitContext: UnitContext, externalContext: BaseExternalContext) {
        const contextItem = this.findContextItem<Schema>(unitContext, "dynamics");

        return new IonDynamicsDataManager(contextItem, externalContext);
    }

    readonly uiSchema = {
        numberOfSteps: {},
        timeStep: {},
        electronMass: {},
        temperature: {},
    } as const;

    readonly extraData = {};

    readonly jsonSchema: JSONSchema7 | undefined;

    constructor(contextItem: Partial<Schema>, externalContext: BaseExternalContext) {
        super(contextItem, externalContext);

        this.jsonSchema = JSONSchemasInterface.getPatchedSchemaById(jsonSchemaId, {
            numberOfSteps: { default: defaultData.numberOfSteps },
            timeStep: { default: defaultData.timeStep },
            electronMass: { default: defaultData.electronMass },
            temperature: { default: defaultData.temperature },
        });
    }

    // eslint-disable-next-line class-methods-use-this
    getDefaultData() {
        return defaultData;
    }
}
