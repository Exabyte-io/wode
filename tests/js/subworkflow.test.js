import { ApplicationRegistry } from "@mat3ra/ade";
import { workflowSubworkflowMapByApplication } from "@mat3ra/standata";
import { expect } from "chai";

import { createSubworkflowByName, Subworkflow } from "../../src/js/subworkflows";
import { AssignmentUnit, ConditionUnit } from "../../src/js/units";

const assignmentUnitData = {
    type: "assignment",
    application: { name: "espresso", version: "6.3" },
};

const conditionUnitData = {
    type: "condition",
    application: { name: "espresso", version: "6.3" },
};

describe("subworkflows", () => {
    let subworkflow;

    beforeEach(() => {
        subworkflow = createSubworkflowByName({
            appName: "espresso",
            swfName: "total_energy",
            workflowSubworkflowMapByApplication,
        });
    });

    it("have updateContext function", () => {
        expect(typeof subworkflow.updateContext).to.be.equal("function");
    });
    it("can update context", () => {
        const newContext = { testKey: "testValue" };
        subworkflow.updateContext(newContext);
        expect(subworkflow.context).to.include(newContext);
    });
    it("add unit to list end", () => {
        expect(subworkflow.units.length).to.be.equal(1);
        expect(subworkflow.units[0]._json.type).to.be.equal("execution");

        const assignementUnit = new AssignmentUnit(assignmentUnitData);
        subworkflow.addUnit(assignementUnit, -1);

        expect(subworkflow.units.length).to.be.equal(2);
        expect(subworkflow.units[0]._json.type).to.be.equal("execution");
        expect(subworkflow.units[1]._json.type).to.be.equal("assignment");
    });
    it("add unit to list head", () => {
        expect(subworkflow.units.length).to.be.equal(1);
        expect(subworkflow.units[0]._json.type).to.be.equal("execution");

        const assignementUnit = new AssignmentUnit(assignmentUnitData);
        subworkflow.addUnit(assignementUnit, 0);

        expect(subworkflow.units.length).to.be.equal(2);
        expect(subworkflow.units[0]._json.type).to.be.equal("assignment");
        expect(subworkflow.units[1]._json.type).to.be.equal("execution");
    });
    it("add unit in the middle list of two", () => {
        expect(subworkflow.units.length).to.be.equal(1);
        expect(subworkflow.units[0]._json.type).to.be.equal("execution");

        const assignementUnit = new AssignmentUnit(assignmentUnitData);
        const conditionUnit = new ConditionUnit(conditionUnitData);
        subworkflow.addUnit(assignementUnit, -1);

        expect(subworkflow.units.length).to.be.equal(2);
        expect(subworkflow.units[0]._json.type).to.be.equal("execution");
        expect(subworkflow.units[1]._json.type).to.be.equal("assignment");

        subworkflow.addUnit(conditionUnit, 1);

        expect(subworkflow.units.length).to.be.equal(3);
        expect(subworkflow.units[0]._json.type).to.be.equal("execution");
        expect(subworkflow.units[1]._json.type).to.be.equal("condition");
        expect(subworkflow.units[2]._json.type).to.be.equal("assignment");
    });
    it("can update application", () => {
        const assignementUnit = new AssignmentUnit(assignmentUnitData);
        subworkflow.addUnit(assignementUnit, -1);

        expect(subworkflow.units.length).to.be.equal(2);
        expect(subworkflow.units[0]._json.type).to.be.equal("execution");
        expect(subworkflow.units[1]._json.type).to.be.equal("assignment");
        expect(subworkflow.units[0].application.version).to.be.equal("6.3");
        expect(subworkflow.units[1].application?.version).to.be.equal(undefined);

        const newApplication = ApplicationRegistry.createApplication({
            name: "espresso",
            version: "6.7.0",
        });

        expect(newApplication.version).to.be.equal("6.7.0");

        subworkflow.setApplication(newApplication);

        expect(subworkflow.application.version).to.be.equal("6.7.0");
        expect(subworkflow.units[0].application?.version).to.be.equal("6.7.0");
        expect(subworkflow.units[1].application?.version).to.be.equal(undefined);
    });
});

describe("subworkflow UUIDs", () => {
    afterEach(() => {
        Subworkflow.usePredefinedIds = false;
    });

    it("subworkflow UUIDs are kept if predefined", () => {
        Subworkflow.usePredefinedIds = true;

        const subworkflow1 = createSubworkflowByName({
            appName: "espresso",
            swfName: "total_energy",
            workflowSubworkflowMapByApplication,
            subworkflowCls: Subworkflow,
        });

        const subworkflow2 = createSubworkflowByName({
            appName: "espresso",
            swfName: "total_energy",
            workflowSubworkflowMapByApplication,
            subworkflowCls: Subworkflow,
        });

        expect(subworkflow1._id).to.not.be.equal("");
        expect(subworkflow1._id).to.equal(subworkflow2._id);
    });
});
