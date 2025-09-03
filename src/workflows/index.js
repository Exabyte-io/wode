// Import Template here to apply context provider patch
// eslint-disable-next-line no-unused-vars
import { Template } from "../patch";
import { createWorkflowConfig } from "./create";
import { Workflow } from "./workflow";
import { workflowData as allWorkflowData } from "./workflows";

/*
    Workflow construction follows these rules:
        1. Workflow is constructed as a collection of subworkflows defined in JSON
        2. A "units" key should contain at least one object referencing the workflow itself
        3. Additional workflows are added in order specified in the same "units" array
        4. map units are added along with their workflows according to data in "units"
        5. top-level subworkflows are added directly in the order also specified by "units"
 */

function createWorkflowConfigs(appName = null, data = allWorkflowData) {
    const apps = appName ? [appName] : Object.keys(data.workflows || {});
    const wfs = [];
    const { workflows } = data;

    apps.forEach((name) => {
        const dataByApp = workflows?.[name] || {};
        Object.values(dataByApp).forEach((wf) => {
            wfs.push(createWorkflowConfig({ appName: name, workflowData: wf }));
        });
    });

    return wfs;
}

export { Workflow, createWorkflowConfigs };
