import ConvergenceParameter from "../../../convergence/ConvergenceParameter";
import type { UnitContext } from "../base/ContextProvider";
import PointsGridFormDataProvider, { type ExternalContext } from "./PointsGridFormDataProvider";
type Name = "kgrid";
export default class KGridFormDataManager extends PointsGridFormDataProvider<Name> {
    readonly name: "kgrid";
    readonly divisor: 1;
    static createFromUnitContext(unitContext: UnitContext, externalContext: ExternalContext): KGridFormDataManager;
    applyConvergenceParameter(parameter: ConvergenceParameter): void;
}
export {};
