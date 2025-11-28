export class HubbardUContextProvider extends JSONSchemaFormDataProvider {
    constructor(config: any);
    uniqueElements: any;
    orbitalList: string[];
    uniqueElementsWithLabels: any[];
    firstElement: any;
    get defaultData(): {
        atomicSpecies: any;
        atomicOrbital: string;
        hubbardUValue: number;
    }[];
    get uiSchemaStyled(): {
        "ui:options": {
            addable: boolean;
            orderable: boolean;
            removable: boolean;
        };
        items: {
            atomicSpecies: {};
            atomicOrbital: {};
            hubbardUValue: {};
        };
    };
    get jsonSchema(): {
        $schema: string;
        title: string;
        description: string;
        type: string;
        items: {
            type: string;
            properties: {
                atomicSpecies: {
                    type: string;
                    title: string;
                    enum: any[];
                    default: any;
                };
                atomicOrbital: {
                    type: string;
                    title: string;
                    enum: string[];
                    default: string;
                };
                hubbardUValue: {
                    type: string;
                    title: string;
                    default: number;
                };
            };
        };
    };
}
import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
