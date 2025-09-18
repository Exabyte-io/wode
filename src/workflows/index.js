import { allApplications } from "@exabyte-io/ade.js";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import schemas from "@mat3ra/esse/dist/js/schemas.json";

// Import Template here to apply context provider patch
// eslint-disable-next-line no-unused-vars
import { Template } from "../patch";
import { createWorkflow } from "./create";
import { Workflow } from "./workflow";
import { workflowData as allWorkflowData } from "./workflows";

// Running this to set schemas for validation, removing the redundant data from application-flavors tree: `flavors`
JSONSchemasInterface.setSchemas(schemas);

/*
    Workflow construction follows these rules:
        1. Workflow is constructed as a collection of subworkflows defined in JSON
        2. A "units" key should contain at least one object referencing the workflow itself
        3. Additional workflows are added in order specified in the same "units" array
        4. map units are added along with their workflows according to data in "units"
        5. top-level subworkflows are added directly in the order also specified by "units"
 */
function createWorkflows({
    appName = null,
    workflowCls = Workflow,
    workflowsData = allWorkflowData,
    ...swArgs
}) {
    let apps = appName !== null ? [appName] : allApplications;
    if (workflowsData === null) {
        workflowsData = allWorkflowData;
    }
    const allApplicationsFromWorkflowData = Object.keys(workflowsData.workflows);
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
    const { workflows } = workflowsData;
    apps.map((name) => {
        const { [name]: dataByApp } = workflows;
        Object.values(dataByApp).map((workflowDataForApp) => {
            wfs.push(
                createWorkflow({
                    appName: name,
                    workflowData: workflowDataForApp,
                    workflowsData,
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

function createWorkflowConfigs(applications, workflowsData) {
    const configs = [];
    applications.forEach((app) => {
        const workflows = createWorkflows({ appName: app, workflowsData });
        workflows.forEach((wf) => {
            configs.push({
                application: app,
                name: wf.prop("name"),
                config: wf.toJSON(),
            });
        });
    });
    return configs;
}

export { Workflow, createWorkflows, createWorkflowConfigs };
