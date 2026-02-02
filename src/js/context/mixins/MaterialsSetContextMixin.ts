import { compareEntitiesInOrderedSetForSorting } from "@mat3ra/code/dist/js/entity/set/ordered/utils";

import type ContextProvider from "../providers/base/ContextProvider";
import type { OrderedMaterial } from "./MaterialContextMixin";

type MaterialsSet = {
    _id: string;
};

export type MaterialsSetExternalContext = {
    materialsSet: MaterialsSet;
};

export type MaterialsSetContextMixin = {
    materialsSet: MaterialsSet;
    initMaterialsSetContextMixin(externalContext: MaterialsSetExternalContext): void;
    sortMaterialsByIndexInSet(materials?: OrderedMaterial[]): OrderedMaterial[];
};

export default function materialsSetContextMixin(item: ContextProvider) {
    // @ts-expect-error
    const properties: MaterialsSetContextProvider & MaterialsSetContextMixin = {
        initMaterialsSetContextMixin(externalContext: MaterialsSetExternalContext) {
            this.materialsSet = externalContext.materialsSet;
        },

        sortMaterialsByIndexInSet(materials: OrderedMaterial[] = []) {
            // DO NOT SORT IN PLACE AS IT CHANGES THE ORDER IN `this.materials` AND HAS SIDE EFFECTS (MaterialViewer).
            return materials.concat().sort((a, b) => {
                return compareEntitiesInOrderedSetForSorting(a, b, this.materialsSet._id, false);
            });
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
