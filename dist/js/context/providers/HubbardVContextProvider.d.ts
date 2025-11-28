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
                siteIndex: {
                    type: string;
                    title: string;
                    default: number;
                };
                atomicOrbital: {
                    type: string;
                    title: string;
                    enum: string[];
                    default: string;
                };
                atomicSpecies2: {
                    type: string;
                    title: string;
                    enum: any[];
                    default: any;
                };
                siteIndex2: {
                    type: string;
                    title: string;
                    default: number;
                };
                atomicOrbital2: {
                    type: string;
                    title: string;
                    enum: string[];
                    default: string;
                };
                hubbardVValue: {
                    type: string;
                    title: string;
                    default: number;
                };
            };
        };
        minItems: number;
    };
}
import { HubbardUContextProvider } from "./HubbardUContextProvider";
