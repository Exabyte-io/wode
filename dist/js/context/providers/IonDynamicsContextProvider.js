"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IonDynamicsContextProvider = void 0;
const ade_1 = require("@mat3ra/ade");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const defaultMDConfig = {
    numberOfSteps: 100,
    timeStep: 5.0,
    electronMass: 100.0,
    temperature: 300.0,
};
class IonDynamicsContextProvider extends ade_1.JSONSchemaFormDataProvider {
    constructor() {
        super(...arguments);
        this.jsonSchemaId = "context-providers-directory/ion-dynamics-context-provider";
    }
    // eslint-disable-next-line class-methods-use-this
    get defaultData() {
        return defaultMDConfig;
    }
    get jsonSchemaPatchConfig() {
        return {
            numberOfSteps: { default: this.defaultData.numberOfSteps },
            timeStep: { default: this.defaultData.timeStep },
            electronMass: { default: this.defaultData.electronMass },
            temperature: { default: this.defaultData.temperature },
        };
    }
    // eslint-disable-next-line class-methods-use-this
    get uiSchema() {
        return {
            numberOfSteps: {},
            timeStep: {},
            electronMass: {},
            temperature: {},
        };
    }
    get jsonSchema() {
        return JSONSchemasInterface_1.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
    }
}
exports.IonDynamicsContextProvider = IonDynamicsContextProvider;
