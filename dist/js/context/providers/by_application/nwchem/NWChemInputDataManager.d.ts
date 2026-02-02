import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { NWChemTotalEnergyContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import { type JobContextMixin, type JobExternalContext } from "../../../mixins/JobContextMixin";
import { type MaterialContextMixin, type MaterialExternalContext } from "../../../mixins/MaterialContextMixin";
import { type MethodDataContextMixin, type MethodDataExternalContext } from "../../../mixins/MethodDataContextMixin";
import { type WorkflowContextMixin, type WorkflowExternalContext } from "../../../mixins/WorkflowContextMixin";
import type { ContextItem } from "../../base/ContextProvider";
import JSONSchemaDataProvider, { type JinjaExternalContext } from "../../base/JSONSchemaDataProvider";
type Name = "input";
type Data = NWChemTotalEnergyContextProviderSchema;
export type NWChemInputDataManagerContextItem = ContextItem<Data>;
export type NWChemInputDataManagerExternalContext = JinjaExternalContext & WorkflowExternalContext & JobExternalContext & MethodDataExternalContext & MaterialExternalContext;
type ExternalContext = NWChemInputDataManagerExternalContext;
type Base = typeof JSONSchemaDataProvider<Name, Data, object, ExternalContext> & Constructor<JobContextMixin> & Constructor<MaterialContextMixin> & Constructor<MethodDataContextMixin> & Constructor<WorkflowContextMixin>;
declare const NWChemInputDataManager_base: Base;
export default class NWChemInputDataManager extends NWChemInputDataManager_base {
    readonly name: "input";
    readonly domain: "executable";
    readonly jsonSchema: JSONSchema7 | undefined;
    constructor(config: ContextItem<Data>, externalContext: ExternalContext);
    getDefaultData(): {
        CHARGE: number;
        MULT: number;
        BASIS: string;
        NAT: number;
        NTYP: number;
        ATOMIC_POSITIONS: string;
        ATOMIC_POSITIONS_WITHOUT_CONSTRAINTS: string;
        ATOMIC_SPECIES: string;
        FUNCTIONAL: string;
        CARTESIAN: boolean;
    };
}
export {};
