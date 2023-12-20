import { HubbardUContextProvider } from "./HubbardUContextProvider";

const defaultHubbardConfig = {
    atomicSpecies: "",
    atomicOrbital: "2p",
    atomicSpecies2: "",
    atomicOrbital2: "2p",
    siteIndex: 1,
    siteIndex2: 1,
    hubbardVValue: 1.0,
};

export class HubbardVContextProvider extends HubbardUContextProvider {
    get defaultData() {
        return [
            {
                ...defaultHubbardConfig,
                atomicSpecies: this.firstSpecies,
                atomicSpecies2: this.secondSpecies,
                siteIndex2: this.uniqueElements?.length > 1 ? 2 : defaultHubbardConfig.siteIndex2,
            },
        ];
    }

    get firstSpecies() {
        return this.uniqueElements?.length > 0 ? this.uniqueElements[0] : "";
    }

    get secondSpecies() {
        return this.uniqueElements?.length > 1 ? this.uniqueElements[1] : this.firstSpecies;
    }

    get uiSchemaStyled() {
        return {
            "ui:options": {
                addable: true,
                orderable: true,
                removable: true,
            },
            title: {
                "ui:classNames": "col-xs-12",
            },
            items: {
                atomicSpecies: this.defaultFieldStyles,
                atomicOrbital: this.defaultFieldStyles,
                atomicSpecies2: this.defaultFieldStyles,
                atomicOrbital2: this.defaultFieldStyles,
                siteIndex: this.defaultFieldStyles,
                siteIndex2: this.defaultFieldStyles,
                hubbardVValue: this.defaultFieldStyles,
            },
        };
    }

    get jsonSchema() {
        return {
            $schema: "http://json-schema.org/draft-04/schema#",
            title: "",
            description: "Hubbard V parameters for DFT+U+V calculation.",
            type: "array",
            items: {
                type: "object",
                properties: {
                    atomicSpecies: {
                        type: "string",
                        title: "Species 1",
                        enum: this.uniqueElements,
                        default: this.firstSpecies,
                    },
                    siteIndex: {
                        type: "integer",
                        title: "Site no 1",
                        default: defaultHubbardConfig.siteIndex,
                    },
                    atomicOrbital: {
                        type: "string",
                        title: "Orbital 1",
                        enum: this.orbitalList,
                        default: defaultHubbardConfig.atomicOrbital,
                    },
                    atomicSpecies2: {
                        type: "string",
                        title: "Species 2",
                        enum: this.uniqueElements,
                        default: this.secondSpecies,
                    },
                    siteIndex2: {
                        type: "integer",
                        title: "Site no 2",
                        default:
                            this.uniqueElements?.length > 1 ? 2 : defaultHubbardConfig.siteIndex2,
                    },
                    atomicOrbital2: {
                        type: "string",
                        title: "Orbital 2",
                        enum: this.orbitalList,
                        default: defaultHubbardConfig.atomicOrbital,
                    },
                    hubbardVValue: {
                        type: "number",
                        title: "V (eV)",
                        default: defaultHubbardConfig.hubbardVValue,
                    },
                },
            },
            minItems: 1,
        };
    }
}
