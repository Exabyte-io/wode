import type { GridContextItemSchema } from "@mat3ra/esse/dist/js/types";

import type { UnitContext } from "../base/ContextProvider";
import PointsGridFormDataProvider, { type ExternalContext } from "./PointsGridFormDataProvider";

type Name = "igrid";
type Schema = GridContextItemSchema;

export default class IGridFormDataManager extends PointsGridFormDataProvider<Name> {
    readonly name = "igrid" as const;

    readonly divisor = 0.2 as const;

    static createFromUnitContext(unitContext: UnitContext, externalContext: ExternalContext) {
        const contextItem = this.findContextItem<Schema>(unitContext, "igrid");

        return new IGridFormDataManager(contextItem, externalContext);
    }
}
