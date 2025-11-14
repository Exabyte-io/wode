"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ContextProvider = _interopRequireDefault(require("@mat3ra/ade/dist/js/context/ContextProvider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ExecutableContextProvider extends _ContextProvider.default {
  constructor(config) {
    super({
      ...config,
      domain: "executable"
    });
  }
}
exports.default = ExecutableContextProvider;