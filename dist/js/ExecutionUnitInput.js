"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ade_1 = require("@mat3ra/ade");
const entity_1 = require("@mat3ra/code/dist/js/entity");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const BoundaryConditionsFormDataManager_1 = __importDefault(require("./context/providers/BoundaryConditionsFormDataManager"));
const QENEBInputDataManager_1 = __importDefault(require("./context/providers/by_application/espresso/QENEBInputDataManager"));
const QEPWXInputDataManager_1 = __importDefault(require("./context/providers/by_application/espresso/QEPWXInputDataManager"));
const NWChemInputDataManager_1 = __importDefault(require("./context/providers/by_application/nwchem/NWChemInputDataManager"));
const VASPInputDataManager_1 = __importDefault(require("./context/providers/by_application/vasp/VASPInputDataManager"));
const VASPNEBInputDataManager_1 = __importDefault(require("./context/providers/by_application/vasp/VASPNEBInputDataManager"));
const CollinearMagnetizationDataManager_1 = __importDefault(require("./context/providers/CollinearMagnetizationDataManager"));
const HubbardContextManagerLegacy_1 = __importDefault(require("./context/providers/Hubbard/HubbardContextManagerLegacy"));
const HubbardJContextManager_1 = __importDefault(require("./context/providers/Hubbard/HubbardJContextManager"));
const HubbardUContextManager_1 = __importDefault(require("./context/providers/Hubbard/HubbardUContextManager"));
const HubbardVContextManager_1 = __importDefault(require("./context/providers/Hubbard/HubbardVContextManager"));
const IonDynamicsContextProvider_1 = __importDefault(require("./context/providers/IonDynamicsContextProvider"));
const MLSettingsDataManager_1 = __importDefault(require("./context/providers/MLSettingsDataManager"));
const MLTrainTestSplitDataManager_1 = __importDefault(require("./context/providers/MLTrainTestSplitDataManager"));
const NEBFormDataManager_1 = __importDefault(require("./context/providers/NEBFormDataManager"));
const NonCollinearMagnetizationDataManager_1 = __importDefault(require("./context/providers/NonCollinearMagnetizationDataManager"));
const PlanewaveCutoffDataManager_1 = __importDefault(require("./context/providers/PlanewaveCutoffDataManager"));
const IGridFormDataManager_1 = __importDefault(require("./context/providers/PointsGrid/IGridFormDataManager"));
const KGridFormDataManager_1 = __importDefault(require("./context/providers/PointsGrid/KGridFormDataManager"));
const QGridFormDataManager_1 = __importDefault(require("./context/providers/PointsGrid/QGridFormDataManager"));
const ExplicitKPath2PIBAFormDataManager_1 = __importDefault(require("./context/providers/PointsPath/ExplicitKPath2PIBAFormDataManager"));
const ExplicitKPathFormDataManager_1 = __importDefault(require("./context/providers/PointsPath/ExplicitKPathFormDataManager"));
const IPathFormDataManager_1 = __importDefault(require("./context/providers/PointsPath/IPathFormDataManager"));
const KPathFormDataManager_1 = __importDefault(require("./context/providers/PointsPath/KPathFormDataManager"));
const QPathFormDataManager_1 = __importDefault(require("./context/providers/PointsPath/QPathFormDataManager"));
class ExecutionUnitInput extends entity_1.InMemoryEntity {
    static get jsonSchema() {
        return JSONSchemasInterface_1.default.getSchemaById("workflow/unit/input/-inputItem");
    }
    static createFromTemplate(template) {
        return new ExecutionUnitInput({
            template,
            rendered: template.content,
            isManuallyChanged: false,
        });
    }
    constructor(config) {
        const { template } = config;
        const templateInstance = template instanceof ade_1.Template ? template : new ade_1.Template(template);
        super({ ...config, template: templateInstance.toJSON() });
        this.contextProvidersInstances = [];
        this.templateInstance = templateInstance;
    }
    setContext(context, externalContext) {
        this.contextProvidersInstances = this.template.contextProviders.map(({ name }) => {
            const contextItem = context.find((c) => c.name === name);
            if (name === "PlanewaveCutoffDataManager") {
                return new PlanewaveCutoffDataManager_1.default(contextItem, externalContext);
            }
            if (name === "KGridFormDataManager") {
                return new KGridFormDataManager_1.default(contextItem, externalContext);
            }
            if (name === "QGridFormDataManager") {
                return new QGridFormDataManager_1.default(contextItem, externalContext);
            }
            if (name === "IGridFormDataManager") {
                return new IGridFormDataManager_1.default(contextItem, externalContext);
            }
            if (name === "QPathFormDataManager") {
                return new QPathFormDataManager_1.default(contextItem, externalContext);
            }
            if (name === "IPathFormDataManager") {
                return new IPathFormDataManager_1.default(contextItem, externalContext);
            }
            if (name === "KPathFormDataManager") {
                return new KPathFormDataManager_1.default(contextItem, externalContext);
            }
            if (name === "ExplicitKPathFormDataManager") {
                return new ExplicitKPathFormDataManager_1.default(contextItem, externalContext);
            }
            if (name === "ExplicitKPath2PIBAFormDataManager") {
                return new ExplicitKPath2PIBAFormDataManager_1.default(contextItem, externalContext);
            }
            if (name === "HubbardJContextManager") {
                return new HubbardJContextManager_1.default(contextItem, externalContext);
            }
            if (name === "HubbardUContextManager") {
                return new HubbardUContextManager_1.default(contextItem, externalContext);
            }
            if (name === "HubbardVContextManager") {
                return new HubbardVContextManager_1.default(contextItem, externalContext);
            }
            if (name === "HubbardContextManagerLegacy") {
                return new HubbardContextManagerLegacy_1.default(contextItem, externalContext);
            }
            if (name === "NEBFormDataManager") {
                return new NEBFormDataManager_1.default(contextItem, externalContext);
            }
            if (name === "BoundaryConditionsFormDataManager") {
                return new BoundaryConditionsFormDataManager_1.default(contextItem, externalContext);
            }
            if (name === "MLSettingsDataManager") {
                return new MLSettingsDataManager_1.default(contextItem, externalContext);
            }
            if (name === "MLTrainTestSplitDataManager") {
                return new MLTrainTestSplitDataManager_1.default(contextItem, externalContext);
            }
            if (name === "IonDynamicsContextProvider") {
                return new IonDynamicsContextProvider_1.default(contextItem, externalContext);
            }
            if (name === "CollinearMagnetizationDataManager") {
                return new CollinearMagnetizationDataManager_1.default(contextItem, externalContext);
            }
            if (name === "NonCollinearMagnetizationDataManager") {
                return new NonCollinearMagnetizationDataManager_1.default(contextItem, externalContext);
            }
            if (name === "QEPWXInputDataManager") {
                return new QEPWXInputDataManager_1.default(contextItem, externalContext);
            }
            if (name === "QENEBInputDataManager") {
                return new QENEBInputDataManager_1.default(contextItem, externalContext);
            }
            if (name === "VASPInputDataManager") {
                return new VASPInputDataManager_1.default(contextItem, externalContext);
            }
            if (name === "VASPNEBInputDataManager") {
                return new VASPNEBInputDataManager_1.default(contextItem, externalContext);
            }
            if (name === "NWChemInputDataManager") {
                return new NWChemInputDataManager_1.default(contextItem, externalContext);
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
        const rendered = nunjucks_1.default.compile(this.template.content).render(fullContext);
        this.rendered = rendered || this.template.content;
        return this;
    }
    getFullContext() {
        return this.contextProvidersInstances.map((contextProvider) => {
            return contextProvider.getContextItemData();
        });
    }
}
exports.default = ExecutionUnitInput;
