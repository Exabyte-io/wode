"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobContextMixin_1 = require("../../../mixins/JobContextMixin");
const MaterialContextMixin_1 = require("../../../mixins/MaterialContextMixin");
const MaterialsContextMixin_1 = require("../../../mixins/MaterialsContextMixin");
const MethodDataContextMixin_1 = require("../../../mixins/MethodDataContextMixin");
const WorkflowContextMixin_1 = require("../../../mixins/WorkflowContextMixin");
const ExecutableContextProvider_1 = __importDefault(require("../ExecutableContextProvider"));
class VASPContextProvider extends ExecutableContextProvider_1.default {
    constructor(config) {
        super(config);
        this.jsonSchemaId = "context-providers-directory/by-application/vasp-context-provider";
        this._material = undefined;
        this._materials = [];
        this.initJobContextMixin();
        this.initMaterialsContextMixin();
        this.initMethodDataContextMixin();
        this.initWorkflowContextMixin();
        this.initMaterialContextMixin();
    }
    // eslint-disable-next-line class-methods-use-this
    buildVASPContext(material) {
        return {
            // TODO: figure out whether we need two separate POSCARS, maybe one is enough
            POSCAR: material.getAsPOSCAR(true, true),
            POSCAR_WITH_CONSTRAINTS: material.getAsPOSCAR(true),
        };
    }
    getDataPerMaterial() {
        if (!this.materials || this.materials.length <= 1)
            return {};
        return { perMaterial: this.materials.map((material) => this.buildVASPContext(material)) };
    }
    /*
     * @NOTE: Overriding getData makes this provider "stateless", ie. delivering data from scratch each time and not
     *        considering the content of `this.data`, and `this.isEdited` field(s).
     */
    getData() {
        // consider adjusting so that below values are read from PlanewaveDataManager
        // ECUTWFC;
        // ECUTRHO;
        return {
            ...this.buildVASPContext(this.material),
            ...this.getDataPerMaterial(),
        };
    }
}
exports.default = VASPContextProvider;
(0, MaterialContextMixin_1.materialContextMixin)(VASPContextProvider.prototype);
(0, MaterialsContextMixin_1.materialsContextMixin)(VASPContextProvider.prototype);
(0, MethodDataContextMixin_1.methodDataContextMixin)(VASPContextProvider.prototype);
(0, WorkflowContextMixin_1.workflowContextMixin)(VASPContextProvider.prototype);
(0, JobContextMixin_1.jobContextMixin)(VASPContextProvider.prototype);
