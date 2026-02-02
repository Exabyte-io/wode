import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { VASPContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import { type JobContextMixin, type JobExternalContext } from "../../../mixins/JobContextMixin";
import { type MaterialContextMixin, type MaterialExternalContext } from "../../../mixins/MaterialContextMixin";
import { type MaterialsContextMixin, type MaterialsExternalContext } from "../../../mixins/MaterialsContextMixin";
import { type MethodDataContextMixin, type MethodDataExternalContext } from "../../../mixins/MethodDataContextMixin";
import { type WorkflowContextMixin, type WorkflowExternalContext } from "../../../mixins/WorkflowContextMixin";
import type { ContextItem } from "../../base/ContextProvider";
import JSONSchemaDataProvider, { type JinjaExternalContext } from "../../base/JSONSchemaDataProvider";
type Name = "input";
type Data = VASPContextProviderSchema;
export type VASPInputDataManagerContextItem = ContextItem<Data>;
export type VASPInputDataManagerExternalContext = JinjaExternalContext & WorkflowExternalContext & JobExternalContext & MaterialExternalContext & MethodDataExternalContext & MaterialsExternalContext;
type ExternalContext = VASPInputDataManagerExternalContext;
type Base = typeof JSONSchemaDataProvider<Name, Data, object, ExternalContext> & Constructor<JobContextMixin> & Constructor<MaterialContextMixin> & Constructor<MethodDataContextMixin> & Constructor<MaterialsContextMixin> & Constructor<WorkflowContextMixin>;
declare const VASPInputDataManager_base: Base;
export default class VASPInputDataManager extends VASPInputDataManager_base {
    readonly name: "input";
    readonly domain: "executable";
    readonly jsonSchema: JSONSchema7 | undefined;
    constructor(config: ContextItem<Data>, externalContext: ExternalContext);
    private buildVASPContext;
    private getDataPerMaterial;
    getDefaultData(): {
        perMaterial?: undefined;
        POSCAR: string;
        POSCAR_WITH_CONSTRAINTS: string;
    } | {
        perMaterial: VASPContextProviderSchema[];
        POSCAR: string;
        POSCAR_WITH_CONSTRAINTS: string;
    };
}
export {};
