import type { ContextItem } from "../base/ContextProvider";
import PointsPathFormDataProvider, { type PointsPathFormDataProviderData, type PointsPathFormDataProviderExternalContext } from "./PointsPathFormDataProvider";
type Name = "kpath";
export type KPathFormDataManagerContextItem = ContextItem<PointsPathFormDataProviderData>;
export type KPathFormDataManagerExternalContext = PointsPathFormDataProviderExternalContext;
export default class KPathFormDataManager extends PointsPathFormDataProvider<Name> {
    readonly name: "kpath";
}
export {};
