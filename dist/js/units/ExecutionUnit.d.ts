import { Application, Executable, Flavor } from "@mat3ra/ade";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { ExecutableSchema, ExecutionUnitSchemaBase, FlavorSchema } from "@mat3ra/esse/dist/js/types";
import { type ImportantSettingsProvider } from "../context/mixins/ImportantSettingsProviderMixin";
import type { ContextItem } from "../context/providers/base/ContextProvider";
import ExecutionUnitInput from "../ExecutionUnitInput";
import { type ExecutionUnitSchemaMixin } from "../generated/ExecutionUnitSchemaMixin";
import { BaseUnit } from "./BaseUnit";
type Schema = ExecutionUnitSchemaBase;
type Base = typeof BaseUnit & Constructor<ExecutionUnitSchemaMixin> & Constructor<ImportantSettingsProvider>;
interface SetApplicationProps {
    application: Application;
    executable?: Executable | ExecutableSchema;
    flavor?: Flavor | FlavorSchema;
}
interface SetExecutableProps {
    executable?: Executable | ExecutableSchema;
    flavor?: Flavor | FlavorSchema;
}
export type ExecutionUnitSchema = Schema;
declare const ExecutionUnit_base: Base;
export declare class ExecutionUnit extends ExecutionUnit_base implements Schema {
    applicationInstance: Application;
    executableInstance: Executable;
    flavorInstance: Flavor;
    inputInstances: ExecutionUnitInput[];
    renderingContext: ContextItem[];
    toJSON: () => Schema & AnyObject;
    constructor(config: Schema);
    setApplication({ application, executable, flavor }: SetApplicationProps): void;
    setExecutable({ executable, flavor }: SetExecutableProps): void;
    setFlavor(flavor?: Flavor | FlavorSchema): void;
    setDefaultInput(): void;
    get allContextProviders(): (import("../context/providers/BoundaryConditionsFormDataManager").default | import("../context/providers/by_application/espresso/QEPWXInputDataManager").default | import("../context/providers/by_application/espresso/QENEBInputDataManager").default | import("../context/providers/by_application/nwchem/NWChemInputDataManager").default | import("../context/providers/by_application/vasp/VASPInputDataManager").default | import("../context/providers/by_application/vasp/VASPNEBInputDataManager").default | import("../context/providers/CollinearMagnetizationDataManager").default | import("../context/providers/Hubbard/HubbardContextManagerLegacy").default | import("../context/providers/Hubbard/HubbardJContextManager").default | import("../context/providers/Hubbard/HubbardUContextManager").default | import("../context/providers/Hubbard/HubbardVContextManager").default | import("../context/providers/IonDynamicsContextProvider").default | import("../context/providers/MLSettingsDataManager").default | import("../context/providers/MLTrainTestSplitDataManager").default | import("../context/providers/NEBFormDataManager").default | import("../context/providers/NonCollinearMagnetizationDataManager").default | import("../context/providers/PlanewaveCutoffDataManager").default | import("../context/providers/PointsGrid/IGridFormDataManager").default | import("../context/providers/PointsGrid/KGridFormDataManager").default | import("../context/providers/PointsGrid/QGridFormDataManager").default | import("../context/providers/PointsPath/ExplicitKPath2PIBAFormDataManager").default | import("../context/providers/PointsPath/ExplicitKPathFormDataManager").default | import("../context/providers/PointsPath/IPathFormDataManager").default | import("../context/providers/PointsPath/KPathFormDataManager").default | import("../context/providers/PointsPath/QPathFormDataManager").default)[];
    get contextProviders(): (import("../context/providers/BoundaryConditionsFormDataManager").default | import("../context/providers/by_application/espresso/QEPWXInputDataManager").default | import("../context/providers/by_application/espresso/QENEBInputDataManager").default | import("../context/providers/by_application/nwchem/NWChemInputDataManager").default | import("../context/providers/by_application/vasp/VASPInputDataManager").default | import("../context/providers/by_application/vasp/VASPNEBInputDataManager").default | import("../context/providers/CollinearMagnetizationDataManager").default | import("../context/providers/Hubbard/HubbardContextManagerLegacy").default | import("../context/providers/Hubbard/HubbardJContextManager").default | import("../context/providers/Hubbard/HubbardUContextManager").default | import("../context/providers/Hubbard/HubbardVContextManager").default | import("../context/providers/IonDynamicsContextProvider").default | import("../context/providers/MLSettingsDataManager").default | import("../context/providers/MLTrainTestSplitDataManager").default | import("../context/providers/NEBFormDataManager").default | import("../context/providers/NonCollinearMagnetizationDataManager").default | import("../context/providers/PointsGrid/IGridFormDataManager").default | import("../context/providers/PointsGrid/KGridFormDataManager").default | import("../context/providers/PointsGrid/QGridFormDataManager").default | import("../context/providers/PointsPath/ExplicitKPath2PIBAFormDataManager").default | import("../context/providers/PointsPath/ExplicitKPathFormDataManager").default | import("../context/providers/PointsPath/IPathFormDataManager").default | import("../context/providers/PointsPath/KPathFormDataManager").default | import("../context/providers/PointsPath/QPathFormDataManager").default)[];
    get importantSettingsProviders(): (import("../context/providers/BoundaryConditionsFormDataManager").default | import("../context/providers/CollinearMagnetizationDataManager").default | import("../context/providers/Hubbard/HubbardContextManagerLegacy").default | import("../context/providers/Hubbard/HubbardJContextManager").default | import("../context/providers/Hubbard/HubbardUContextManager").default | import("../context/providers/Hubbard/HubbardVContextManager").default | import("../context/providers/IonDynamicsContextProvider").default | import("../context/providers/MLSettingsDataManager").default | import("../context/providers/MLTrainTestSplitDataManager").default | import("../context/providers/NEBFormDataManager").default | import("../context/providers/NonCollinearMagnetizationDataManager").default | import("../context/providers/PointsGrid/IGridFormDataManager").default | import("../context/providers/PointsGrid/KGridFormDataManager").default | import("../context/providers/PointsGrid/QGridFormDataManager").default | import("../context/providers/PointsPath/ExplicitKPath2PIBAFormDataManager").default | import("../context/providers/PointsPath/ExplicitKPathFormDataManager").default | import("../context/providers/PointsPath/IPathFormDataManager").default | import("../context/providers/PointsPath/KPathFormDataManager").default | import("../context/providers/PointsPath/QPathFormDataManager").default)[];
    render(externalContext?: AnyObject): void;
    /**
     * @summary Calculates hash on unit-specific fields.
     * The meaningful fields of processing unit are operation, flavor and input at the moment.
     */
    getHashObject(): {
        application: {};
        executable: {};
        flavor: {} | undefined;
        input: string;
    };
}
export {};
