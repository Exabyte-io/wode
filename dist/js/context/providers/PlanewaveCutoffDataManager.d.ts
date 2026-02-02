import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { PlanewaveCutoffsContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import { type ApplicationContextMixin, type ApplicationExternalContext } from "../mixins/ApplicationContextMixin";
import ContextProvider, { type ContextItem, type ExternalContext } from "./base/ContextProvider";
type Name = "cutoffs";
type Data = PlanewaveCutoffsContextProviderSchema;
type PlanewaveExternalContext = ExternalContext & ApplicationExternalContext;
type Base = typeof ContextProvider<Name, Data> & Constructor<ApplicationContextMixin>;
export type PlanewaveCutoffDataManagerContextItem = ContextItem<Data>;
export type PlanewaveCutoffDataManagerExternalContext = PlanewaveExternalContext;
declare const PlanewaveCutoffDataManager_base: Base;
export default class PlanewaveCutoffDataManager extends PlanewaveCutoffDataManager_base {
    readonly name: "cutoffs";
    readonly domain: "important";
    readonly entityName: "subworkflow";
    readonly jsonSchema: JSONSchema7 | undefined;
    readonly uiSchema: {
        wavefunction: {};
        density: {};
    };
    constructor(contextItem: ContextItem<Data>, externalContext: PlanewaveExternalContext);
    getDefaultData(): {
        wavefunction: number | undefined;
        density: number | undefined;
    };
}
export {};
