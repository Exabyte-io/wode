"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const ade_1 = require("@mat3ra/ade");
Object.defineProperty(exports, "Template", { enumerable: true, get: function () { return ade_1.Template; } });
const providers_1 = require("./context/providers");
// We patch the static providerRegistry here so that
// Template has all context providers available
// to it when creating workflows. It is then re-exported
// from WoDe for use downstream.
ade_1.Template.setContextProvidersConfig(providers_1.wodeProviders);
