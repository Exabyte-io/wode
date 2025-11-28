"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEBFormDataProvider = void 0;
const ade_1 = require("@mat3ra/ade");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
class NEBFormDataProvider extends ade_1.JSONSchemaFormDataProvider {
    constructor() {
        super(...arguments);
        this.jsonSchemaId = "context-providers-directory/neb-data-provider";
    }
    // eslint-disable-next-line class-methods-use-this
    get defaultData() {
        return {
            nImages: 1,
        };
    }
    get jsonSchemaPatchConfig() {
        return {
            nImages: { default: this.defaultData.nImages },
        };
    }
    // eslint-disable-next-line class-methods-use-this
    get uiSchema() {
        return {
            nImages: {},
        };
    }
    get jsonSchema() {
        return JSONSchemasInterface_1.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
    }
}
exports.NEBFormDataProvider = NEBFormDataProvider;
