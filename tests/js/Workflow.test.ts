import { expect } from "chai";

import { Subworkflow, Workflow } from "../../src/js";
import { UnitType } from "../../src/js/enums";

describe("Workflow", () => {
    describe("construction", () => {
        it("creates workflow from default config with name, subworkflows, units, and _id", () => {
            const config = { ...Workflow.defaultConfig };
            const workflow = new Workflow(config);

            expect(workflow.name).to.equal(Workflow.defaultConfig.name);
            expect(workflow.toJSON().subworkflows).to.have.lengthOf(
                Workflow.defaultConfig.subworkflows.length,
            );
            expect(workflow.toJSON().units).to.have.lengthOf(Workflow.defaultConfig.units.length);
            expect(workflow._id).to.be.a("string");
            expect(workflow._id.length).to.be.above(0);
        });
    });

    describe("ID generation", () => {
        it("assigns different _id to two workflows from default config", () => {
            const w1 = new Workflow({ ...Workflow.defaultConfig });
            const w2 = new Workflow({ ...Workflow.defaultConfig });

            expect(w1._id).to.not.equal(w2._id);
        });
    });

    describe("usePredefinedIds", () => {
        afterEach(() => {
            Workflow.usePredefinedIds = false;
        });

        it("throws when usePredefinedIds is true and config has no applicationName", () => {
            Workflow.usePredefinedIds = true;
            const config = { ...Workflow.defaultConfig };
            delete (config as { applicationName?: string }).applicationName;

            expect(() => new Workflow(config)).to.throw(
                "applicationName is required when usePredefinedIds is true",
            );
        });
    });

    describe("fromSubworkflow", () => {
        it("creates workflow with one subworkflow and one unit matching subworkflow name", () => {
            const subworkflowConfig = Workflow.defaultConfig.subworkflows[0];
            const subworkflow = new Subworkflow(subworkflowConfig);
            const workflow = Workflow.fromSubworkflow(subworkflow);

            expect(workflow.toJSON().subworkflows).to.have.lengthOf(1);
            expect(workflow.toJSON().units).to.have.lengthOf(1);
            expect(workflow.name).to.equal(subworkflow.name);
        });
    });

    describe("toJSON", () => {
        it("returns object with name, units, subworkflows, and workflows", () => {
            const config = { ...Workflow.defaultConfig };
            const workflow = new Workflow(config);
            const json = workflow.toJSON();

            expect(json).to.have.property("name", workflow.name);
            expect(json).to.have.property("units").that.is.an("array");
            expect(json).to.have.property("subworkflows").that.is.an("array");
            expect(json).to.have.property("workflows").that.is.an("array");
        });
    });

    describe("getters", () => {
        it("exposes usedApplications, usedApplicationNames, properties, systemName, defaultDescription", () => {
            const config = { ...Workflow.defaultConfig };
            const workflow = new Workflow(config);

            expect(workflow.usedApplications).to.be.an("array");
            expect(workflow.usedApplicationNames).to.be.an("array");
            expect(workflow.properties).to.be.an("array");
            expect(workflow.systemName).to.be.a("string");
            expect(workflow.systemName.length).to.be.above(0);
            expect(workflow.defaultDescription).to.be.a("string");
            expect(workflow.defaultDescription.length).to.be.above(0);
        });
    });

    describe("addSubworkflow / removeSubworkflow", () => {
        it("adds subworkflows then removes one and updates counts", () => {
            const defaultSub = Workflow.defaultConfig.subworkflows[0];
            const defaultUnit = Workflow.defaultConfig.units[0];
            const config = {
                ...Workflow.defaultConfig,
                subworkflows: [
                    defaultSub,
                    { ...defaultSub, _id: "second-sw-id", name: "Second Subworkflow" },
                ],
                units: [
                    defaultUnit,
                    {
                        ...defaultUnit,
                        _id: "second-sw-id",
                        flowchartId: "second-fc-id",
                        name: "Second Subworkflow",
                    },
                ],
            };
            const workflow = new Workflow(config);
            const secondSubworkflow = new Subworkflow(config.subworkflows[1]);
            const thirdSubworkflow = new Subworkflow({
                ...defaultSub,
                _id: "third-sw-id",
                name: "Third Subworkflow",
            });
            workflow.addSubworkflow(thirdSubworkflow);

            expect(workflow.toJSON().subworkflows).to.have.lengthOf(3);
            expect(workflow.toJSON().units).to.have.lengthOf(3);

            workflow.removeSubworkflow(secondSubworkflow.id);

            expect(workflow.toJSON().subworkflows).to.have.lengthOf(2);
            expect(workflow.toJSON().units).to.have.lengthOf(2);
        });
    });

    describe("addUnitType", () => {
        it("adds a subworkflow unit when called with UnitType.subworkflow", () => {
            const config = { ...Workflow.defaultConfig };
            const workflow = new Workflow(config);
            const initialSubworkflows = workflow.toJSON().subworkflows.length;
            const initialUnits = workflow.toJSON().units.length;

            workflow.addUnitType(UnitType.subworkflow);

            expect(workflow.toJSON().subworkflows).to.have.lengthOf(initialSubworkflows + 1);
            expect(workflow.toJSON().units).to.have.lengthOf(initialUnits + 1);
        });
    });

    describe("calculateHash", () => {
        it("returns a non-empty string", () => {
            const config = { ...Workflow.defaultConfig };
            const workflow = new Workflow(config);

            const hash = workflow.calculateHash();

            expect(hash).to.be.a("string");
            expect(hash.length).to.be.above(0);
        });

        it("returns the same hash for the same workflow", () => {
            const w1 = new Workflow({ ...Workflow.defaultConfig });
            const w2 = new Workflow({ ...Workflow.defaultConfig });

            expect(w1.calculateHash()).to.equal(w2.calculateHash());
        });

        it("returns different hash when workflow content differs", () => {
            const w1 = new Workflow({ ...Workflow.defaultConfig });
            const w2 = new Workflow({ ...Workflow.defaultConfig });
            w2.addUnitType(UnitType.subworkflow);

            expect(w1.calculateHash()).to.not.equal(w2.calculateHash());
        });
    });
});
