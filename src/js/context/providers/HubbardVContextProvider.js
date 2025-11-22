import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";

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
                siteIndex2:
                    this.uniqueElementsWithLabels?.length > 1 ? 2 : defaultHubbardConfig.siteIndex2,
            },
        ];
    }

    get firstSpecies() {
        return this.firstElement;
    }

    get secondSpecies() {
        return this.uniqueElementsWithLabels?.length > 1
            ? this.uniqueElementsWithLabels[1]
            : this.firstSpecies;
    }

    get uiSchemaStyled() {
        return {
            "ui:options": {
                addable: true,
                orderable: true,
                removable: true,
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
        return JSONSchemasInterface.getPatchedSchemaById(
            "context-providers-directory/hubbard-v-context-provider",
            {
                "items.properties.atomicSpecies": {
                    enum: this.uniqueElementsWithLabels,
                    default: this.firstSpecies,
                },
                "items.properties.siteIndex": {
                    default: defaultHubbardConfig.siteIndex,
                },
                "items.properties.atomicOrbital": {
                    enum: this.orbitalList,
                    default: defaultHubbardConfig.atomicOrbital,
                },
                "items.properties.atomicSpecies2": {
                    enum: this.uniqueElementsWithLabels,
                    default: this.secondSpecies,
                },
                "items.properties.siteIndex2": {
                    default:
                        this.uniqueElementsWithLabels?.length > 1
                            ? 2
                            : defaultHubbardConfig.siteIndex2,
                },
                "items.properties.atomicOrbital2": {
                    enum: this.orbitalList,
                    default: defaultHubbardConfig.atomicOrbital,
                },
                "items.properties.hubbardVValue": {
                    default: defaultHubbardConfig.hubbardVValue,
                },
            },
        );
    }
}
