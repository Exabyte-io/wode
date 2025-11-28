import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { Material } from "@mat3ra/made/dist/js/material";
type Entity = InMemoryEntity & {
    isEditedIsSetToFalseOnMaterialUpdate: boolean;
};
export type MaterialContextMixin = {
    readonly isMaterialCreatedDefault: boolean;
    readonly isMaterialUpdated: boolean;
    readonly material: Material;
    isEdited: boolean;
    extraData?: {
        materialHash: string;
    };
    initMaterialContextMixin(): void;
    updateMaterialHash(): void;
};
export declare function materialContextMixin(item: Entity): void;
export {};
