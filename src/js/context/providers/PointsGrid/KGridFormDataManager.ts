import PointsGridFormDataProvider from "./PointsGridFormDataProvider";

type Name = "kgrid";

export default class KGridFormDataManager extends PointsGridFormDataProvider<Name> {
    readonly name = "kgrid" as const;

    readonly divisor = 1 as const;
}
