"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.materialsContextMixin = materialsContextMixin;
var _settings = require("../providers/settings");
function materialsContextMixin(item) {
  const properties = {
    get materials() {
      return this._materials;
    },
    initMaterialsContextMixin() {
      const materials = this.config.context?.materials;
      this._materials = materials && materials.length ? materials : [_settings.globalSettings.Material.createDefault()];
    }
  };
  Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}