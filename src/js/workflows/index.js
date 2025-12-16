import { allApplications } from "@mat3ra/ade";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import schemas from "@mat3ra/esse/dist/js/schemas.json";
import { workflowSubforkflowMapByApplication } from "@mat3ra/standata";

// Import Template here to apply context provider patch
// eslint-disable-next-line no-unused-vars
import { Template } from "../patch";
import { createWorkflow } from "./create";
import { Workflow } from "./workflow";

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
    workflowSubworkflowMapByApplication = workflowSubforkflowMapByApplication,
    ...swArgs
}) {
    let apps = appName !== null ? [appName] : allApplications;
    const allApplicationsFromWorkflowData = Object.keys(
        workflowSubworkflowMapByApplication.workflows,
    );
    // output warning if allApplications and allApplicationsFromWorkflowData do not match
    if (appName === null) {
        if (apps && apps.sort().join(",") !== allApplicationsFromWorkflowData.sort().join(",")) {
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
    const { workflows } = workflowSubworkflowMapByApplication;
    apps.map((name) => {
        const { [name]: dataByApp } = workflows;
        Object.values(dataByApp).map((workflowDataForApp) => {
            wfs.push(
                createWorkflow({
                    appName: name,
                    workflowData: workflowDataForApp,
                    workflowSubworkflowMapByApplication,
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

/**
 * @summary Create workflow configurations for all applications
 * @param applications {Array<String>} array of application names
 * @param workflowCls {*} workflow class to instantiate
 * @param workflowSubworkflowMapByApplication {Object} object containing all workflow/subworkflow map by application
 * @param swArgs {Object} other classes for instantiation
 * @returns {Array<Object>} array of workflow configurations
 */
function createWorkflowConfigs({
    applications,
    workflowCls = Workflow,
    workflowSubworkflowMapByApplication,
    ...swArgs
}) {
    const configs = [];
    applications.forEach((app) => {
        const workflows = createWorkflows({
            appName: app,
            workflowCls,
            workflowSubworkflowMapByApplication,
            ...swArgs,
        });
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

export { Workflow, createWorkflows, createWorkflowConfigs, createWorkflow };
