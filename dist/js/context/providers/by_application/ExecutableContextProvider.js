"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ade = require("@mat3ra/ade");
class ExecutableContextProvider extends _ade.ContextProvider {
  constructor(config) {
    super({
      ...config,
      domain: "executable"
    });
  }
}
exports.default = ExecutableContextProvider;