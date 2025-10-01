"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.applicationContextMixin = applicationContextMixin;
var _settings = require("../providers/settings");
function applicationContextMixin(item) {
    const properties = {
        _application: undefined,
        initApplicationContextMixin() {
            this._application =
                (this.config.context && this.config.context.application) ||
                _settings.globalSettings.Application.createDefault();
        },
        get application() {
            return this._application;
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
