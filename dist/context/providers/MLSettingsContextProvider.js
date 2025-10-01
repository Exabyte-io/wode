"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.MLSettingsContextProvider = void 0;
var _ContextProvider = _interopRequireDefault(
    require("@exabyte-io/ade.js/dist/js/context/ContextProvider"),
);
var _ApplicationContextMixin = require("../mixins/ApplicationContextMixin");
function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
}
class MLSettingsContextProvider extends _ContextProvider.default {
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
(0, _ApplicationContextMixin.applicationContextMixin)(MLSettingsContextProvider.prototype);
