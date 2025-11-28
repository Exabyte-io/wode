"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MLTrainTestSplitContextProvider = void 0;
const ade_1 = require("@mat3ra/ade");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const ApplicationContextMixin_1 = require("../mixins/ApplicationContextMixin");
class MLTrainTestSplitContextProvider extends ade_1.ContextProvider {
    constructor(config) {
        super(config);
        this.jsonSchemaId = "context-providers-directory/ml-train-test-split-context-provider";
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
            fraction_held_as_test_set: 0.2,
        };
    }
    get jsonSchemaPatchConfig() {
        return {
            fraction_held_as_test_set: { default: this.defaultData.fraction_held_as_test_set },
        };
    }
    get jsonSchema() {
        return JSONSchemasInterface_1.default.getPatchedSchemaById(this.jsonSchemaId, this.jsonSchemaPatchConfig);
    }
}
exports.MLTrainTestSplitContextProvider = MLTrainTestSplitContextProvider;
(0, ApplicationContextMixin_1.applicationContextMixin)(MLTrainTestSplitContextProvider.prototype);
