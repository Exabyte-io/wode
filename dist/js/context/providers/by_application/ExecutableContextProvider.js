"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ade_1 = require("@mat3ra/ade");
class ExecutableContextProvider extends ade_1.ContextProvider {
    constructor(config) {
        super({
            ...config,
            domain: "executable",
        });
    }
}
exports.default = ExecutableContextProvider;
