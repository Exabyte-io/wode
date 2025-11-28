"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BoundaryConditionsFormDataProvider_1 = require("./providers/BoundaryConditionsFormDataProvider");
const QENEBContextProvider_1 = __importDefault(require("./providers/by_application/espresso/QENEBContextProvider"));
const QEPWXContextProvider_1 = __importDefault(require("./providers/by_application/espresso/QEPWXContextProvider"));
const NWChemTotalEnergyContextProvider_1 = __importDefault(require("./providers/by_application/nwchem/NWChemTotalEnergyContextProvider"));
const VASPContextProvider_1 = __importDefault(require("./providers/by_application/vasp/VASPContextProvider"));
const VASPNEBContextProvider_1 = __importDefault(require("./providers/by_application/vasp/VASPNEBContextProvider"));
const CollinearMagnetizationContextProvider_1 = require("./providers/CollinearMagnetizationContextProvider");
const HubbardContextProviderLegacy_1 = require("./providers/HubbardContextProviderLegacy");
const HubbardJContextProvider_1 = require("./providers/HubbardJContextProvider");
const HubbardUContextProvider_1 = require("./providers/HubbardUContextProvider");
const HubbardVContextProvider_1 = require("./providers/HubbardVContextProvider");
const IonDynamicsContextProvider_1 = require("./providers/IonDynamicsContextProvider");
const MLSettingsContextProvider_1 = require("./providers/MLSettingsContextProvider");
const MLTrainTestSplitContextProvider_1 = require("./providers/MLTrainTestSplitContextProvider");
const NEBFormDataProvider_1 = require("./providers/NEBFormDataProvider");
const NonCollinearMagnetizationContextProvider_1 = require("./providers/NonCollinearMagnetizationContextProvider");
const PlanewaveCutoffsContextProvider_1 = require("./providers/PlanewaveCutoffsContextProvider");
const PointsGridFormDataProvider_1 = require("./providers/PointsGridFormDataProvider");
const PointsPathFormDataProvider_1 = require("./providers/PointsPathFormDataProvider");
exports.default = {
    BoundaryConditionsFormDataProvider: BoundaryConditionsFormDataProvider_1.BoundaryConditionsFormDataProvider,
    MLSettingsContextProvider: MLSettingsContextProvider_1.MLSettingsContextProvider,
    MLTrainTestSplitContextProvider: MLTrainTestSplitContextProvider_1.MLTrainTestSplitContextProvider,
    NEBFormDataProvider: NEBFormDataProvider_1.NEBFormDataProvider,
    PlanewaveCutoffsContextProvider: PlanewaveCutoffsContextProvider_1.PlanewaveCutoffsContextProvider,
    PointsGridFormDataProvider: PointsGridFormDataProvider_1.PointsGridFormDataProvider,
    PointsPathFormDataProvider: PointsPathFormDataProvider_1.PointsPathFormDataProvider,
    ExplicitPointsPathFormDataProvider: PointsPathFormDataProvider_1.ExplicitPointsPathFormDataProvider,
    ExplicitPointsPath2PIBAFormDataProvider: PointsPathFormDataProvider_1.ExplicitPointsPath2PIBAFormDataProvider,
    HubbardJContextProvider: HubbardJContextProvider_1.HubbardJContextProvider,
    HubbardUContextProvider: HubbardUContextProvider_1.HubbardUContextProvider,
    HubbardVContextProvider: HubbardVContextProvider_1.HubbardVContextProvider,
    HubbardContextProviderLegacy: HubbardContextProviderLegacy_1.HubbardContextProviderLegacy,
    IonDynamicsContextProvider: IonDynamicsContextProvider_1.IonDynamicsContextProvider,
    CollinearMagnetizationContextProvider: CollinearMagnetizationContextProvider_1.CollinearMagnetizationContextProvider,
    NonCollinearMagnetizationContextProvider: NonCollinearMagnetizationContextProvider_1.NonCollinearMagnetizationContextProvider,
    VASPContextProvider: VASPContextProvider_1.default,
    VASPNEBContextProvider: VASPNEBContextProvider_1.default,
    QEPWXContextProvider: QEPWXContextProvider_1.default,
    QENEBContextProvider: QENEBContextProvider_1.default,
    NWChemTotalEnergyContextProvider: NWChemTotalEnergyContextProvider_1.default,
};
