import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";

const defaultMDConfig = {
    numberOfSteps: 100,
    timeStep: 5.0,
    electronMass: 100.0,
    temperature: 300.0,
};

export class IonDynamicsContextProvider extends JSONSchemaFormDataProvider {
    // eslint-disable-next-line class-methods-use-this
    get defaultData() {
        return defaultMDConfig;
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

    // eslint-disable-next-line class-methods-use-this
    get jsonSchema() {
        return JSONSchemasInterface.getPatchedSchemaById(
            "context-providers-directory/ion-dynamics-context-provider",
            {
                numberOfSteps: { default: defaultMDConfig.numberOfSteps },
                timeStep: { default: defaultMDConfig.timeStep },
                electronMass: { default: defaultMDConfig.electronMass },
                temperature: { default: defaultMDConfig.temperature },
            },
        );
    }
}
