"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationContextMixin = applicationContextMixin;
const settings_1 = require("../providers/settings");
function applicationContextMixin(item) {
    const properties = {
        _application: undefined,
        initApplicationContextMixin() {
            this._application =
                (this.config.context && this.config.context.application) ||
                    settings_1.globalSettings.Application.createDefault();
        },
        get application() {
            return this._application;
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
