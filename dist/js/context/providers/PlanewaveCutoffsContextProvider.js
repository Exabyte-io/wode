"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanewaveCutoffsContextProvider = void 0;
const ade_1 = require("@mat3ra/ade");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const ApplicationContextMixin_1 = require("../mixins/ApplicationContextMixin");
const cutoffConfig = {
    vasp: {}, // assuming default cutoffs for VASP
    espresso: {
        // assuming the default GBRV set of pseudopotentials is used
        wavefunction: 40,
        density: 200,
    },
};
class PlanewaveCutoffsContextProvider extends ade_1.ContextProvider {
    constructor(config) {
        super(config);
        this.jsonSchemaId = "context-providers-directory/planewave-cutoffs-context-provider";
        this.initApplicationContextMixin();
    }
    // eslint-disable-next-line class-methods-use-this
    get uiSchema() {
        return {
            wavefunction: {},
            density: {},
        };
    }
    get defaultData() {
        return {
            wavefunction: this.defaultECUTWFC,
            density: this.defaultECUTRHO,
        };
    }
    get jsonSchemaPatchConfig() {
        return {
            wavefunction: { default: this.defaultData.wavefunction },
            density: { default: this.defaultData.density },
        };
    }
    get _cutoffConfigPerApplication() {
        return cutoffConfig[this.application.name];
    }
    get defaultECUTWFC() {
        return this._cutoffConfigPerApplication.wavefunction || null;
    }
    get defaultECUTRHO() {
        return this._cutoffConfigPerApplication.density || null;
    }
    get jsonSchema() {
        return JSONSchemasInterface_1.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
    }
}
exports.PlanewaveCutoffsContextProvider = PlanewaveCutoffsContextProvider;
(0, ApplicationContextMixin_1.applicationContextMixin)(PlanewaveCutoffsContextProvider.prototype);
