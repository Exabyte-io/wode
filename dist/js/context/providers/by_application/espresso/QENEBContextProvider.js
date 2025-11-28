"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const JobContextMixin_1 = require("../../../mixins/JobContextMixin");
const MaterialContextMixin_1 = require("../../../mixins/MaterialContextMixin");
const MaterialsContextMixin_1 = require("../../../mixins/MaterialsContextMixin");
const MaterialsSetContextMixin_1 = require("../../../mixins/MaterialsSetContextMixin");
const MethodDataContextMixin_1 = require("../../../mixins/MethodDataContextMixin");
const WorkflowContextMixin_1 = require("../../../mixins/WorkflowContextMixin");
const ExecutableContextProvider_1 = __importDefault(require("../ExecutableContextProvider"));
const QEPWXContextProvider_1 = __importDefault(require("./QEPWXContextProvider"));
class QENEBContextProvider extends ExecutableContextProvider_1.default {
    constructor(config) {
        super(config);
        this.jsonSchemaId = "context-providers-directory/by-application/qe-neb-context-provider";
        this._material = undefined;
        this._materials = [];
        this._materialsSet = undefined;
        this.initJobContextMixin();
        this.initMaterialsContextMixin();
        this.initMethodDataContextMixin();
        this.initWorkflowContextMixin();
        this.initMaterialContextMixin();
        this.initMaterialsSetContextMixin();
    }
    getData() {
        const sortedMaterials = this.sortMaterialsByIndexInSet(this.materials);
        const PWXContexts = sortedMaterials.map((material) => {
            const context = { ...this.config.context, material };
            const config = { ...this.config, context };
            return new QEPWXContextProvider_1.default(config).getData();
        });
        return {
            ...lodash_1.default.omit(PWXContexts[0], [
                "ATOMIC_POSITIONS",
                "ATOMIC_POSITIONS_WITHOUT_CONSTRAINTS",
            ]),
            FIRST_IMAGE: PWXContexts[0].ATOMIC_POSITIONS,
            LAST_IMAGE: PWXContexts[PWXContexts.length - 1].ATOMIC_POSITIONS,
            INTERMEDIATE_IMAGES: PWXContexts.slice(1, PWXContexts.length - 1).map((data) => data.ATOMIC_POSITIONS),
        };
    }
}
exports.default = QENEBContextProvider;
(0, MaterialContextMixin_1.materialContextMixin)(QENEBContextProvider.prototype);
(0, MaterialsContextMixin_1.materialsContextMixin)(QENEBContextProvider.prototype);
(0, MethodDataContextMixin_1.methodDataContextMixin)(QENEBContextProvider.prototype);
(0, WorkflowContextMixin_1.workflowContextMixin)(QENEBContextProvider.prototype);
(0, JobContextMixin_1.jobContextMixin)(QENEBContextProvider.prototype);
(0, MaterialsSetContextMixin_1.materialsSetContextMixin)(QENEBContextProvider.prototype);
