"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Workflow", {
  enumerable: true,
  get: function () {
    return _workflow.Workflow;
  }
});
Object.defineProperty(exports, "createWorkflow", {
  enumerable: true,
  get: function () {
    return _create.createWorkflow;
  }
});
exports.createWorkflowConfigs = createWorkflowConfigs;
exports.createWorkflows = createWorkflows;
var _ade = require("@mat3ra/ade");
var _JSONSchemasInterface = _interopRequireDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
var _schemas = _interopRequireDefault(require("@mat3ra/esse/dist/js/schemas.json"));
var _standata = require("@mat3ra/standata");
var _patch = require("../patch");
var _create = require("./create");
var _workflow = require("./workflow");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Import Template here to apply context provider patch
// eslint-disable-next-line no-unused-vars

// Running this to set schemas for validation, removing the redundant data from application-flavors tree: `flavors`
_JSONSchemasInterface.default.setSchemas(_schemas.default);

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
  workflowCls = _workflow.Workflow,
  workflowSubworkflowMapByApplication = _standata.workflowSubforkflowMapByApplication,
  ...swArgs
}) {
  let apps = appName !== null ? [appName] : _ade.allApplications;
  const allApplicationsFromWorkflowData = Object.keys(workflowSubworkflowMapByApplication.workflows);
  // output warning if allApplications and allApplicationsFromWorkflowData do not match
  if (appName === null) {
    if (apps && apps.sort().join(",") !== allApplicationsFromWorkflowData.sort().join(",")) {
      // eslint-disable-next-line no-console
      console.warn(`Warning: allApplications and allApplicationsFromWorkflowData do not match:
                ${apps.sort().join(",")} !== ${allApplicationsFromWorkflowData.sort().join(",")}`);
      console.warn("Using allApplicationsFromWorkflowData");
    }
    apps = allApplicationsFromWorkflowData;
  }
  const wfs = [];
  const {
    workflows
  } = workflowSubworkflowMapByApplication;
  apps.map(name => {
    const {
      [name]: dataByApp
    } = workflows;
    Object.values(dataByApp).map(workflowDataForApp => {
      wfs.push((0, _create.createWorkflow)({
        appName: name,
        workflowData: workflowDataForApp,
        workflowSubworkflowMapByApplication,
        workflowCls,
        ...swArgs
      }));
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
  workflowCls = _workflow.Workflow,
  workflowSubworkflowMapByApplication,
  ...swArgs
}) {
  const configs = [];
  applications.forEach(app => {
    const workflows = createWorkflows({
      appName: app,
      workflowCls,
      workflowSubworkflowMapByApplication,
      ...swArgs
    });
    workflows.forEach(wf => {
      configs.push({
        application: app,
        name: wf.prop("name"),
        config: wf.toJSON()
      });
    });
  });
  return configs;
}