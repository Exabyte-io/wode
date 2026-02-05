import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { InputContextItemSchema, VASPNEBContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import { type JobContextMixin, type JobExternalContext } from "../../../mixins/JobContextMixin";
import { type MaterialContextMixin, type MaterialExternalContext } from "../../../mixins/MaterialContextMixin";
import { type MaterialsContextMixin, type MaterialsExternalContext } from "../../../mixins/MaterialsContextMixin";
import { type MaterialsSetContextMixin, type MaterialsSetExternalContext } from "../../../mixins/MaterialsSetContextMixin";
import { type MethodDataContextMixin, type MethodDataExternalContext } from "../../../mixins/MethodDataContextMixin";
import { type WorkflowContextMixin, type WorkflowExternalContext } from "../../../mixins/WorkflowContextMixin";
import type { UnitContext } from "../../base/ContextProvider";
import JSONSchemaDataProvider, { type JinjaExternalContext } from "../../base/JSONSchemaDataProvider";
type Data = VASPNEBContextProviderSchema;
type Schema = InputContextItemSchema & {
    data: Data;
};
type ExternalContext = JinjaExternalContext & WorkflowExternalContext & JobExternalContext & MaterialExternalContext & MethodDataExternalContext & MaterialsExternalContext & MaterialsSetExternalContext;
type Base = typeof JSONSchemaDataProvider<Schema, ExternalContext> & Constructor<JobContextMixin> & Constructor<MaterialContextMixin> & Constructor<MaterialsContextMixin> & Constructor<MaterialsSetContextMixin> & Constructor<MethodDataContextMixin> & Constructor<WorkflowContextMixin>;
declare const VASPNEBInputDataManager_base: Base;
export default class VASPNEBInputDataManager extends VASPNEBInputDataManager_base {
    readonly name: "input";
    readonly domain: "executable";
    readonly entityName: "unit";
    static createFromUnitContext(unitContext: UnitContext, externalContext: ExternalContext): VASPNEBInputDataManager;
    readonly jsonSchema: JSONSchema7 | undefined;
    constructor(config: Partial<Schema>, externalContext: ExternalContext);
    getDefaultData(): {
        FIRST_IMAGE: string;
        LAST_IMAGE: string;
        INTERMEDIATE_IMAGES: string[];
        contextProviderName: "vasp-neb";
    };
}
export {};
