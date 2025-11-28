export class HubbardJContextProvider extends HubbardUContextProvider {
    get defaultData(): {
        atomicSpecies: any;
        paramType: string;
        atomicOrbital: string;
        value: number;
    }[];
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
    get jsonSchema(): {
        $schema: string;
        title: string;
        description: string;
        type: string;
        items: {
            type: string;
            properties: {
                paramType: {
                    type: string;
                    title: string;
                    enum: string[];
                    default: string;
                };
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
                value: {
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
