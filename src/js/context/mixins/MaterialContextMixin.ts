import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { Material } from "@mat3ra/made/dist/js/material";

import { globalSettings } from "../providers/settings";

type Entity = InMemoryEntity & {
    isEditedIsSetToFalseOnMaterialUpdate: boolean;
};

export type MaterialContextMixin = {
    readonly isMaterialCreatedDefault: boolean;
    readonly isMaterialUpdated: boolean;
    readonly material: Material;
    isEdited: boolean;
    extraData?: { materialHash: string };
    initMaterialContextMixin(): void;
    updateMaterialHash(): void;
};

type PrivateProperties = {
    _material?: Material;
};

export function materialContextMixin(item: Entity) {
    // @ts-expect-error
    const properties: Entity & MaterialContextMixin & PrivateProperties = {
        _material: undefined,

        isEdited: false,

        updateMaterialHash() {
            if (this.isEditedIsSetToFalseOnMaterialUpdate) this.isEdited = false;
            this.extraData = { materialHash: this.material.hash };
        },

        // Workaround: Material.createDefault() used to initiate workflow reducer and hence here too
        //  does not have an id. Here we catch when such material is used and avoid resetting isEdited
        get isMaterialCreatedDefault() {
            return !this.material.id;
        },

        get isMaterialUpdated() {
            return Boolean(this.extraData && this.extraData.materialHash !== this.material.hash);
        },

        get material() {
            if (!this._material) {
                throw new Error("Material is not set");
            }
            return this._material;
        },

        initMaterialContextMixin() {
            this._material = this.config.context && this.config.context.material;

            if (!this._material) {
                this._material = globalSettings.Material.createDefault() as Material;
            }

            this.updateMaterialHash();
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
