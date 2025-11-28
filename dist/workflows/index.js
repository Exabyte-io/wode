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
exports.createWorkflows = createWorkflows;
var _ade = require("@exabyte-io/ade.js");
var _patch = require("../patch");
var _create = require("./create");
var _workflow = require("./workflow");
var _workflows = require("./workflows");
// Import Template here to apply context provider patch
// eslint-disable-next-line no-unused-vars

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
  ...swArgs
}) {
  let apps = appName !== null ? [appName] : _ade.allApplications;
  const allApplicationsFromWorkflowData = Object.keys(_workflows.workflowData.workflows);
  // output warning if allApplications and allApplicationsFromWorkflowData do not match
  if (appName === null) {
    if (apps.sort().join(",") !== allApplicationsFromWorkflowData.sort().join(",")) {
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
  } = _workflows.workflowData;
  apps.map(name => {
    const {
      [name]: dataByApp
    } = workflows;
    Object.values(dataByApp).map(workflowData => {
      wfs.push((0, _create.createWorkflow)({
        appName: name,
        workflowData,
        workflowCls,
        ...swArgs
      }));
      return null;
    });
    return null;
  });
  return wfs;
}