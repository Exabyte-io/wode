import { SubworkflowStandata } from "@mat3ra/standata";

export const RelaxationLogicMixin = (superclass) =>
    class extends superclass {
        get relaxationSubworkflow() {
            const appName = this.subworkflows[0]?.application?.name;
            if (!appName) return undefined;
            const subworkflowStandata = new SubworkflowStandata();
            const relaxationSubworkflow =
                subworkflowStandata.getRelaxationSubworkflowByApplication(appName);
            if (!relaxationSubworkflow) return undefined;
            return new this._Subworkflow(relaxationSubworkflow);
        }

        isRelaxationSubworkflow(subworkflow) {
            const { relaxationSubworkflow } = this;
            return (
                relaxationSubworkflow?.systemName !== undefined &&
                relaxationSubworkflow.systemName === subworkflow.systemName
            );
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
