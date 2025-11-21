import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
import BoundaryConditionsProviderSchema from "@mat3ra/esse/dist/js/schema/context_providers_directory/boundary_conditions_provider.json";
import { Made } from "@mat3ra/made";
import { Utils } from "@mat3ra/utils";

import { materialContextMixin } from "../mixins/MaterialContextMixin";

export class BoundaryConditionsFormDataProvider extends JSONSchemaFormDataProvider {
    constructor(config) {
        super(config);
        this.initMaterialContextMixin();
    }

    get boundaryConditions() {
        return this.material.metadata.boundaryConditions || {};
    }

    // eslint-disable-next-line class-methods-use-this
    get defaultData() {
        return {
            type: this.boundaryConditions.type || "pbc",
            offset: this.boundaryConditions.offset || 0,
            electricField: 0,
            targetFermiEnergy: 0,
        };
    }

    // TODO: MOVE to WA/wove instantiation
    // eslint-disable-next-line class-methods-use-this
    get uiSchema() {
        return {
            type: { "ui:disabled": true },
            offset: { "ui:disabled": true },
            electricField: {},
            targetFermiEnergy: {},
        };
    }

    // eslint-disable-next-line class-methods-use-this
    get humanName() {
        return "Boundary Conditions";
    }

    yieldDataForRendering() {
        const data = Utils.clone.deepClone(this.yieldData());
        data.boundaryConditions.offset *= Made.coefficients.ANGSTROM_TO_BOHR;
        data.boundaryConditions.targetFermiEnergy *= Made.coefficients.EV_TO_RY;
        data.boundaryConditions.electricField *= Made.coefficients.EV_A_TO_RY_BOHR;
        return data;
    }

    // eslint-disable-next-line class-methods-use-this
    getPatchedSchemaWithDefaults(schema, defaults) {
        const patchedSchema = Utils.clone.deepClone(schema);

        if (!patchedSchema.properties) {
            return patchedSchema;
        }

        Object.entries(defaults).forEach(([propertyName, defaultValue]) => {
            const propertySchema = patchedSchema.properties?.[propertyName];
            if (propertySchema && typeof propertySchema === "object") {
                propertySchema.default = defaultValue;
            }
        });

        return patchedSchema;
    }

    get jsonSchema() {
        return this.getPatchedSchemaWithDefaults(
            BoundaryConditionsProviderSchema,
            this.defaultData,
        );
    }
}

materialContextMixin(BoundaryConditionsFormDataProvider.prototype);
