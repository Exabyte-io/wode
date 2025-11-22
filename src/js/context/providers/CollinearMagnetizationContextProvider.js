import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import lodash from "lodash";

import { materialContextMixin } from "../mixins/MaterialContextMixin";

export class CollinearMagnetizationContextProvider extends JSONSchemaFormDataProvider {
    constructor(config) {
        super(config);

        this.initMaterialContextMixin();

        this.firstElement =
            this.uniqueElementsWithLabels?.length > 0 ? this.uniqueElementsWithLabels[0] : "";
        this.isTotalMagnetization = lodash.get(this.data, "isTotalMagnetization", false);
    }

    get uniqueElementsWithLabels() {
        const elementsWithLabelsArray = this.material?.Basis?.elementsWithLabelsArray || [];
        return [...new Set(elementsWithLabelsArray)];
    }

    indexOfElement = (element) => {
        return this.uniqueElementsWithLabels.indexOf(element) + 1;
    };

    get defaultData() {
        return {
            startingMagnetization: [
                {
                    index: 1,
                    atomicSpecies: this.firstElement,
                    value: 0.0,
                },
            ],
            isTotalMagnetization: false,
            totalMagnetization: 0.0,
        };
    }

    transformData = (data) => {
        const startingMagnetizationWithIndex = data.startingMagnetization.map((row) => ({
            ...row,
            index: this.indexOfElement(row.atomicSpecies),
        }));

        return {
            ...data,
            startingMagnetization: startingMagnetizationWithIndex,
        };
    };

    get uiSchemaStyled() {
        return {
            startingMagnetization: {
                items: {
                    atomicSpecies: {
                        "ui:classNames": "col-xs-3",
                    },
                    value: {
                        "ui:classNames": "col-xs-6",
                    },
                },
                "ui:readonly": this.isTotalMagnetization,
            },
            isTotalMagnetization: {},
            totalMagnetization: {
                "ui:classNames": "col-xs-6",
                "ui:readonly": !this.isTotalMagnetization,
            },
        };
    }

    get jsonSchema() {
        return JSONSchemasInterface.getPatchedSchemaById(
            "context-providers-directory/collinear-magnetization-context-provider",
            {
                "properties.startingMagnetization": {
                    maxItems: this.uniqueElementsWithLabels.length,
                },
                "properties.startingMagnetization.items.properties.atomicSpecies": {
                    enum: this.uniqueElementsWithLabels,
                    default: this.firstElement,
                },
                "properties.startingMagnetization.items.properties.value": {
                    default: 0.0,
                },
                "properties.isTotalMagnetization": {
                    default: false,
                },
                "properties.totalMagnetization": {
                    default: 0.0,
                },
            },
        );
    }
}

materialContextMixin(CollinearMagnetizationContextProvider.prototype);
