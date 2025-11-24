import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";

const defaultMDConfig = {
    numberOfSteps: 100,
    timeStep: 5.0,
    electronMass: 100.0,
    temperature: 300.0,
};

export class IonDynamicsContextProvider extends JSONSchemaFormDataProvider {
    jsonSchemaId = "context-providers-directory/ion-dynamics-context-provider";

    // eslint-disable-next-line class-methods-use-this
    get defaultData() {
        return defaultMDConfig;
    }

    get jsonSchemaPatchConfig() {
        return {
            numberOfSteps: { default: this.defaultData.numberOfSteps },
            timeStep: { default: this.defaultData.timeStep },
            electronMass: { default: this.defaultData.electronMass },
            temperature: { default: this.defaultData.temperature },
        };
    }

    // eslint-disable-next-line class-methods-use-this
    get uiSchema() {
        return {
            numberOfSteps: {},
            timeStep: {},
            electronMass: {},
            temperature: {},
        };
    }

    get jsonSchema() {
        return JSONSchemasInterface.getPatchedSchemaById(
            this.jsonSchemaId,
            this.jsonSchemaPatchConfig,
        );
    }
}
