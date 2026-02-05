import type { UnitContext } from "../base/ContextProvider";
import PointsGridFormDataProvider, { type ExternalContext } from "./PointsGridFormDataProvider";
type Name = "qgrid";
export default class QGridFormDataManager extends PointsGridFormDataProvider<Name> {
    readonly name: "qgrid";
    readonly divisor: 5;
    static createFromUnitContext(unitContext: UnitContext, externalContext: ExternalContext): QGridFormDataManager;
}
export {};
