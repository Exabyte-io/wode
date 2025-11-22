import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";

import { HubbardUContextProvider } from "./HubbardUContextProvider";

const defaultHubbardConfig = {
    hubbardUValue: 1.0,
};

export class HubbardContextProviderLegacy extends HubbardUContextProvider {
    get defaultData() {
        return [
            {
                ...defaultHubbardConfig,
                atomicSpecies: this.firstElement,
                atomicSpeciesIndex: this.uniqueElementsWithLabels?.length > 0 ? 1 : null,
            },
        ];
    }

    speciesIndexFromSpecies = (species) => {
        return this.uniqueElementsWithLabels?.length > 0
            ? this.uniqueElementsWithLabels.indexOf(species) + 1
            : null;
    };

    transformData = (data) => {
        return data.map((row) => ({
            ...row,
            atomicSpeciesIndex: this.speciesIndexFromSpecies(row.atomicSpecies),
        }));
    };

    get uiSchemaStyled() {
        return {
            "ui:options": {
                addable: true,
                orderable: false,
                removable: true,
            },
            items: {
                atomicSpecies: this.defaultFieldStyles,
                atomicSpeciesIndex: { ...this.defaultFieldStyles, "ui:readonly": true },
                hubbardUValue: this.defaultFieldStyles,
            },
        };
    }

    get jsonSchema() {
        return JSONSchemasInterface.getPatchedSchemaById(
            "context-providers-directory/hubbard-legacy-context-provider",
            {
                "items.properties.atomicSpecies": {
                    enum: this.uniqueElementsWithLabels,
                },
                "items.properties.hubbardUValue": {
                    default: defaultHubbardConfig.hubbardUValue,
                },
            },
        );
    }
}
