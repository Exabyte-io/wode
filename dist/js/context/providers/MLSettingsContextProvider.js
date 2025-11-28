"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MLSettingsContextProvider = void 0;
const ade_1 = require("@mat3ra/ade");
const ApplicationContextMixin_1 = require("../mixins/ApplicationContextMixin");
class MLSettingsContextProvider extends ade_1.ContextProvider {
    constructor(config) {
        super(config);
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
    get jsonSchema() {
        return {
            $schema: "http://json-schema.org/draft-07/schema#",
            title: " ",
            description: "Settings important to machine learning runs.",
            type: "object",
            properties: {
                target_column_name: {
                    type: "string",
                    default: this.defaultData.target_column_name,
                },
                problem_category: {
                    type: "string",
                    default: this.defaultData.problem_category,
                    enum: ["regression", "classification", "clustering"],
                },
            },
        };
    }
}
exports.MLSettingsContextProvider = MLSettingsContextProvider;
(0, ApplicationContextMixin_1.applicationContextMixin)(MLSettingsContextProvider.prototype);
