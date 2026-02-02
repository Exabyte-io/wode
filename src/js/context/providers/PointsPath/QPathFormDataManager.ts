import type { ContextItem } from "../base/ContextProvider";
import PointsPathFormDataProvider, {
    type PointsPathFormDataProviderData,
    type PointsPathFormDataProviderExternalContext,
} from "./PointsPathFormDataProvider";

type Name = "qpath";

export type QPathFormDataManagerContextItem = ContextItem<PointsPathFormDataProviderData>;
export type QPathFormDataManagerExternalContext = PointsPathFormDataProviderExternalContext;

export default class QPathFormDataManager extends PointsPathFormDataProvider<Name> {
    readonly name = "qpath" as const;
}
