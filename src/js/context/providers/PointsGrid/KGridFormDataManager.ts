import type { GridContextItemSchema } from "@mat3ra/esse/dist/js/types";

import ConvergenceParameter from "../../../subworkflows/convergence/ConvergenceParameter";
import type { UnitContext } from "../base/ContextProvider";
import PointsGridFormDataProvider, { type ExternalContext } from "./PointsGridFormDataProvider";

type Name = "kgrid";
type Schema = GridContextItemSchema;

export default class KGridFormDataManager extends PointsGridFormDataProvider<Name> {
    readonly name = "kgrid" as const;

    readonly divisor = 1 as const;

    static createFromUnitContext(unitContext: UnitContext, externalContext: ExternalContext) {
        const contextItem = this.findContextItem<Schema>(unitContext, "kgrid");

        return new KGridFormDataManager(contextItem, externalContext);
    }

    applyCovergenceParameter(parameter: ConvergenceParameter) {
        const unitContext = parameter.unitContext.data;
        const data = this.getData();

        this.setData({
            ...data,
            ...unitContext,
        });

        this.setIsEdited(true);
    }
}
