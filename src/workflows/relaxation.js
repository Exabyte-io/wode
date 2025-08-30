// eslint-disable-next-line no-unused-vars
import { createSubworkflowByName } from "../subworkflows";

export const RelaxationLogicMixin = (superclass) =>
    class extends superclass {
        static setRelaxationSubworkflows(mapping) {
            this._allRelaxationSubworkflows = mapping;
        }

        get _allRelaxationSubworkflows() {
            return this.constructor._allRelaxationSubworkflows || {};
        }

        get relaxationSubworkflow() {
            // deciding on the application based on the first subworkflow
            const firstSubworkflow = this.subworkflows[0];
            const mapping = this._allRelaxationSubworkflows || {};
            const appName =
                firstSubworkflow && firstSubworkflow.application
                    ? firstSubworkflow.application.name
                    : undefined;
            return appName ? mapping[appName] : undefined;
        }

        isRelaxationSubworkflow(subworkflow) {
            const mapping = this._allRelaxationSubworkflows || {};
            return Object.values(mapping)
                .map((sw) => sw.systemName)
                .includes(subworkflow.systemName);
        }

        get hasRelaxation() {
            return Boolean(
                this.subworkflows.find((subworkflow) => {
                    return this.isRelaxationSubworkflow(subworkflow);
                }),
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
                this.addSubworkflow(vcRelax, true);
            }
        }
    };
