import type { ContextItem } from "../base/ContextProvider";
import PointsPathFormDataProvider, { type PointsPathFormDataProviderData, type PointsPathFormDataProviderExternalContext } from "./PointsPathFormDataProvider";
type Name = "explicitKPath";
export type ExplicitKPathFormDataManagerContextItem = ContextItem<PointsPathFormDataProviderData>;
export type ExplicitKPathFormDataManagerExternalContext = PointsPathFormDataProviderExternalContext;
export default class ExplicitKPathFormDataManager extends PointsPathFormDataProvider<Name> {
    readonly name: "explicitKPath";
    readonly useExplicitPath = true;
}
export {};
