export class HubbardContextProviderLegacy extends HubbardUContextProvider {
    get defaultData(): {
        atomicSpecies: any;
        atomicSpeciesIndex: number | null;
        hubbardUValue: number;
    }[];
    speciesIndexFromSpecies: (species: any) => number | null;
    transformData: (data: any) => any;
    get uiSchemaStyled(): {
        "ui:options": {
            addable: boolean;
            orderable: boolean;
            removable: boolean;
        };
        items: {
            atomicSpecies: {};
            atomicSpeciesIndex: {
                "ui:readonly": boolean;
            };
            hubbardUValue: {};
        };
    };
    get jsonSchema(): {
        $schema: string;
        title: string;
        description: string;
        type: string;
        uniqueItems: boolean;
        minItems: number;
        items: {
            type: string;
            properties: {
                atomicSpecies: {
                    type: string;
                    title: string;
                    enum: any[];
                };
                atomicSpeciesIndex: {
                    type: string;
                    title: string;
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
import { HubbardUContextProvider } from "./HubbardUContextProvider";
