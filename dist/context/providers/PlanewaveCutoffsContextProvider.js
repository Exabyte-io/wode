"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.PlanewaveCutoffsContextProvider = void 0;
var _ContextProvider = _interopRequireDefault(
    require("@exabyte-io/ade.js/dist/js/context/ContextProvider"),
);
var _ApplicationContextMixin = require("../mixins/ApplicationContextMixin");
function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
}
const cutoffConfig = {
    vasp: {},
    // assuming default cutoffs for VASP
    espresso: {
        // assuming the default GBRV set of pseudopotentials is used
        wavefunction: 40,
        density: 200,
    },
};
class PlanewaveCutoffsContextProvider extends _ContextProvider.default {
    constructor(config) {
        super(config);
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
        return {
            $schema: "http://json-schema.org/draft-07/schema#",
            title: " ",
            description:
                "Planewave cutoff parameters for electronic wavefunctions and density. Units are specific to simulation engine.",
            type: "object",
            properties: {
                wavefunction: {
                    type: "number",
                    default: this.defaultECUTWFC,
                },
                density: {
                    type: "number",
                    default: this.defaultECUTRHO,
                },
            },
        };
    }
}
exports.PlanewaveCutoffsContextProvider = PlanewaveCutoffsContextProvider;
(0, _ApplicationContextMixin.applicationContextMixin)(PlanewaveCutoffsContextProvider.prototype);
