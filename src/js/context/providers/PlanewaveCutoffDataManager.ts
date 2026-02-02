import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { PlanewaveCutoffsContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";

import {
    type ApplicationContextMixin,
    type ApplicationExternalContext,
    applicationContextMixin,
} from "../mixins/ApplicationContextMixin";
import ContextProvider, { type ContextItem, type ExternalContext } from "./base/ContextProvider";

type ApplicationName = "vasp" | "espresso";

type Name = "cutoffs";
type Data = PlanewaveCutoffsContextProviderSchema;
type PlanewaveExternalContext = ExternalContext & ApplicationExternalContext;
type Base = typeof ContextProvider<Name, Data> & Constructor<ApplicationContextMixin>;

export type PlanewaveCutoffDataManagerContextItem = ContextItem<Data>;
export type PlanewaveCutoffDataManagerExternalContext = PlanewaveExternalContext;

// TODO: create a task to move this handling to standata
const cutoffConfig: Record<ApplicationName, { wavefunction?: number; density?: number }> = {
    vasp: { wavefunction: undefined, density: undefined },
    espresso: { wavefunction: 40, density: 200 },
};

const jsonSchemaId = "context-providers-directory/planewave-cutoffs-context-provider";

export default class PlanewaveCutoffDataManager extends (ContextProvider as Base) {
    readonly name = "cutoffs" as const;

    readonly domain = "important" as const;

    readonly entityName = "subworkflow" as const;

    readonly jsonSchema: JSONSchema7 | undefined;

    readonly uiSchema = {
        wavefunction: {},
        density: {},
    };

    constructor(contextItem: ContextItem<Data>, externalContext: PlanewaveExternalContext) {
        super(contextItem, externalContext);
        this.initApplicationContextMixin(externalContext);

        const { wavefunction, density } = this.getDefaultData();

        this.jsonSchema = JSONSchemasInterface.getPatchedSchemaById(jsonSchemaId, {
            wavefunction: { default: wavefunction },
            density: { default: density },
        });
    }

    getDefaultData() {
        // TODO-QUESTION: what if the application is not in the cutoffConfig?
        const { wavefunction, density } =
            cutoffConfig[this.application.name as ApplicationName] || {};

        return {
            wavefunction,
            density,
        };
    }
}

applicationContextMixin(PlanewaveCutoffDataManager.prototype);
