import { WorkflowStandata, workflowSubworkflowMapByApplication } from "@mat3ra/standata";
import { expect } from "chai";

import { builders, createWorkflows, Subworkflow, UnitFactory, Workflow } from "../../src/js";
import { createWorkflow } from "../../src/js/workflows/create";

// Expected predefined IDs constants - update these after running test to see actual values
const EXPECTED_WORKFLOW_ID = "cd826954-8c96-59f7-b2de-f36ce2d86105";
const EXPECTED_SUBWORKFLOW_ID = "233bb8cf-3b4a-5378-84d9-a6a95a2ab43d";
const EXPECTED_UNIT_ID = "9fc7a088-5533-5f70-bb33-f676ec65f565";

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

    it("can generate workflow configs with predefined IDs", () => {
        // Set up predefined IDs for all classes
        const WorkflowCls = Workflow;
        WorkflowCls.usePredefinedIds = true;

        const SubworkflowCls = Subworkflow;
        SubworkflowCls.usePredefinedIds = true;

        builders.UnitConfigBuilder.usePredefinedIds = true;
        builders.AssignmentUnitConfigBuilder.usePredefinedIds = true;
        builders.AssertionUnitConfigBuilder.usePredefinedIds = true;
        builders.ExecutionUnitConfigBuilder.usePredefinedIds = true;
        builders.IOUnitConfigBuilder.usePredefinedIds = true;

        UnitFactory.BaseUnit.usePredefinedIds = true;
        UnitFactory.AssignmentUnit.usePredefinedIds = true;
        UnitFactory.AssertionUnit.usePredefinedIds = true;
        UnitFactory.ExecutionUnit.usePredefinedIds = true;
        UnitFactory.IOUnit.usePredefinedIds = true;
        UnitFactory.SubworkflowUnit.usePredefinedIds = true;
        UnitFactory.ConditionUnit.usePredefinedIds = true;
        UnitFactory.MapUnit.usePredefinedIds = true;
        UnitFactory.ProcessingUnit.usePredefinedIds = true;

        try {
            // Test using a minimal workflow configuration
            const workflow = createWorkflows({
                appName: "espresso",
                workflowCls: WorkflowCls,
                SubworkflowCls,
                UnitFactory,
                UnitConfigBuilder: {
                    ...builders,
                    Workflow: WorkflowCls,
                },
            })[0];

            // eslint-disable-next-line no-unused-expressions
            expect(workflow).to.exist;
            expect(workflow).to.have.property("_id");

            expect(workflow._id).to.equal(EXPECTED_WORKFLOW_ID);

            expect(workflow).to.have.property("subworkflows");
            expect(workflow.subworkflows[0]).to.have.property("_id");
            expect(workflow.subworkflows[0]._id).to.equal(EXPECTED_SUBWORKFLOW_ID);

            expect(workflow.subworkflows[0]).to.have.property("units");
            expect(workflow.subworkflows[0].units[0]).to.have.property("flowchartId");
            expect(workflow.subworkflows[0].units[0].flowchartId).to.equal(EXPECTED_UNIT_ID);
        } finally {
            // Clean up - reset usePredefinedIds to false
            WorkflowCls.usePredefinedIds = false;
            SubworkflowCls.usePredefinedIds = false;

            builders.UnitConfigBuilder.usePredefinedIds = false;
            builders.AssignmentUnitConfigBuilder.usePredefinedIds = false;
            builders.AssertionUnitConfigBuilder.usePredefinedIds = false;
            builders.ExecutionUnitConfigBuilder.usePredefinedIds = false;
            builders.IOUnitConfigBuilder.usePredefinedIds = false;

            UnitFactory.BaseUnit.usePredefinedIds = false;
            UnitFactory.AssignmentUnit.usePredefinedIds = false;
            UnitFactory.AssertionUnit.usePredefinedIds = false;
            UnitFactory.ExecutionUnit.usePredefinedIds = false;
            UnitFactory.IOUnit.usePredefinedIds = false;
            UnitFactory.SubworkflowUnit.usePredefinedIds = false;
            UnitFactory.ConditionUnit.usePredefinedIds = false;
            UnitFactory.MapUnit.usePredefinedIds = false;
            UnitFactory.ProcessingUnit.usePredefinedIds = false;
        }
    });

    it("generates non-colliding predefined IDs", () => {
        Workflow.usePredefinedIds = true;
        const workflow1 = createWorkflow({
            appName: "espresso",
            workflowData: workflowSubworkflowMapByApplication.workflows.espresso.total_energy,
            workflowSubworkflowMapByApplication,
            workflowCls: Workflow,
        });
        const workflow2 = createWorkflow({
            appName: "vasp",
            workflowData: workflowSubworkflowMapByApplication.workflows.vasp.total_energy,
            workflowSubworkflowMapByApplication,
            workflowCls: Workflow,
        });
        expect(workflow1._id).to.not.equal(workflow2._id);
    });
});

describe("workflow property", () => {
    it("isMultiMaterial is read correctly", () => {
        // Nudged Elastic Band is multi-material
        const mmWorkflow = createWorkflow({
            appName: "espresso",
            workflowData: workflowSubworkflowMapByApplication.workflows.espresso.neb,
            workflowSubworkflowMapByApplication,
        });
        // eslint-disable-next-line no-unused-expressions
        expect(mmWorkflow.isMultiMaterial).to.be.true;
    });

    it("properties are not empty", () => {
        const workflow = createWorkflow({
            appName: "espresso",
            workflowData: workflowSubworkflowMapByApplication.workflows.espresso.total_energy,
            workflowSubworkflowMapByApplication,
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
                workflowData: workflowSubworkflowMapByApplication.workflows.espresso.total_energy,
                workflowSubworkflowMapByApplication,
                workflowCls: Workflow,
            });

        const workflow1 = createTestWorkflow();
        const workflow2 = createTestWorkflow();
        expect(workflow1._id).to.not.be.equal("");
        expect(workflow1._id).to.equal(workflow2._id);
    });
});
