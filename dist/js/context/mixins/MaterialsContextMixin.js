"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialsContextMixin = materialsContextMixin;
const settings_1 = require("../providers/settings");
function materialsContextMixin(item) {
    const properties = {
        get materials() {
            return this._materials;
        },
        initMaterialsContextMixin() {
            var _a;
            const materials = (_a = this.config.context) === null || _a === void 0 ? void 0 : _a.materials;
            this._materials =
                materials && materials.length
                    ? materials
                    : [settings_1.globalSettings.Material.createDefault()];
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
