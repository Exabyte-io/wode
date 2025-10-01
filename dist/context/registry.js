"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.ContextProviderRegistry = void 0;
var _ade = require("@exabyte-io/ade.js");
var _context = require("@mat3ra/code/dist/js/context");
var _providers = require("./providers");
const ContextProviderRegistry = (exports.ContextProviderRegistry = (0,
_context.extendAndPatchRegistry)(_ade.ContextProviderRegistry, _providers.wodeProviders));
