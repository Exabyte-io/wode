import PointsGridFormDataProvider from "./PointsGridFormDataProvider";
type Name = "qgrid";
export default class QGridFormDataManager extends PointsGridFormDataProvider<Name> {
    readonly name: "qgrid";
    readonly divisor: 5;
}
export {};
