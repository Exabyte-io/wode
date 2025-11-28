export class HubbardContextProviderLegacy extends HubbardUContextProvider {
    get defaultData(): {
        atomicSpecies: any;
        atomicSpeciesIndex: number | null;
        hubbardUValue: number;
    }[];
    get jsonSchemaPatchConfig(): {
        "items.properties.atomicSpecies": {
            enum: any[];
        };
        "items.properties.hubbardUValue": {
            default: number;
        };
    };
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
}
import { HubbardUContextProvider } from "./HubbardUContextProvider";
