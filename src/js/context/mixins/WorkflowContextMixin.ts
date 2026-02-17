import type { Workflow } from "../../Workflow";
import type ContextProvider from "../providers/base/ContextProvider";

export type WorkflowContextMixin = {
    isEdited: boolean;
    workflow: Workflow;
    initWorkflowContextMixin(externalContext: WorkflowExternalContext): void;
};

export type WorkflowExternalContext = {
    workflow: Workflow;
};

export default function workflowContextMixin(item: ContextProvider) {
    // @ts-expect-error
    const properties: ContextProvider & WorkflowContextMixin = {
        isEdited: false,

        initWorkflowContextMixin(externalContext: WorkflowExternalContext) {
            this.workflow = externalContext.workflow;
            this.isEdited = false;
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
