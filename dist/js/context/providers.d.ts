export namespace wodeProviders {
    namespace PlanewaveCutoffDataManager {
        export { PlanewaveCutoffsContextProvider as providerCls };
        export let config: any;
    }
    namespace KGridFormDataManager {
        export { PointsGridFormDataProvider as providerCls };
        let config_1: any;
        export { config_1 as config };
    }
    namespace QGridFormDataManager {
        export { PointsGridFormDataProvider as providerCls };
        let config_2: any;
        export { config_2 as config };
    }
    namespace IGridFormDataManager {
        export { PointsGridFormDataProvider as providerCls };
        let config_3: any;
        export { config_3 as config };
    }
    namespace QPathFormDataManager {
        export { PointsPathFormDataProvider as providerCls };
        let config_4: any;
        export { config_4 as config };
    }
    namespace IPathFormDataManager {
        export { PointsPathFormDataProvider as providerCls };
        let config_5: any;
        export { config_5 as config };
    }
    namespace KPathFormDataManager {
        export { PointsPathFormDataProvider as providerCls };
        let config_6: any;
        export { config_6 as config };
    }
    namespace ExplicitKPathFormDataManager {
        export { ExplicitPointsPathFormDataProvider as providerCls };
        let config_7: any;
        export { config_7 as config };
    }
    namespace ExplicitKPath2PIBAFormDataManager {
        export { ExplicitPointsPath2PIBAFormDataProvider as providerCls };
        let config_8: any;
        export { config_8 as config };
    }
    namespace HubbardJContextManager {
        export { HubbardJContextProvider as providerCls };
        let config_9: any;
        export { config_9 as config };
    }
    namespace HubbardUContextManager {
        export { HubbardUContextProvider as providerCls };
        let config_10: any;
        export { config_10 as config };
    }
    namespace HubbardVContextManager {
        export { HubbardVContextProvider as providerCls };
        let config_11: any;
        export { config_11 as config };
    }
    namespace HubbardContextManagerLegacy {
        export { HubbardContextProviderLegacy as providerCls };
        let config_12: any;
        export { config_12 as config };
    }
    namespace NEBFormDataManager {
        export { NEBFormDataProvider as providerCls };
        let config_13: any;
        export { config_13 as config };
    }
    namespace BoundaryConditionsFormDataManager {
        export { BoundaryConditionsFormDataProvider as providerCls };
        let config_14: any;
        export { config_14 as config };
    }
    namespace MLSettingsDataManager {
        export { MLSettingsContextProvider as providerCls };
        let config_15: any;
        export { config_15 as config };
    }
    namespace MLTrainTestSplitDataManager {
        export { MLTrainTestSplitContextProvider as providerCls };
        let config_16: any;
        export { config_16 as config };
    }
    namespace IonDynamicsContextProvider {
        export { IonDynamicsContextProvider as providerCls };
        let config_17: any;
        export { config_17 as config };
    }
    namespace CollinearMagnetizationDataManager {
        export { CollinearMagnetizationContextProvider as providerCls };
        let config_18: any;
        export { config_18 as config };
    }
    namespace NonCollinearMagnetizationDataManager {
        export { NonCollinearMagnetizationContextProvider as providerCls };
        let config_19: any;
        export { config_19 as config };
    }
    namespace QEPWXInputDataManager {
        export { QEPWXContextProvider as providerCls };
        export namespace config_20 {
            let name: string;
        }
        export { config_20 as config };
    }
    namespace QENEBInputDataManager {
        export { QENEBContextProvider as providerCls };
        export namespace config_21 {
            let name_1: string;
            export { name_1 as name };
        }
        export { config_21 as config };
    }
    namespace VASPInputDataManager {
        export { VASPContextProvider as providerCls };
        export namespace config_22 {
            let name_2: string;
            export { name_2 as name };
        }
        export { config_22 as config };
    }
    namespace VASPNEBInputDataManager {
        export { VASPNEBContextProvider as providerCls };
        export namespace config_23 {
            let name_3: string;
            export { name_3 as name };
        }
        export { config_23 as config };
    }
    namespace NWChemInputDataManager {
        export { NWChemTotalEnergyContextProvider as providerCls };
        export namespace config_24 {
            let name_4: string;
            export { name_4 as name };
        }
        export { config_24 as config };
    }
}
declare const PlanewaveCutoffsContextProvider: typeof import("./providers/PlanewaveCutoffsContextProvider").PlanewaveCutoffsContextProvider;
declare const PointsGridFormDataProvider: typeof import("./providers/PointsGridFormDataProvider").PointsGridFormDataProvider;
declare const PointsPathFormDataProvider: typeof import("..").PointsPathFormDataProvider;
declare const ExplicitPointsPathFormDataProvider: typeof import("./providers/PointsPathFormDataProvider").ExplicitPointsPathFormDataProvider;
declare const ExplicitPointsPath2PIBAFormDataProvider: typeof import("./providers/PointsPathFormDataProvider").ExplicitPointsPath2PIBAFormDataProvider;
declare const HubbardJContextProvider: typeof import("./providers/HubbardJContextProvider").HubbardJContextProvider;
declare const HubbardUContextProvider: typeof import("./providers/HubbardUContextProvider").HubbardUContextProvider;
declare const HubbardVContextProvider: typeof import("./providers/HubbardVContextProvider").HubbardVContextProvider;
declare const HubbardContextProviderLegacy: typeof import("./providers/HubbardContextProviderLegacy").HubbardContextProviderLegacy;
declare const NEBFormDataProvider: typeof import("./providers/NEBFormDataProvider").NEBFormDataProvider;
declare const BoundaryConditionsFormDataProvider: typeof import("./providers/BoundaryConditionsFormDataProvider").BoundaryConditionsFormDataProvider;
declare const MLSettingsContextProvider: typeof import("./providers/MLSettingsContextProvider").MLSettingsContextProvider;
declare const MLTrainTestSplitContextProvider: typeof import("./providers/MLTrainTestSplitContextProvider").MLTrainTestSplitContextProvider;
declare const IonDynamicsContextProvider_1: typeof import("./providers/IonDynamicsContextProvider").IonDynamicsContextProvider;
declare const CollinearMagnetizationContextProvider: typeof import("./providers/CollinearMagnetizationContextProvider").CollinearMagnetizationContextProvider;
declare const NonCollinearMagnetizationContextProvider: typeof import("./providers/NonCollinearMagnetizationContextProvider").NonCollinearMagnetizationContextProvider;
declare const QEPWXContextProvider: typeof import("./providers/by_application/espresso/QEPWXContextProvider").default;
declare const QENEBContextProvider: typeof import("./providers/by_application/espresso/QENEBContextProvider").default;
declare const VASPContextProvider: typeof import("./providers/by_application/vasp/VASPContextProvider").default;
declare const VASPNEBContextProvider: typeof import("./providers/by_application/vasp/VASPNEBContextProvider").default;
declare const NWChemTotalEnergyContextProvider: typeof import("./providers/by_application/nwchem/NWChemTotalEnergyContextProvider").default;
export {};
