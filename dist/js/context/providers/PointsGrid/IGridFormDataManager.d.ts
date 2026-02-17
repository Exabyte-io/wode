import type { UnitContext } from "../base/ContextProvider";
import PointsGridFormDataProvider, { type ExternalContext } from "./PointsGridFormDataProvider";
type Name = "igrid";
export default class IGridFormDataManager extends PointsGridFormDataProvider<Name> {
    readonly name: "igrid";
    readonly divisor: 0.2;
    static createFromUnitContext(unitContext: UnitContext, externalContext: ExternalContext): IGridFormDataManager;
}
export {};
