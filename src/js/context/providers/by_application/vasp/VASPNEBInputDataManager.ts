import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type {
    InputContextItemSchema,
    VASPNEBContextProviderSchema,
} from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";

import jobContextMixin, {
    type JobContextMixin,
    type JobExternalContext,
} from "../../../mixins/JobContextMixin";
import materialContextMixin, {
    type MaterialContextMixin,
    type MaterialExternalContext,
} from "../../../mixins/MaterialContextMixin";
import materialsContextMixin, {
    type MaterialsContextMixin,
    type MaterialsExternalContext,
} from "../../../mixins/MaterialsContextMixin";
import materialsSetContextMixin, {
    type MaterialsSetContextMixin,
    type MaterialsSetExternalContext,
} from "../../../mixins/MaterialsSetContextMixin";
import methodDataContextMixin, {
    type MethodDataContextMixin,
    type MethodDataExternalContext,
} from "../../../mixins/MethodDataContextMixin";
import workflowContextMixin, {
    type WorkflowContextMixin,
    type WorkflowExternalContext,
} from "../../../mixins/WorkflowContextMixin";
import type { UnitContext } from "../../base/ContextProvider";
import JSONSchemaDataProvider, {
    type JinjaExternalContext,
} from "../../base/JSONSchemaDataProvider";
import VASPInputDataManager from "./VASPInputDataManager";

type Data = VASPNEBContextProviderSchema;
type Schema = InputContextItemSchema & { data: Data };
type ExternalContext = JinjaExternalContext &
    WorkflowExternalContext &
    JobExternalContext &
    MaterialExternalContext &
    MethodDataExternalContext &
    MaterialsExternalContext &
    MaterialsSetExternalContext;
type Base = typeof JSONSchemaDataProvider<Schema, ExternalContext> &
    Constructor<JobContextMixin> &
    Constructor<MaterialContextMixin> &
    Constructor<MaterialsContextMixin> &
    Constructor<MaterialsSetContextMixin> &
    Constructor<MethodDataContextMixin> &
    Constructor<WorkflowContextMixin>;

const jsonSchemaId = "context-providers-directory/by-application/vasp-neb-context-provider";

export default class VASPNEBInputDataManager extends (JSONSchemaDataProvider as Base) {
    readonly name = "input" as const;

    readonly domain = "executable" as const;

    readonly entityName = "unit" as const;

    static createFromUnitContext(unitContext: UnitContext, externalContext: ExternalContext) {
        const contextItem = this.findContextItem<Schema>(unitContext, "input");

        return new VASPNEBInputDataManager(contextItem, externalContext);
    }

    readonly jsonSchema: JSONSchema7 | undefined;

    constructor(config: Partial<Schema>, externalContext: ExternalContext) {
        super(config, externalContext);
        this.initMaterialContextMixin(externalContext);
        this.initMaterialsContextMixin(externalContext);
        this.initMaterialsSetContextMixin(externalContext);
        this.initMethodDataContextMixin(externalContext);
        this.initWorkflowContextMixin(externalContext);
        this.initJobContextMixin(externalContext);

        this.jsonSchema = JSONSchemasInterface.getSchemaById(jsonSchemaId);
    }

    getDefaultData() {
        const VASPContexts = this.sortMaterialsByIndexInSet(this.materials).map((material) => {
            return new VASPInputDataManager({}, { ...this.externalContext, material }).getData();
        });

        return {
            FIRST_IMAGE: VASPContexts[0].POSCAR_WITH_CONSTRAINTS,
            LAST_IMAGE: VASPContexts[VASPContexts.length - 1].POSCAR_WITH_CONSTRAINTS,
            INTERMEDIATE_IMAGES: VASPContexts.slice(1, VASPContexts.length - 1).map((data) => {
                return data.POSCAR_WITH_CONSTRAINTS;
            }),
            contextProviderName: "vasp-neb" as const,
        };
    }
}

materialContextMixin(VASPNEBInputDataManager.prototype);
materialsContextMixin(VASPNEBInputDataManager.prototype);
materialsSetContextMixin(VASPNEBInputDataManager.prototype);
methodDataContextMixin(VASPNEBInputDataManager.prototype);
workflowContextMixin(VASPNEBInputDataManager.prototype);
jobContextMixin(VASPNEBInputDataManager.prototype);
