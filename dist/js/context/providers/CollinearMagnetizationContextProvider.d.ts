export class CollinearMagnetizationContextProvider extends JSONSchemaFormDataProvider {
    constructor(config: any);
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
    get jsonSchema(): {
        $schema: string;
        title: string;
        description: string;
        type: string;
        properties: {
            startingMagnetization: {
                type: string;
                maxItems: number;
                items: {
                    type: string;
                    properties: {
                        atomicSpecies: {
                            type: string;
                            title: string;
                            enum: any[];
                            default: any;
                        };
                        value: {
                            type: string;
                            title: string;
                            default: number;
                            minimum: number;
                            maximum: number;
                        };
                    };
                };
            };
            isTotalMagnetization: {
                type: string;
                title: string;
                default: boolean;
            };
            totalMagnetization: {
                type: string;
                title: string;
                default: number;
            };
        };
    };
}
import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
