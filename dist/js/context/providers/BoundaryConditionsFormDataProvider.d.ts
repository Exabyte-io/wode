export class BoundaryConditionsFormDataProvider extends JSONSchemaFormDataProvider {
    constructor(config: any);
    jsonSchemaId: string;
    get boundaryConditions(): any;
    get defaultData(): {
        type: any;
        offset: any;
        electricField: number;
        targetFermiEnergy: number;
    };
    get jsonSchemaPatchConfig(): {
        type: {
            default: any;
        };
        offset: {
            default: any;
        };
        electricField: {
            default: number;
        };
        targetFermiEnergy: {
            default: number;
        };
    };
    get uiSchema(): {
        type: {
            "ui:disabled": boolean;
        };
        offset: {
            "ui:disabled": boolean;
        };
        electricField: {};
        targetFermiEnergy: {};
    };
    get humanName(): string;
    yieldDataForRendering(): any;
    get jsonSchema(): import("json-schema").JSONSchema7 | undefined;
}
import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
