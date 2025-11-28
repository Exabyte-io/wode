export class IonDynamicsContextProvider extends JSONSchemaFormDataProvider {
    get defaultData(): {
        numberOfSteps: number;
        timeStep: number;
        electronMass: number;
        temperature: number;
    };
    get uiSchema(): {
        numberOfSteps: {};
        timeStep: {};
        electronMass: {};
        temperature: {};
    };
    get jsonSchema(): {
        $schema: string;
        type: string;
        description: string;
        properties: {
            numberOfSteps: {
                type: string;
                title: string;
                default: number;
            };
            timeStep: {
                type: string;
                title: string;
                default: number;
            };
            electronMass: {
                type: string;
                title: string;
                default: number;
            };
            temperature: {
                type: string;
                title: string;
                default: number;
            };
        };
    };
}
import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
