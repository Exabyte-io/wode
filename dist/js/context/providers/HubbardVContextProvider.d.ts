export class HubbardVContextProvider extends HubbardUContextProvider {
    get defaultData(): {
        atomicSpecies: any;
        atomicSpecies2: any;
        siteIndex2: number;
        atomicOrbital: string;
        atomicOrbital2: string;
        siteIndex: number;
        hubbardVValue: number;
    }[];
    get firstSpecies(): any;
    get secondSpecies(): any;
    get jsonSchemaPatchConfig(): {
        "items.properties.atomicSpecies": {
            enum: any[];
            default: any;
        };
        "items.properties.siteIndex": {
            default: number;
        };
        "items.properties.atomicOrbital": {
            enum: string[];
            default: string;
        };
        "items.properties.atomicSpecies2": {
            enum: any[];
            default: any;
        };
        "items.properties.siteIndex2": {
            default: number;
        };
        "items.properties.atomicOrbital2": {
            enum: string[];
            default: string;
        };
        "items.properties.hubbardVValue": {
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
            atomicSpecies2: {};
            atomicOrbital2: {};
            siteIndex: {};
            siteIndex2: {};
            hubbardVValue: {};
        };
    };
}
import { HubbardUContextProvider } from "./HubbardUContextProvider";
