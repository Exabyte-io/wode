import { ContextProvider } from "@mat3ra/ade";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";

import { applicationContextMixin } from "../mixins/ApplicationContextMixin";

const cutoffConfig = {
    vasp: {}, // assuming default cutoffs for VASP
    espresso: {
        // assuming the default GBRV set of pseudopotentials is used
        wavefunction: 40,
        density: 200,
    },
};

export class PlanewaveCutoffsContextProvider extends ContextProvider {
    constructor(config) {
        super(config);
        this.initApplicationContextMixin();
    }

    // eslint-disable-next-line class-methods-use-this
    get uiSchema() {
        return {
            wavefunction: {},
            density: {},
        };
    }

    get defaultData() {
        return {
            wavefunction: this.defaultECUTWFC,
            density: this.defaultECUTRHO,
        };
    }

    get _cutoffConfigPerApplication() {
        return cutoffConfig[this.application.name];
    }

    get defaultECUTWFC() {
        return this._cutoffConfigPerApplication.wavefunction || null;
    }

    get defaultECUTRHO() {
        return this._cutoffConfigPerApplication.density || null;
    }

    get jsonSchema() {
        return JSONSchemasInterface.getPatchedSchemaById(
            "context-providers-directory/planewave-cutoffs-context-provider",
            {
                wavefunction: { default: this.defaultECUTWFC },
                density: { default: this.defaultECUTRHO },
            },
        );
    }
}

applicationContextMixin(PlanewaveCutoffsContextProvider.prototype);
