import type { GridContextItemSchema } from "@mat3ra/esse/dist/js/types";

import type { UnitContext } from "../base/ContextProvider";
import PointsGridFormDataProvider, { type ExternalContext } from "./PointsGridFormDataProvider";

type Name = "qgrid";
type Schema = GridContextItemSchema;

export default class QGridFormDataManager extends PointsGridFormDataProvider<Name> {
    readonly name = "qgrid" as const;

    readonly divisor = 5 as const;

    static createFromUnitContext(unitContext: UnitContext, externalContext: ExternalContext) {
        const contextItem = this.findContextItem<Schema>(unitContext, "qgrid");

        return new QGridFormDataManager(contextItem, externalContext);
    }
}
