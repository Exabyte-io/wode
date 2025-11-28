export class CollinearMagnetizationContextProvider extends JSONSchemaFormDataProvider {
    constructor(config: any);
    jsonSchemaId: string;
    firstElement: any;
    isTotalMagnetization: boolean;
    get uniqueElementsWithLabels(): any[];
    indexOfElement: (element: any) => number;
    get defaultData(): {
        startingMagnetization: {
            index: number;
            atomicSpecies: any;
            value: number;
        }[];
        isTotalMagnetization: boolean;
        totalMagnetization: number;
    };
    get jsonSchemaPatchConfig(): {
        "properties.startingMagnetization": {
            maxItems: number;
        };
        "properties.startingMagnetization.items.properties.atomicSpecies": {
            enum: any[];
            default: any;
        };
        "properties.startingMagnetization.items.properties.value": {
            default: number;
        };
        "properties.isTotalMagnetization": {
            default: boolean;
        };
        "properties.totalMagnetization": {
            default: number;
        };
    };
    transformData: (data: any) => any;
    get uiSchemaStyled(): {
        startingMagnetization: {
            items: {
                atomicSpecies: {
                    "ui:classNames": string;
                };
                value: {
                    "ui:classNames": string;
                };
            };
            "ui:readonly": boolean;
        };
        isTotalMagnetization: {};
        totalMagnetization: {
            "ui:classNames": string;
            "ui:readonly": boolean;
        };
    };
    get jsonSchema(): import("json-schema").JSONSchema7 | undefined;
}
import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
