"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Template", {
  enumerable: true,
  get: function () {
    return _ade.Template;
  }
});
var _ade = require("@mat3ra/ade");
var _providers = require("./context/providers");
// We patch the static providerRegistry here so that
// Template has all context providers available
// to it when creating workflows. It is then re-exported
// from WoDe for use downstream.

_ade.Template.setContextProvidersConfig(_providers.wodeProviders);