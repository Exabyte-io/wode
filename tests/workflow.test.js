import { WorkflowStandata, workflowSubforkflowMapByApplication } from "@mat3ra/standata";
import { expect } from "chai";

import { createWorkflows, Workflow } from "../src";
import { createWorkflow } from "../src/workflows/create";

describe("workflows", () => {
    it("can all be created", () => {
        const workflows = createWorkflows({});
        workflows.map((wf) => {
            // eslint-disable-next-line no-unused-expressions
            expect(wf).to.exist;
            // eslint-disable-next-line no-unused-expressions
            expect(wf.isValid()).to.be.true;

            const wfCopy = new Workflow(wf.toJSON());

            // eslint-disable-next-line no-unused-expressions
            expect(wfCopy.isValid()).to.be.true;

            // expect(wf.validate()).to.be.true;
            return null;
        });
    });
});

describe("workflow property", () => {
    // TODO: unskip when all WFs are added to Standata
    it.skip("isMultiMaterial is read correctly", () => {
        // Nudged Elastic Band is multi-material
        const mmWorkflow = createWorkflow({
            appName: "espresso",
            workflowData: workflowSubforkflowMapByApplication.workflows.espresso.neb,
            workflowSubworkflowMapByApplication: workflowSubforkflowMapByApplication,
        });
        // eslint-disable-next-line no-unused-expressions
        expect(mmWorkflow.isMultiMaterial).to.be.true;
    });

    it("properties are not empty", () => {
        const workflow = createWorkflow({
            appName: "espresso",
            workflowData: workflowSubforkflowMapByApplication.workflows.espresso.total_energy,
            workflowSubworkflowMapByApplication: workflowSubforkflowMapByApplication,
        });

        // eslint-disable-next-line no-unused-expressions
        expect(workflow.properties).to.be.an("array").that.is.not.empty;
    });
});

describe("relaxation logic", () => {
    let espressoWorkflow;
    beforeEach(() => {
        const espressoWorkflowConfig = new WorkflowStandata().findEntitiesByTags(
            "espresso",
            "total_energy",
        )[0];
        espressoWorkflow = new Workflow(espressoWorkflowConfig);
    });

    it("relaxationSubworkflow returns correct subworkflow for application", () => {
        const espressoRelaxation = espressoWorkflow.relaxationSubworkflow;

        // eslint-disable-next-line no-unused-expressions
        expect(espressoRelaxation).to.exist;

        expect(espressoRelaxation.systemName).to.equal("espresso-variable-cell-relaxation");
    });

    it("toggles relaxation correctly", () => {
        expect(espressoWorkflow.hasRelaxation).to.be.false;
        espressoWorkflow.toggleRelaxation();
        expect(espressoWorkflow.hasRelaxation).to.be.true;
        expect(espressoWorkflow.relaxationSubworkflow).to.exist;
        expect(espressoWorkflow.relaxationSubworkflow.systemName).to.equal(
            "espresso-variable-cell-relaxation",
        );

        espressoWorkflow.toggleRelaxation();
        expect(espressoWorkflow.hasRelaxation).to.be.false;
        // relaxationSubworkflow getter always returns a relaxation subworkflow for the application
        expect(espressoWorkflow.relaxationSubworkflow).to.exist;
    });
});

describe("Workflow UUIDs", () => {
    afterEach(() => {
        Workflow.usePredefinedIds = false;
    });

    it("workflow UUIDs are kept if predefined", () => {
        Workflow.usePredefinedIds = true;

        const createTestWorkflow = () =>
            createWorkflow({
                appName: "espresso",
                workflowData: workflowSubforkflowMapByApplication.workflows.espresso.total_energy,
                workflowSubworkflowMapByApplication: workflowSubforkflowMapByApplication,
                workflowCls: Workflow,
            });

        const workflow1 = createTestWorkflow();
        const workflow2 = createTestWorkflow();
        expect(workflow1).to.not.be.equal(undefined);
        expect(workflow1._id).to.equal(workflow2._id);
    });
});
