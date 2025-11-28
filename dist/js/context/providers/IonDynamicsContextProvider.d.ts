export class IonDynamicsContextProvider extends JSONSchemaFormDataProvider {
    jsonSchemaId: string;
    get defaultData(): {
        numberOfSteps: number;
        timeStep: number;
        electronMass: number;
        temperature: number;
    };
    get jsonSchemaPatchConfig(): {
        numberOfSteps: {
            default: number;
        };
        timeStep: {
            default: number;
        };
        electronMass: {
            default: number;
        };
        temperature: {
            default: number;
        };
    };
    get uiSchema(): {
        numberOfSteps: {};
        timeStep: {};
        electronMass: {};
        temperature: {};
    };
    get jsonSchema(): import("json-schema").JSONSchema7 | undefined;
}
import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
