import { Application, Template } from "@exabyte-io/ade.js";
import { HashedInputArrayMixin } from "@exabyte-io/code.js/dist/entity";
import { removeTimestampableKeysFromConfig } from "@exabyte-io/code.js/dist/utils";
import { mix } from "mixwith";
import _ from "underscore";

import { BaseUnit } from "./base";

export class ExecutionUnit extends mix(BaseUnit).with(HashedInputArrayMixin) {
    static Application = Application;

    static Template = Template;

    // keys to be omitted during toJSON
    static omitKeys = [
        "job",
        "workflow",
        "material",
        "materials",
        "model",
        "methodData",
        "hasRelaxation",
    ];

    _initApplication(config) {
        this._application = this.constructor.Application.create(config.application);
        this._executable = this._application.getExecutableByConfig(config.executable);
        this._flavor = this._executable.getFlavorByConfig(config.flavor);
        this._templates = this._flavor ? this._flavor.inputAsTemplates : [];
    }

    _initRuntimeItems(keys, config) {
        this._initApplication(config);
        super._initRuntimeItems(keys);
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

    get templatesFromInput() {
        return this.input.map((i) => new this.constructor.Template(i));
    }

    setApplication(application, omitSettingExecutable = false) {
        this._application = application;
        this.setProp("application", application.toJSON());
        if (!omitSettingExecutable) {
            this.setExecutable(this.application.defaultExecutable);
        }
    }

    setExecutable(executable) {
        this._executable = executable;
        this.setProp("executable", executable.toJSON());
        this.setFlavor(this.executable.defaultFlavor);
    }

    setFlavor(flavor) {
        this._flavor = flavor;
        this.setRuntimeItemsToDefaultValues();
        this.setProp("flavor", flavor.toJSON());
        this.setTemplates(this.flavor.inputAsTemplates);
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
        return (
            this.prop("input") ||
            this.flavor.getInputAsRenderedTemplates(this.getCombinedContext()) ||
            []
        );
    }

    get renderingContext() {
        return this._renderingContext || {};
    }

    set renderingContext(ctx) {
        this._renderingContext = ctx;
    }

    // context to persist in toJSON
    get storedContext() {
        return _.omit(this.context, ...this.constructor.omitKeys);
    }

    // context to show to users with some extra keys omitted
    get visibleRenderingContext() {
        return _.omit(this.renderingContext, ...this.constructor.omitKeys);
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
        console.log(this.name, context, this.context);
        const newInput = [];
        const newPersistentContext = {};
        const newRenderingContext = {};
        const renderingContext = { ...this.context, ...context };
        this.updateContext(renderingContext); // update in-memory context to properly render templates from input below
        (fromTemplates ? this.templates : this.templatesFromInput).forEach((t) => {
            console.log(t);
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
            application: removeTimestampableKeysFromConfig(this.application.toJSON()),
            executable: removeTimestampableKeysFromConfig(this.executable.toJSON()),
            flavor: removeTimestampableKeysFromConfig(this.flavor.toJSON()),
            input: this.hashFromArrayInputContent,
        };
    }

    toJSON() {
        return this.clean({
            ...super.toJSON(),
            executable: this.executable.toJSON(),
            flavor: this.flavor.toJSON(),
            input: this.input,
            // keys below are not propagated to the parent class on initialization of a new unit unless explicitly given
            name: this.name,
            // TODO: figure out the problem with storing context below
            // context: this.storedContext,
        });
    }
}
