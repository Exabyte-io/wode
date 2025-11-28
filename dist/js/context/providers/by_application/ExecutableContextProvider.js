"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ade_1 = require("@mat3ra/ade");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
class ExecutableContextProvider extends ade_1.ContextProvider {
    constructor(config) {
        super({
            ...config,
            domain: "executable",
        });
        this.jsonSchemaId = "context-provider";
    }
    get jsonSchema() {
        return JSONSchemasInterface_1.default.getSchemaById(this.jsonSchemaId);
    }
}
exports.default = ExecutableContextProvider;
