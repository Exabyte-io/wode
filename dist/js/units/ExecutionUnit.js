"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionUnit = void 0;
const ade_1 = require("@mat3ra/ade");
const utils_1 = require("@mat3ra/utils");
const underscore_1 = __importDefault(require("underscore"));
const ExecutionUnitSchemaMixin_1 = require("../generated/ExecutionUnitSchemaMixin");
const BaseUnit_1 = require("./BaseUnit");
class ExecutionUnit extends BaseUnit_1.BaseUnit {
    constructor(config) {
        var _a;
        super({ ...config });
        this.templatesInstances = [];
        this._renderingContext = {};
        this.applicationInstance = ade_1.ApplicationRegistry.createApplication(config.application);
        this.executableInstance = ade_1.ApplicationRegistry.getExecutableByConfig(this.applicationInstance.name, config.executable);
        const flavorInstance = ade_1.ApplicationRegistry.getFlavorByConfig(this.executableInstance, config.flavor);
        if (!flavorInstance) {
            throw new Error("Flavor is not set");
        }
        this.flavorInstance = flavorInstance;
        this.templatesInstances = ade_1.ApplicationRegistry.getInputAsTemplates(flavorInstance);
        this.name = this.name || ((_a = this.flavor) === null || _a === void 0 ? void 0 : _a.name) || "";
    }
    /**
     * @override this method to provide default executable from other source
     */
    _getDefaultExecutable() {
        return ade_1.ApplicationRegistry.getExecutableByName(this.application.name);
    }
    /**
     * @override this method to provide default flavor from other source
     */
    _getDefaultFlavor() {
        const flavor = ade_1.ApplicationRegistry.getFlavorByName(this.executableInstance);
        if (!flavor) {
            throw new Error("Flavor is not set");
        }
        return flavor;
    }
    /**
     * @override this method to provide custom templates
     */
    _getTemplatesFromInput() {
        return this._getInput().map((i) => new ade_1.Template(i));
    }
    /**
     * @override this method to provide custom input from other sources
     */
    _getInput() {
        return (this.input ||
            ade_1.ApplicationRegistry.getInputAsRenderedTemplates(this.flavorInstance, this.getCombinedContext()) ||
            []);
    }
    /**
     * @override this method to provide custom input as templates
     */
    _getInputAsTemplates() {
        return ade_1.ApplicationRegistry.getInputAsTemplates(this.flavorInstance);
    }
    /*
     * @summary expects an array with elements containing field [{content: "..."}]
     */
    get hashFromArrayInputContent() {
        const objectForHashing = this._getInput().map((i) => {
            return utils_1.Utils.str.removeEmptyLinesFromString(utils_1.Utils.str.removeCommentsFromSourceCode(i.content));
        });
        return utils_1.Utils.hash.calculateHashFromObject(objectForHashing);
    }
    setApplication(application, omitSettingExecutable = false) {
        this._application = application;
        this.setProp("application", application.toJSON());
        if (!omitSettingExecutable) {
            this.setExecutable(this._getDefaultExecutable());
        }
    }
    setExecutable(executable) {
        this.executableInstance = executable;
        this.setProp("executable", executable.toJSON());
        this.setFlavor(this._getDefaultFlavor());
    }
    setFlavor(flavor) {
        this.flavorInstance = flavor;
        this.setRuntimeItemsToDefaultValues();
        this.setProp("flavor", flavor.toJSON());
        this.setTemplates(this._getInputAsTemplates());
    }
    setTemplates(templates) {
        this._templates = templates;
        this.render(this.context, true);
    }
    setInput(input) {
        this.setProp("input", input);
    }
    get defaultResults() {
        var _a;
        return ((_a = this.flavor) === null || _a === void 0 ? void 0 : _a.results) || [];
    }
    get defaultMonitors() {
        var _a;
        return ((_a = this.flavor) === null || _a === void 0 ? void 0 : _a.monitors) || [];
    }
    get defaultPostProcessors() {
        var _a;
        return ((_a = this.flavor) === null || _a === void 0 ? void 0 : _a.postProcessors) || [];
    }
    get allowedResults() {
        var _a;
        return ((_a = this.executable) === null || _a === void 0 ? void 0 : _a.results) || [];
    }
    get allowedMonitors() {
        var _a;
        return ((_a = this.executable) === null || _a === void 0 ? void 0 : _a.monitors) || [];
    }
    get allowedPostProcessors() {
        var _a;
        return ((_a = this.executable) === null || _a === void 0 ? void 0 : _a.postProcessors) || [];
    }
    get allContextProviders() {
        return this.templatesInstances
            .map((i) => {
            return i.getContextProvidersAsClassInstances(this.getCombinedContext());
        })
            .flat();
    }
    get contextProviders() {
        return this.allContextProviders.filter((p) => p.isUnitContextProvider);
    }
    get renderingContext() {
        return this._renderingContext || {};
    }
    set renderingContext(ctx) {
        this._renderingContext = ctx;
    }
    // context to persist in toJSON
    get storedContext() {
        return underscore_1.default.omit(this.context, ...ExecutionUnit.omitKeys);
    }
    // context to show to users with some extra keys omitted
    get visibleRenderingContext() {
        return underscore_1.default.omit(this.renderingContext, ...ExecutionUnit.omitKeys);
    }
    static getSubworkflowContext(context) {
        const { subworkflowContext } = context;
        return subworkflowContext ? { subworkflowContext } : {};
    }
    /** Update rendering context and persistent context
     * Note: this function is sometimes being called without passing a context!
     * @param context
     * @param fromTemplates
     */
    render(context = {}, fromTemplates = false) {
        const newInput = [];
        const newPersistentContext = {};
        const newRenderingContext = {};
        const renderingContext = { ...this.context, ...context };
        this.updateContext(renderingContext); // update in-memory context to properly render templates from input below
        (fromTemplates ? this.templatesInstances : this._getTemplatesFromInput()).forEach((t) => {
            newInput.push(t.getRenderedJSON(renderingContext));
            Object.assign(newRenderingContext, t.getDataFromProvidersForRenderingContext(renderingContext), ExecutionUnit.getSubworkflowContext(renderingContext));
            Object.assign(newPersistentContext, t.getDataFromProvidersForPersistentContext(renderingContext), ExecutionUnit.getSubworkflowContext(renderingContext));
        });
        this.setInput(newInput);
        this.renderingContext = newRenderingContext;
        this.updatePersistentContext(newPersistentContext);
    }
    /**
     * @summary Calculates hash on unit-specific fields.
     * The meaningful fields of processing unit are operation, flavor and input at the moment.
     */
    getHashObject() {
        return {
            ...super.getHashObject(),
            application: utils_1.Utils.specific.removeTimestampableKeysFromConfig(this.applicationInstance.toJSON()),
            executable: utils_1.Utils.specific.removeTimestampableKeysFromConfig(this.executableInstance.toJSON()),
            flavor: this.flavorInstance
                ? utils_1.Utils.specific.removeTimestampableKeysFromConfig(this.flavorInstance.toJSON())
                : undefined,
            input: this.hashFromArrayInputContent,
        };
    }
    toJSON() {
        var _a, _b;
        const json = this.clean({
            ...super.toJSON(),
            executable: this.executableInstance.toJSON(),
            flavor: (_a = this.flavorInstance) === null || _a === void 0 ? void 0 : _a.toJSON(),
            input: this._getInput(),
            // keys below are not propagated to the parent class on initialization of a new unit unless explicitly given
            name: this.name,
            // TODO: figure out the problem with storing context below
            // context: this.storedContext,
        });
        // Remove results from executable
        if ((_b = json.executable) === null || _b === void 0 ? void 0 : _b.results)
            delete json.executable.results;
        return json;
    }
}
exports.ExecutionUnit = ExecutionUnit;
// keys to be omitted during toJSON
ExecutionUnit.omitKeys = [
    "job",
    "workflow",
    "material",
    "materials",
    "model",
    "methodData",
    "hasRelaxation",
];
(0, ExecutionUnitSchemaMixin_1.executionUnitSchemaMixin)(ExecutionUnit.prototype);
