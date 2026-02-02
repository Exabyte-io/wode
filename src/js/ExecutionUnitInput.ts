import { type Application, Template } from "@mat3ra/ade";
import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type {
    ContextProviderNameEnum,
    JobSchema,
    TemplateSchema,
    WorkflowSchema,
} from "@mat3ra/esse/dist/js/types";
import nunjucks from "nunjucks";

import type { OrderedMaterial } from "./context/mixins/MaterialContextMixin";
import BoundaryConditionsFormDataManager, {
    type BoundaryConditionsFormDataManagerContextItem,
    type BoundaryConditionsFormDataManagerExternalContext,
} from "./context/providers/BoundaryConditionsFormDataManager";
import QENEBInputDataManager, {
    type QENEBInputDataManagerContextItem,
    type QENEBInputDataManagerExternalContext,
} from "./context/providers/by_application/espresso/QENEBInputDataManager";
import type {
    QEPWXInputDataManagerContextItem,
    QEPWXInputDataManagerExternalContext,
} from "./context/providers/by_application/espresso/QEPWXInputDataManager";
import QEPWXInputDataManager from "./context/providers/by_application/espresso/QEPWXInputDataManager";
import NWChemInputDataManager, {
    type NWChemInputDataManagerContextItem,
    type NWChemInputDataManagerExternalContext,
} from "./context/providers/by_application/nwchem/NWChemInputDataManager";
import VASPInputDataManager, {
    type VASPInputDataManagerContextItem,
    type VASPInputDataManagerExternalContext,
} from "./context/providers/by_application/vasp/VASPInputDataManager";
import VASPNEBInputDataManager, {
    type VASPNEBInputDataManagerContextItem,
    type VASPNEBInputDataManagerExternalContext,
} from "./context/providers/by_application/vasp/VASPNEBInputDataManager";
import type {
    CollinearMagnetizationDataManagerContextItem,
    CollinearMagnetizationDataManagerExternalContext,
} from "./context/providers/CollinearMagnetizationDataManager";
import CollinearMagnetizationDataManager from "./context/providers/CollinearMagnetizationDataManager";
import type { HubbardContextManagerLegacyContextItem } from "./context/providers/Hubbard/HubbardContextManagerLegacy";
import HubbardContextManagerLegacy from "./context/providers/Hubbard/HubbardContextManagerLegacy";
import type { HubbardExternalContext } from "./context/providers/Hubbard/HubbardContextProvider";
import HubbardJContextManager, {
    type HubbardJContextManagerContextItem,
} from "./context/providers/Hubbard/HubbardJContextManager";
import HubbardUContextManager, {
    type HubbardUContextManagerContextItem,
} from "./context/providers/Hubbard/HubbardUContextManager";
import HubbardVContextManager, {
    type HubbardVContextManagerContextItem,
} from "./context/providers/Hubbard/HubbardVContextManager";
import type {
    IonDynamicsContextProviderContextItem,
    IonDynamicsContextProviderExternalContext,
} from "./context/providers/IonDynamicsContextProvider";
import IonDynamicsContextProvider from "./context/providers/IonDynamicsContextProvider";
import type {
    MLSettingsDataManagerContextItem,
    MLSettingsDataManagerExternalContext,
} from "./context/providers/MLSettingsDataManager";
import MLSettingsDataManager from "./context/providers/MLSettingsDataManager";
import type {
    MLTrainTestSplitDataManagerContextItem,
    MLTrainTestSplitDataManagerExternalContext,
} from "./context/providers/MLTrainTestSplitDataManager";
import MLTrainTestSplitDataManager from "./context/providers/MLTrainTestSplitDataManager";
import type {
    NEBFormDataManagerContextItem,
    NEBFormDataManagerExternalContext,
} from "./context/providers/NEBFormDataManager";
import NEBFormDataManager from "./context/providers/NEBFormDataManager";
import NonCollinearMagnetizationDataManager, {
    type NonCollinearMagnetizationDataManagerContextItem,
    type NonCollinearMagnetizationDataManagerExternalContext,
} from "./context/providers/NonCollinearMagnetizationDataManager";
import PlanewaveCutoffDataManager, {
    type PlanewaveCutoffDataManagerContextItem,
    type PlanewaveCutoffDataManagerExternalContext,
} from "./context/providers/PlanewaveCutoffDataManager";
import IGridFormDataManager from "./context/providers/PointsGrid/IGridFormDataManager";
import KGridFormDataManager from "./context/providers/PointsGrid/KGridFormDataManager";
import type {
    PointsGridFormDataManagerContextItem,
    PointsGridFormDataManagerExternalContext,
} from "./context/providers/PointsGrid/PointsGridFormDataProvider";
import QGridFormDataManager from "./context/providers/PointsGrid/QGridFormDataManager";
import ExplicitKPath2PIBAFormDataManager, {
    type ExplicitKPath2PIBAFormDataManagerContextItem,
    type ExplicitKPath2PIBAFormDataManagerExternalContext,
} from "./context/providers/PointsPath/ExplicitKPath2PIBAFormDataManager";
import type {
    ExplicitKPathFormDataManagerContextItem,
    ExplicitKPathFormDataManagerExternalContext,
} from "./context/providers/PointsPath/ExplicitKPathFormDataManager";
import ExplicitKPathFormDataManager from "./context/providers/PointsPath/ExplicitKPathFormDataManager";
import type {
    IPathFormDataManagerContextItem,
    IPathFormDataManagerExternalContext,
} from "./context/providers/PointsPath/IPathFormDataManager";
import IPathFormDataManager from "./context/providers/PointsPath/IPathFormDataManager";
import KPathFormDataManager, {
    type KPathFormDataManagerContextItem,
    type KPathFormDataManagerExternalContext,
} from "./context/providers/PointsPath/KPathFormDataManager";
import QPathFormDataManager, {
    type QPathFormDataManagerContextItem,
    type QPathFormDataManagerExternalContext,
} from "./context/providers/PointsPath/QPathFormDataManager";
import type { ExecutionUnitInputSchemaMixin } from "./generated/ExecutionUnitInputSchemaMixin";

type Schema = ExecutionUnitInputSchemaMixin;

type Base = typeof InMemoryEntity & Constructor<ExecutionUnitInputSchemaMixin>;

type ConstructorConfig = Schema | (Omit<Schema, "template"> & { template: Template });

type AnyContextItem =
    | PlanewaveCutoffDataManagerContextItem
    | PointsGridFormDataManagerContextItem
    | QPathFormDataManagerContextItem
    | IPathFormDataManagerContextItem
    | KPathFormDataManagerContextItem
    | ExplicitKPathFormDataManagerContextItem
    | ExplicitKPath2PIBAFormDataManagerContextItem
    | HubbardJContextManagerContextItem
    | HubbardUContextManagerContextItem
    | HubbardVContextManagerContextItem
    | HubbardContextManagerLegacyContextItem
    | NEBFormDataManagerContextItem
    | BoundaryConditionsFormDataManagerContextItem
    | MLSettingsDataManagerContextItem
    | MLTrainTestSplitDataManagerContextItem
    | IonDynamicsContextProviderContextItem
    | CollinearMagnetizationDataManagerContextItem
    | NonCollinearMagnetizationDataManagerContextItem
    | QEPWXInputDataManagerContextItem
    | QENEBInputDataManagerContextItem
    | VASPInputDataManagerContextItem
    | VASPNEBInputDataManagerContextItem
    | NWChemInputDataManagerContextItem;

export type AnyContextExternalContext =
    | PlanewaveCutoffDataManagerExternalContext
    | PointsGridFormDataManagerExternalContext
    | QPathFormDataManagerExternalContext
    | IPathFormDataManagerExternalContext
    | KPathFormDataManagerExternalContext
    | ExplicitKPathFormDataManagerExternalContext
    | ExplicitKPath2PIBAFormDataManagerExternalContext
    | HubbardExternalContext
    | NEBFormDataManagerExternalContext
    | BoundaryConditionsFormDataManagerExternalContext
    | MLSettingsDataManagerExternalContext
    | MLTrainTestSplitDataManagerExternalContext
    | IonDynamicsContextProviderExternalContext
    | CollinearMagnetizationDataManagerExternalContext
    | NonCollinearMagnetizationDataManagerExternalContext
    | QEPWXInputDataManagerExternalContext
    | QENEBInputDataManagerExternalContext
    | VASPInputDataManagerExternalContext
    | VASPNEBInputDataManagerExternalContext
    | NWChemInputDataManagerExternalContext;

type AnyContextProvider =
    | BoundaryConditionsFormDataManager
    | MLSettingsDataManager
    | MLTrainTestSplitDataManager
    | IonDynamicsContextProvider
    | CollinearMagnetizationDataManager
    | NonCollinearMagnetizationDataManager
    | QEPWXInputDataManager
    | QENEBInputDataManager
    | VASPInputDataManager
    | VASPNEBInputDataManager
    | NWChemInputDataManager
    | PlanewaveCutoffDataManager
    | KGridFormDataManager
    | QGridFormDataManager
    | IGridFormDataManager
    | QPathFormDataManager
    | IPathFormDataManager
    | KPathFormDataManager
    | ExplicitKPathFormDataManager
    | ExplicitKPath2PIBAFormDataManager
    | HubbardJContextManager
    | HubbardUContextManager
    | HubbardVContextManager
    | HubbardContextManagerLegacy
    | NEBFormDataManager;

export type ExecutionUnitInputContext = (AnyContextItem & { name: ContextProviderNameEnum })[];

type ExternalContext = {
    application: Application;
    material: OrderedMaterial;
    materials: OrderedMaterial[];
    workflow: WorkflowSchema;
    job: JobSchema;
    isUsingJinjaVariables?: boolean;
    materialsSet: { _id: string };
};

export default class ExecutionUnitInput extends (InMemoryEntity as Base) implements Schema {
    declare _json: Schema & AnyObject;

    declare toJSON: () => Schema & AnyObject;

    declare toJSONQuick: () => Schema & AnyObject;

    static get jsonSchema() {
        return JSONSchemasInterface.getSchemaById("workflow/unit/input/-inputItem");
    }

    contextProvidersInstances: AnyContextProvider[] = [];

    readonly templateInstance: Template;

    static createFromTemplate(template: Template | TemplateSchema) {
        return new ExecutionUnitInput({
            template,
            rendered: template.content,
            isManuallyChanged: false,
        });
    }

    constructor(config: ConstructorConfig) {
        const { template } = config;
        const templateInstance = template instanceof Template ? template : new Template(template);

        super({ ...config, template: templateInstance.toJSON() });

        this.templateInstance = templateInstance;
    }

    setContext(context: ExecutionUnitInputContext, externalContext: ExternalContext) {
        this.contextProvidersInstances = this.template.contextProviders.map(({ name }) => {
            const contextItem = context.find((c) => c.name === name);

            if (name === "PlanewaveCutoffDataManager") {
                return new PlanewaveCutoffDataManager(
                    contextItem as PlanewaveCutoffDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "KGridFormDataManager") {
                return new KGridFormDataManager(
                    contextItem as PointsGridFormDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "QGridFormDataManager") {
                return new QGridFormDataManager(
                    contextItem as PointsGridFormDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "IGridFormDataManager") {
                return new IGridFormDataManager(
                    contextItem as PointsGridFormDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "QPathFormDataManager") {
                return new QPathFormDataManager(
                    contextItem as QPathFormDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "IPathFormDataManager") {
                return new IPathFormDataManager(
                    contextItem as IPathFormDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "KPathFormDataManager") {
                return new KPathFormDataManager(
                    contextItem as KPathFormDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "ExplicitKPathFormDataManager") {
                return new ExplicitKPathFormDataManager(
                    contextItem as ExplicitKPathFormDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "ExplicitKPath2PIBAFormDataManager") {
                return new ExplicitKPath2PIBAFormDataManager(
                    contextItem as ExplicitKPath2PIBAFormDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "HubbardJContextManager") {
                return new HubbardJContextManager(
                    contextItem as HubbardJContextManagerContextItem,
                    externalContext,
                );
            }
            if (name === "HubbardUContextManager") {
                return new HubbardUContextManager(
                    contextItem as HubbardUContextManagerContextItem,
                    externalContext,
                );
            }
            if (name === "HubbardVContextManager") {
                return new HubbardVContextManager(
                    contextItem as HubbardVContextManagerContextItem,
                    externalContext,
                );
            }
            if (name === "HubbardContextManagerLegacy") {
                return new HubbardContextManagerLegacy(
                    contextItem as HubbardContextManagerLegacyContextItem,
                    externalContext,
                );
            }
            if (name === "NEBFormDataManager") {
                return new NEBFormDataManager(
                    contextItem as NEBFormDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "BoundaryConditionsFormDataManager") {
                return new BoundaryConditionsFormDataManager(
                    contextItem as BoundaryConditionsFormDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "MLSettingsDataManager") {
                return new MLSettingsDataManager(
                    contextItem as MLSettingsDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "MLTrainTestSplitDataManager") {
                return new MLTrainTestSplitDataManager(
                    contextItem as MLTrainTestSplitDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "IonDynamicsContextProvider") {
                return new IonDynamicsContextProvider(
                    contextItem as IonDynamicsContextProviderContextItem,
                    externalContext,
                );
            }
            if (name === "CollinearMagnetizationDataManager") {
                return new CollinearMagnetizationDataManager(
                    contextItem as CollinearMagnetizationDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "NonCollinearMagnetizationDataManager") {
                return new NonCollinearMagnetizationDataManager(
                    contextItem as NonCollinearMagnetizationDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "QEPWXInputDataManager") {
                return new QEPWXInputDataManager(
                    contextItem as QEPWXInputDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "QENEBInputDataManager") {
                return new QENEBInputDataManager(
                    contextItem as QENEBInputDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "VASPInputDataManager") {
                return new VASPInputDataManager(
                    contextItem as VASPInputDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "VASPNEBInputDataManager") {
                return new VASPNEBInputDataManager(
                    contextItem as VASPNEBInputDataManagerContextItem,
                    externalContext,
                );
            }
            if (name === "NWChemInputDataManager") {
                return new NWChemInputDataManager(
                    contextItem as NWChemInputDataManagerContextItem,
                    externalContext,
                );
            }
            throw new Error(`Unknown provider: ${name}`);
        });

        return this;
    }

    render() {
        if (this.isManuallyChanged) {
            return this;
        }

        const fullContext = this.getFullContext();
        const rendered = nunjucks.compile(this.template.content).render(fullContext);

        this.rendered = rendered || this.template.content;

        return this;
    }

    getFullContext() {
        return this.contextProvidersInstances.map((contextProvider) => {
            return contextProvider.getContextItemData();
        });
    }
}
