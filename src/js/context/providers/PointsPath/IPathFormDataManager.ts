import type { ContextItem } from "../base/ContextProvider";
import PointsPathFormDataProvider, {
    type PointsPathFormDataProviderData,
    type PointsPathFormDataProviderExternalContext,
} from "./PointsPathFormDataProvider";

type Name = "ipath";

export type IPathFormDataManagerContextItem = ContextItem<PointsPathFormDataProviderData>;
export type IPathFormDataManagerExternalContext = PointsPathFormDataProviderExternalContext;

export default class IPathFormDataManager extends PointsPathFormDataProvider<Name> {
    readonly name = "ipath" as const;
}
