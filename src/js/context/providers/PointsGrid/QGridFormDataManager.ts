import PointsGridFormDataProvider from "./PointsGridFormDataProvider";

type Name = "qgrid";

export default class QGridFormDataManager extends PointsGridFormDataProvider<Name> {
    readonly name = "qgrid" as const;

    readonly divisor = 5 as const;
}
