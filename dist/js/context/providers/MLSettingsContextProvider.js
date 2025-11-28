"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MLSettingsContextProvider = void 0;
const ade_1 = require("@mat3ra/ade");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const ApplicationContextMixin_1 = require("../mixins/ApplicationContextMixin");
class MLSettingsContextProvider extends ade_1.ContextProvider {
    constructor(config) {
        super(config);
        this.jsonSchemaId = "context-providers-directory/ml-settings-context-provider";
        this.initApplicationContextMixin();
    }
    // eslint-disable-next-line class-methods-use-this
    get uiSchema() {
        return {
            target_column_name: {},
            problem_category: {},
        };
    }
    // eslint-disable-next-line class-methods-use-this
    get defaultData() {
        return {
            target_column_name: "target",
            problem_category: "regression",
        };
    }
    get jsonSchemaPatchConfig() {
        return {
            target_column_name: { default: this.defaultData.target_column_name },
            problem_category: { default: this.defaultData.problem_category },
        };
    }
    get jsonSchema() {
        return JSONSchemasInterface_1.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
    }
}
exports.MLSettingsContextProvider = MLSettingsContextProvider;
(0, ApplicationContextMixin_1.applicationContextMixin)(MLSettingsContextProvider.prototype);
