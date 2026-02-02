import PointsGridFormDataProvider from "./PointsGridFormDataProvider";

type Name = "igrid";

export default class IGridFormDataManager extends PointsGridFormDataProvider<Name> {
    readonly name = "igrid" as const;

    readonly divisor = 0.2 as const;
}
