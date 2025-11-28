"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionUnit = void 0;
const ade_1 = require("@mat3ra/ade");
const utils_1 = require("@mat3ra/utils");
const underscore_1 = __importDefault(require("underscore"));
const base_1 = require("./base");
class ExecutionUnit extends base_1.BaseUnit {
    /**
     * @override this method to provide entities from other sources
     */
    _initApplication(config) {
        this._application = ade_1.ApplicationRegistry.createApplication(config.application);
        this._executable = ade_1.ApplicationRegistry.getExecutableByConfig(this._application.name, config.executable);
        this._flavor = ade_1.ApplicationRegistry.getFlavorByConfig(this._executable, config.flavor);
        this._templates = this._flavor ? this._flavor.inputAsTemplates : [];
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
        return ade_1.ApplicationRegistry.getFlavorByName(this.executable.name);
    }
    /**
     * @override this method to provide custom templates
     */
    _getTemplatesFromInput() {
        return this.getInput().map((i) => new ade_1.Template(i));
    }
    /**
     * @override this method to provide custom input from other sources
     */
    _getInput() {
        return (this.input ||
            ade_1.ApplicationRegistry.getInputAsRenderedTemplates(this.flavor, this.getCombinedContext()) ||
            []);
    }
    /**
     * @override this method to provide custom input as templates
     */
    _getInputAsTemplates() {
        return ade_1.ApplicationRegistry.getInputAsTemplates(this.flavor);
    }
    _initRuntimeItems(keys, config) {
        this._initApplication(config);
        super._initRuntimeItems(keys);
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
    get name() {
        return this.prop("name", this.flavor.name);
    }
    get application() {
        return this._application;
    }
    get executable() {
        return this._executable;
    }
    get flavor() {
        return this._flavor;
    }
    get templates() {
        return this._templates;
    }
    setApplication(application, omitSettingExecutable = false) {
        this._application = application;
        this.setProp("application", application.toJSON());
        if (!omitSettingExecutable) {
            this.setExecutable(this._getDefaultExecutable());
        }
    }
    setExecutable(executable) {
        this._executable = executable;
        this.setProp("executable", executable.toJSON());
        this.setFlavor(this._getDefaultFlavor());
    }
    setFlavor(flavor) {
        this._flavor = flavor;
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
        return this.flavor.results;
    }
    get defaultMonitors() {
        return this.flavor.monitors;
    }
    get defaultPostProcessors() {
        return this.flavor.postProcessors;
    }
    get allowedResults() {
        return this.executable.results;
    }
    get allowedMonitors() {
        return this.executable.monitors;
    }
    get allowedPostProcessors() {
        return this.executable.postProcessors;
    }
    get allContextProviders() {
        const list = [];
        // pass context below to keep UI changes
        this.templates.forEach((i) => list.push(...i.getContextProvidersAsClassInstances(this.getCombinedContext())));
        return list;
    }
    get contextProviders() {
        return this.allContextProviders.filter((p) => p.isUnitContextProvider);
    }
    get input() {
        return this.prop("input");
    }
    get renderingContext() {
        return this._renderingContext || {};
    }
    set renderingContext(ctx) {
        this._renderingContext = ctx;
    }
    // context to persist in toJSON
    get storedContext() {
        return underscore_1.default.omit(this.context, ...this.constructor.omitKeys);
    }
    // context to show to users with some extra keys omitted
    get visibleRenderingContext() {
        return underscore_1.default.omit(this.renderingContext, ...this.constructor.omitKeys);
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
    render(context, fromTemplates = false) {
        const newInput = [];
        const newPersistentContext = {};
        const newRenderingContext = {};
        const renderingContext = { ...this.context, ...context };
        this.updateContext(renderingContext); // update in-memory context to properly render templates from input below
        (fromTemplates ? this.templates : this._getTemplatesFromInput()).forEach((t) => {
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
            application: utils_1.Utils.specific.removeTimestampableKeysFromConfig(this.application.toJSON()),
            executable: utils_1.Utils.specific.removeTimestampableKeysFromConfig(this.executable.toJSON()),
            flavor: utils_1.Utils.specific.removeTimestampableKeysFromConfig(this.flavor.toJSON()),
            input: this.hashFromArrayInputContent,
        };
    }
    toJSON() {
        var _a;
        const json = this.clean({
            ...super.toJSON(),
            executable: this.executable.toJSON(),
            flavor: this.flavor.toJSON(),
            input: this._getInput(),
            // keys below are not propagated to the parent class on initialization of a new unit unless explicitly given
            name: this.name,
            // TODO: figure out the problem with storing context below
            // context: this.storedContext,
        });
        // Remove results from executable
        if ((_a = json.executable) === null || _a === void 0 ? void 0 : _a.results)
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
