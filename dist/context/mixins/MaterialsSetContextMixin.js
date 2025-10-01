"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.materialsSetContextMixin = materialsSetContextMixin;
var _utils = require("@mat3ra/code/dist/js/entity/set/ordered/utils");
function materialsSetContextMixin(item) {
    const properties = {
        _materialsSet: undefined,
        get materialsSet() {
            return this._materialsSet;
        },
        initMaterialsSetContextMixin() {
            this._materialsSet = this.config.context?.materialsSet;
        },
        sortMaterialsByIndexInSet(materials = []) {
            // DO NOT SORT IN PLACE AS IT CHANGES THE ORDER IN `this.materials` AND HAS SIDE EFFECTS (MaterialViewer).
            return materials.concat().sort((a, b) => {
                return (0, _utils.compareEntitiesInOrderedSetForSorting)(
                    a,
                    b,
                    this.materialsSet._id,
                    false,
                );
            });
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
