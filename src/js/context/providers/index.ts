import { type Application } from "@mat3ra/ade";
import type { JobSchema, WorkflowSchema } from "@mat3ra/esse/dist/js/types";

import type { OrderedMaterial } from "../mixins/MaterialContextMixin";
import type { UnitContext } from "./base/ContextProvider";
import BoundaryConditionsFormDataManager from "./BoundaryConditionsFormDataManager";
import QENEBInputDataManager from "./by_application/espresso/QENEBInputDataManager";
import QEPWXInputDataManager from "./by_application/espresso/QEPWXInputDataManager";
import NWChemInputDataManager from "./by_application/nwchem/NWChemInputDataManager";
import VASPInputDataManager from "./by_application/vasp/VASPInputDataManager";
import VASPNEBInputDataManager from "./by_application/vasp/VASPNEBInputDataManager";
import CollinearMagnetizationDataManager from "./CollinearMagnetizationDataManager";
import HubbardContextManagerLegacy from "./Hubbard/HubbardContextManagerLegacy";
import HubbardJContextManager from "./Hubbard/HubbardJContextManager";
import HubbardUContextManager from "./Hubbard/HubbardUContextManager";
import HubbardVContextManager from "./Hubbard/HubbardVContextManager";
import IonDynamicsDataManager from "./IonDynamicsDataManager";
import MLSettingsDataManager from "./MLSettingsDataManager";
import MLTrainTestSplitDataManager from "./MLTrainTestSplitDataManager";
import NEBFormDataManager from "./NEBFormDataManager";
import NonCollinearMagnetizationDataManager from "./NonCollinearMagnetizationDataManager";
import PlanewaveCutoffDataManager from "./PlanewaveCutoffDataManager";
import IGridFormDataManager from "./PointsGrid/IGridFormDataManager";
import KGridFormDataManager from "./PointsGrid/KGridFormDataManager";
import QGridFormDataManager from "./PointsGrid/QGridFormDataManager";
import ExplicitKPath2PIBAFormDataManager from "./PointsPath/ExplicitKPath2PIBAFormDataManager";
import ExplicitKPathFormDataManager from "./PointsPath/ExplicitKPathFormDataManager";
import IPathFormDataManager from "./PointsPath/IPathFormDataManager";
import KPathFormDataManager from "./PointsPath/KPathFormDataManager";
import QPathFormDataManager from "./PointsPath/QPathFormDataManager";

/**
 * Registry mapping provider names (as they appear in templates) to their classes.
 * This is the single source of truth for provider mappings.
 */
export const PROVIDER_REGISTRY = {
    PlanewaveCutoffDataManager,
    KGridFormDataManager,
    QGridFormDataManager,
    IGridFormDataManager,
    QPathFormDataManager,
    IPathFormDataManager,
    KPathFormDataManager,
    ExplicitKPathFormDataManager,
    ExplicitKPath2PIBAFormDataManager,
    HubbardJContextManager,
    HubbardUContextManager,
    HubbardVContextManager,
    HubbardContextManagerLegacy,
    NEBFormDataManager,
    BoundaryConditionsFormDataManager,
    MLSettingsDataManager,
    MLTrainTestSplitDataManager,
    IonDynamicsContextProvider: IonDynamicsDataManager, // Note: name mismatch preserved from original
    CollinearMagnetizationDataManager,
    NonCollinearMagnetizationDataManager,
    QEPWXInputDataManager,
    QENEBInputDataManager,
    VASPInputDataManager,
    VASPNEBInputDataManager,
    NWChemInputDataManager,
} as const;

/**
 * External context type used by ExecutionUnitInput when creating providers.
 * This type is always expected to be present when providers are instantiated.
 */
export type ExternalContext = {
    application: Application;
    material: OrderedMaterial;
    materials: OrderedMaterial[];
    workflow: WorkflowSchema;
    job: JobSchema;
    isUsingJinjaVariables?: boolean;
    materialsSet: { _id: string };
};

/**
 * Type for provider names as they appear in templates.
 */
export type ProviderName = keyof typeof PROVIDER_REGISTRY;

/**
 * Union type of all context provider instances.
 * Derived from the registry for type safety.
 */
export type AnyContextProvider = InstanceType<(typeof PROVIDER_REGISTRY)[ProviderName]>;

/**
 * Factory function to create a context provider instance from its name.
 *
 * @param name - The provider name as it appears in templates
 * @param context - The unit context
 * @param externalContext - The external context (must match the ExternalContext type defined in this file)
 * @returns An instance of the requested context provider
 * @throws Error if the provider name is unknown
 */
export function createProvider(
    name: ProviderName,
    context: UnitContext,
    externalContext: ExternalContext,
): AnyContextProvider {
    const ProviderClass = PROVIDER_REGISTRY[name];
    if (!ProviderClass) {
        throw new Error(`Unknown provider: ${name}`);
    }
    // Type assertion is safe here because ExecutionUnitInput's ExternalContext
    // extends the base ExternalContext and includes all properties needed by providers.
    // Each provider may expect a more specific ExternalContext type, but at runtime
    // the ExecutionUnitInput's ExternalContext will have all required properties.
    // This is a legitimate use of `any` for dynamic dispatch where TypeScript
    // cannot statically verify the types, but runtime behavior is guaranteed.
    return ProviderClass.createFromUnitContext(context, externalContext);
}

// Re-export all provider classes for convenience
export {
    BoundaryConditionsFormDataManager,
    QENEBInputDataManager,
    QEPWXInputDataManager,
    NWChemInputDataManager,
    VASPInputDataManager,
    VASPNEBInputDataManager,
    CollinearMagnetizationDataManager,
    HubbardContextManagerLegacy,
    HubbardJContextManager,
    HubbardUContextManager,
    HubbardVContextManager,
    IonDynamicsDataManager,
    MLSettingsDataManager,
    MLTrainTestSplitDataManager,
    NEBFormDataManager,
    NonCollinearMagnetizationDataManager,
    PlanewaveCutoffDataManager,
    IGridFormDataManager,
    KGridFormDataManager,
    QGridFormDataManager,
    ExplicitKPath2PIBAFormDataManager,
    ExplicitKPathFormDataManager,
    IPathFormDataManager,
    KPathFormDataManager,
    QPathFormDataManager,
};
