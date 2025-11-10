import { Application } from "@mat3ra/ade";
import { expect } from "chai";

import { createUnit } from "../../src/js/subworkflows/create";
import { AssignmentUnit, BaseUnit, ExecutionUnit } from "../../src/js/units";
import { builders } from "../../src/js/units/builders";
import { UnitFactory } from "../../src/js/units/factory";
import { createWorkflows } from "../../src/js/workflows";

describe("units", () => {
    it("can be cloned with new flowchartId", () => {
        const workflows = createWorkflows({});
        const exampleWorkflow = workflows[0];
        const exampleSubworkflow = exampleWorkflow.subworkflows[0];
        const exampleUnit = exampleSubworkflow.units[0];
        const exampleUnitClone = exampleUnit.clone();
        // eslint-disable-next-line no-unused-expressions
        expect(exampleUnitClone).to.exist;
        expect(exampleUnit.flowchartId).to.not.equal(exampleUnitClone.flowchartId);
    });

    it("can create execution unit", () => {
        const unit = createUnit({
            config: {
                type: "executionBuilder",
                config: {
                    name: "test",
                    execName: "pw.x",
                    flavorName: "pw_scf",
                    flowchartId: "test",
                },
            },
            application: new Application({ name: "espresso" }),
            unitBuilders: builders,
            unitFactoryCls: UnitFactory,
        });

        const expectedResults = [
            { name: "atomic_forces" },
            { name: "fermi_energy" },
            { name: "pressure" },
            { name: "stress_tensor" },
            { name: "total_energy" },
            { name: "total_energy_contributions" },
            { name: "total_force" },
        ];

        expect(unit.flavor.results).to.deep.equal(expectedResults);
        expect(unit.results).to.deep.equal(expectedResults);
    });
});

describe("unit UUIDs", () => {
    afterEach(() => {
        // Reset all usePredefinedIds after each test
        BaseUnit.usePredefinedIds = false;
        ExecutionUnit.usePredefinedIds = false;
        AssignmentUnit.usePredefinedIds = false;
        builders.UnitConfigBuilder.usePredefinedIds = false;
    });

    it("unit flowchartIds are kept if predefined", () => {
        BaseUnit.usePredefinedIds = true;
        ExecutionUnit.usePredefinedIds = true;
        AssignmentUnit.usePredefinedIds = true;

        const createTestUnit = (type, name) =>
            UnitFactory.create({
                type,
                name,
                application: { name: "espresso" },
            });

        // Test ExecutionUnit flowchartId
        const execUnit1 = createTestUnit("execution", "test-execution");
        const execUnit2 = createTestUnit("execution", "test-execution");
        expect(execUnit1.flowchartId).to.equal(execUnit2.flowchartId);

        // Test AssignmentUnit flowchartId
        const assignUnit1 = createTestUnit("assignment", "test-assignment");
        const assignUnit2 = createTestUnit("assignment", "test-assignment");
        expect(assignUnit1.flowchartId).to.equal(assignUnit2.flowchartId);

        // Different unit types should have different flowchartIds
        expect(execUnit1.flowchartId).to.not.equal(assignUnit1.flowchartId);
    });

    it("unit flowchartIds are different when usePredefinedIds is false", () => {
        const execUnit1 = UnitFactory.create({
            type: "execution",
            name: "test-execution",
            application: { name: "espresso" },
        });

        const execUnit2 = UnitFactory.create({
            type: "execution",
            name: "test-execution",
            application: { name: "espresso" },
        });

        expect(execUnit1.flowchartId).to.not.equal(execUnit2.flowchartId);
    });

    it("unit builders generate deterministic flowchartIds when usePredefinedIds is true", () => {
        builders.UnitConfigBuilder.usePredefinedIds = true;

        const builder1 = new builders.UnitConfigBuilder({
            name: "test-builder",
            type: "execution",
        });

        const builder2 = new builders.UnitConfigBuilder({
            name: "test-builder",
            type: "execution",
        });

        expect(builder1._flowchartId).to.equal(builder2._flowchartId);
    });
});
