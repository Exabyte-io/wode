"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.workflowContextMixin = workflowContextMixin;
const defaultWorkflow = {
    subworkflows: [],
    units: [],
    hasRelaxation: false,
};
function workflowContextMixin(item) {
    const properties = {
        isEdited: false,
        _workflow: defaultWorkflow,
        get workflow() {
            return this._workflow;
        },
        initWorkflowContextMixin() {
            const { config } = this; // as WorkflowConfig;
            this._workflow = (config.context && config.context.workflow) || defaultWorkflow;
            this.isEdited = false; // we always get the `defaultData` (recalculated from scratch, not persistent)
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
