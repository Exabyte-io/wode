export class HubbardJContextProvider extends HubbardUContextProvider {
    get defaultData(): {
        atomicSpecies: any;
        paramType: string;
        atomicOrbital: string;
        value: number;
    }[];
    get jsonSchemaPatchConfig(): {
        "items.properties.paramType": {
            default: string;
        };
        "items.properties.atomicSpecies": {
            enum: any[];
            default: any;
        };
        "items.properties.atomicOrbital": {
            enum: string[];
            default: string;
        };
        "items.properties.value": {
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
            paramType: {};
            atomicSpecies: {};
            atomicOrbital: {};
            value: {};
        };
    };
}
import { HubbardUContextProvider } from "./HubbardUContextProvider";
