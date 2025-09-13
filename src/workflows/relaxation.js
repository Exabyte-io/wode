import { WorkflowStandata } from "@mat3ra/standata";

// eslint-disable-next-line no-unused-vars
import { createSubworkflowByName } from "../subworkflows";

export const RelaxationLogicMixin = (superclass) =>
    class extends superclass {
        get relaxationSubworkflow() {
            const appName = this.subworkflows[0]?.application?.name;
            if (!appName) return undefined;
            const relaxationWorkflow = new WorkflowStandata().findEntitiesByTags(
                "relaxation",
                appName,
            )[0];
            return relaxationWorkflow?.subworkflows[0];
        }

        isRelaxationSubworkflow(subworkflow) {
            const { relaxationSubworkflow } = this;
            return relaxationSubworkflow?.systemName === subworkflow.systemName;
        }

        get hasRelaxation() {
            return this.subworkflows.some((subworkflow) =>
                this.isRelaxationSubworkflow(subworkflow),
            );
        }

        toggleRelaxation() {
            if (this.hasRelaxation) {
                const relaxSubworkflow = this.subworkflows.find((sw) =>
                    this.isRelaxationSubworkflow(sw),
                );
                this.removeSubworkflow(relaxSubworkflow.id);
            } else {
                const vcRelax = this.relaxationSubworkflow;
                if (vcRelax) {
                    this.addSubworkflow(vcRelax, true);
                }
            }
        }
    };
