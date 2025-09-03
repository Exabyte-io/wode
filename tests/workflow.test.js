import { expect } from "chai";

import { createWorkflowConfigs, Workflow } from "../src/workflows";
import { createWorkflowConfig } from "../src/workflows/create";
import { workflowData as allWorkflowData } from "../src/workflows/workflows";

describe("workflows", () => {
    it("can all be created", () => {
        const workflowConfigs = createWorkflowConfigs();
        workflowConfigs.map((wfConfig) => {
            const wf = new Workflow(wfConfig);
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
    it("isMultiMaterial is read correctly", () => {
        // Nudged Elastic Band is multi-material
        const mmWorkflowConfig = createWorkflowConfig({
            appName: "espresso",
            workflowData: allWorkflowData.workflows.espresso.neb,
        });
        const mmWorkflow = new Workflow(mmWorkflowConfig);
        // eslint-disable-next-line no-unused-expressions
        expect(mmWorkflow.isMultiMaterial).to.be.true;
    });

    it("properties are not empty", () => {
        const workflow = createWorkflowConfig({
            appName: "espresso",
            workflowData: allWorkflowData.workflows.espresso.total_energy,
        });

        // eslint-disable-next-line no-unused-expressions
        expect(workflow.properties).to.be.an("array").that.is.not.empty;
    });
});
