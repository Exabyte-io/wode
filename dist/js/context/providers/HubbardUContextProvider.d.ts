export class HubbardUContextProvider extends JSONSchemaFormDataProvider {
    constructor(config: any);
    jsonSchemaId: string;
    uniqueElements: any;
    orbitalList: string[];
    uniqueElementsWithLabels: any[];
    firstElement: any;
    get defaultData(): {
        atomicSpecies: any;
        atomicOrbital: string;
        hubbardUValue: number;
    }[];
    get jsonSchemaPatchConfig(): {
        "items.properties.atomicSpecies": {
            enum: any[];
            default: any;
        };
        "items.properties.atomicOrbital": {
            enum: string[];
            default: string;
        };
        "items.properties.hubbardUValue": {
            default: number;
        };
    };
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
    get jsonSchema(): import("json-schema").JSONSchema7 | undefined;
}
import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
