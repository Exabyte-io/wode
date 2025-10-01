"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.ExecutionUnit = void 0;
var _ade = require("@exabyte-io/ade.js");
var _ApplicationRegistry = _interopRequireDefault(
    require("@exabyte-io/ade.js/dist/js/ApplicationRegistry"),
);
var _utils = require("@mat3ra/utils");
var _underscore = _interopRequireDefault(require("underscore"));
var _base = require("./base");
function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
}
function _defineProperty(e, r, t) {
    return (
        (r = _toPropertyKey(r)) in e
            ? Object.defineProperty(e, r, {
                  value: t,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
              })
            : (e[r] = t),
        e
    );
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
class ExecutionUnit extends _base.BaseUnit {
    /**
     * @override this method to provide entities from other sources
     */
    _initApplication(config) {
        this._application = _ApplicationRegistry.default.createApplication(config.application);
        this._executable = _ApplicationRegistry.default.getExecutableByConfig(
            this._application.name,
            config.executable,
        );
        this._flavor = _ApplicationRegistry.default.getFlavorByConfig(
            this._executable,
            config.flavor,
        );
        this._templates = this._flavor ? this._flavor.inputAsTemplates : [];
    }

    /**
     * @override this method to provide default executable from other source
     */
    _getDefaultExecutable() {
        return _ApplicationRegistry.default.getExecutableByName(this.application.name);
    }

    /**
     * @override this method to provide default flavor from other source
     */
    _getDefaultFlavor() {
        return _ApplicationRegistry.default.getFlavorByName(this.executable.name);
    }

    /**
     * @override this method to provide custom templates
     */
    _getTemplatesFromInput() {
        return this.getInput().map((i) => new _ade.Template(i));
    }

    /**
     * @override this method to provide custom input from other sources
     */
    _getInput() {
        return (
            this.input ||
            _ApplicationRegistry.default.getInputAsRenderedTemplates(
                this.flavor,
                this.getCombinedContext(),
            ) ||
            []
        );
    }

    /**
     * @override this method to provide custom input as templates
     */
    _getInputAsTemplates() {
        return _ApplicationRegistry.default.getInputAsTemplates(this.flavor);
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
            return _utils.Utils.str.removeEmptyLinesFromString(
                _utils.Utils.str.removeCommentsFromSourceCode(i.content),
            );
        });
        return _utils.Utils.hash.calculateHashFromObject(objectForHashing);
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
        this.templates.forEach((i) =>
            list.push(...i.getContextProvidersAsClassInstances(this.getCombinedContext())),
        );
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
        return _underscore.default.omit(this.context, ...this.constructor.omitKeys);
    }

    // context to show to users with some extra keys omitted
    get visibleRenderingContext() {
        return _underscore.default.omit(this.renderingContext, ...this.constructor.omitKeys);
    }
    static getSubworkflowContext(context) {
        const { subworkflowContext } = context;
        return subworkflowContext
            ? {
                  subworkflowContext,
              }
            : {};
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
        const renderingContext = {
            ...this.context,
            ...context,
        };
        this.updateContext(renderingContext); // update in-memory context to properly render templates from input below
        (fromTemplates ? this.templates : this._getTemplatesFromInput()).forEach((t) => {
            newInput.push(t.getRenderedJSON(renderingContext));
            Object.assign(
                newRenderingContext,
                t.getDataFromProvidersForRenderingContext(renderingContext),
                ExecutionUnit.getSubworkflowContext(renderingContext),
            );
            Object.assign(
                newPersistentContext,
                t.getDataFromProvidersForPersistentContext(renderingContext),
                ExecutionUnit.getSubworkflowContext(renderingContext),
            );
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
            application: _utils.Utils.specific.removeTimestampableKeysFromConfig(
                this.application.toJSON(),
            ),
            executable: _utils.Utils.specific.removeTimestampableKeysFromConfig(
                this.executable.toJSON(),
            ),
            flavor: _utils.Utils.specific.removeTimestampableKeysFromConfig(this.flavor.toJSON()),
            input: this.hashFromArrayInputContent,
        };
    }
    toJSON() {
        return this.clean({
            ...super.toJSON(),
            executable: this.executable.toJSON(),
            flavor: this.flavor.toJSON(),
            input: this._getInput(),
            // keys below are not propagated to the parent class on initialization of a new unit unless explicitly given
            name: this.name,
            // TODO: figure out the problem with storing context below
            // context: this.storedContext,
        });
    }
}
exports.ExecutionUnit = ExecutionUnit;
// keys to be omitted during toJSON
_defineProperty(ExecutionUnit, "omitKeys", [
    "job",
    "workflow",
    "material",
    "materials",
    "model",
    "methodData",
    "hasRelaxation",
]);
