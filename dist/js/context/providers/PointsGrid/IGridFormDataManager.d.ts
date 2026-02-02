import PointsGridFormDataProvider from "./PointsGridFormDataProvider";
type Name = "igrid";
export default class IGridFormDataManager extends PointsGridFormDataProvider<Name> {
    readonly name: "igrid";
    readonly divisor: 0.2;
}
export {};
