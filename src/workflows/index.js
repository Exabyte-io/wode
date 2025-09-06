import { allApplications } from "@exabyte-io/ade.js";

// Import Template here to apply context provider patch
// eslint-disable-next-line no-unused-vars
import { Template } from "../patch";
import { createWorkflow } from "./create";
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
function createWorkflows({ appName = null, workflowCls = Workflow, ...swArgs }) {
    let apps = appName !== null ? [appName] : allApplications;
    const allApplicationsFromWorkflowData = Object.keys(allWorkflowData.workflows);
    // output warning if allApplications and allApplicationsFromWorkflowData do not match
    if (appName === null) {
        if (apps.sort().join(",") !== allApplicationsFromWorkflowData.sort().join(",")) {
            // eslint-disable-next-line no-console
            console.warn(
                `Warning: allApplications and allApplicationsFromWorkflowData do not match: 
                ${apps.sort().join(",")} !== ${allApplicationsFromWorkflowData.sort().join(",")}`,
            );
            console.warn("Using allApplicationsFromWorkflowData");
        }
        apps = allApplicationsFromWorkflowData;
    }
    const wfs = [];
    const { workflows } = allWorkflowData;
    apps.map((name) => {
        const { [name]: dataByApp } = workflows;
        Object.values(dataByApp).map((workflowData) => {
            wfs.push(
                createWorkflow({
                    appName: name,
                    workflowData,
                    workflowCls,
                    ...swArgs,
                }),
            );
            return null;
        });
        return null;
    });
    return wfs;
}

export { Workflow, createWorkflows };
