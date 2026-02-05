import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { CutoffsContextItemSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import { type ApplicationContextMixin, type ApplicationExternalContext } from "../mixins/ApplicationContextMixin";
import ContextProvider, { type ExternalContext, type UnitContext } from "./base/ContextProvider";
type Schema = CutoffsContextItemSchema;
type PlanewaveExternalContext = ExternalContext & ApplicationExternalContext;
type Base = typeof ContextProvider<Schema, ExternalContext> & Constructor<ApplicationContextMixin>;
declare const PlanewaveCutoffDataManager_base: Base;
export default class PlanewaveCutoffDataManager extends PlanewaveCutoffDataManager_base {
    readonly name: "cutoffs";
    readonly domain: "important";
    readonly entityName: "subworkflow";
    readonly jsonSchema: JSONSchema7 | undefined;
    readonly uiSchema: {
        readonly wavefunction: {};
        readonly density: {};
    };
    readonly extraData: {};
    static createFromUnitContext(unitContext: UnitContext, externalContext: PlanewaveExternalContext): PlanewaveCutoffDataManager;
    constructor(contextItem?: Partial<Schema>, externalContext?: PlanewaveExternalContext);
    getDefaultData(): {
        wavefunction: number | undefined;
        density: number | undefined;
    };
}
export {};
