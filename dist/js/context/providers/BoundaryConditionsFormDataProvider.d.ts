export class BoundaryConditionsFormDataProvider extends JSONSchemaFormDataProvider {
    constructor(config: any);
    get boundaryConditions(): any;
    get defaultData(): {
        type: any;
        offset: any;
        electricField: number;
        targetFermiEnergy: number;
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
    get jsonSchema(): {
        $schema: string;
        type: string;
        properties: {
            type: {
                type: string;
                title: string;
                default: any;
            };
            offset: {
                type: string;
                title: string;
                default: any;
            };
            electricField: {
                type: string;
                title: string;
                default: number;
            };
            targetFermiEnergy: {
                type: string;
                title: string;
                default: number;
            };
        };
    };
}
import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
