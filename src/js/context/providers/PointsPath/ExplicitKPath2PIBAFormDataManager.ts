import type { ContextItem } from "../base/ContextProvider";
import PointsPathFormDataProvider, {
    type PointsPathFormDataProviderData,
    type PointsPathFormDataProviderExternalContext,
} from "./PointsPathFormDataProvider";

type Name = "explicitKPath2PIBA";

export type ExplicitKPath2PIBAFormDataManagerContextItem =
    ContextItem<PointsPathFormDataProviderData>;
export type ExplicitKPath2PIBAFormDataManagerExternalContext =
    PointsPathFormDataProviderExternalContext;

export default class ExplicitKPath2PIBAFormDataManager extends PointsPathFormDataProvider<Name> {
    readonly name = "explicitKPath2PIBA" as const;

    readonly is2PIBA = true;

    readonly useExplicitPath = true;
}
