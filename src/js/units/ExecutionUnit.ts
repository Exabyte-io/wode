import type { Application, Executable } from "@mat3ra/ade";
import { ApplicationRegistry, Flavor, Template as TemplateClass } from "@mat3ra/ade";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { ExecutionUnitSchemaBase } from "@mat3ra/esse/dist/js/types";
import { Utils } from "@mat3ra/utils";
import _ from "underscore";

import {
    type ExecutionUnitSchemaMixin,
    executionUnitSchemaMixin,
} from "../generated/ExecutionUnitSchemaMixin";
import { BaseUnit } from "./BaseUnit";

type Schema = ExecutionUnitSchemaBase;
type Base = typeof BaseUnit & Constructor<ExecutionUnitSchemaMixin>;

export class ExecutionUnit extends (BaseUnit as Base) implements Schema {
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

    applicationInstance: Application;

    executableInstance: Executable;

    flavorInstance: Flavor;

    templatesInstances: TemplateClass[] = [];

    _renderingContext: AnyObject = {};

    constructor(config: Schema) {
        super({ ...config });
        this.applicationInstance = ApplicationRegistry.createApplication(config.application);
        this.executableInstance = ApplicationRegistry.getExecutableByConfig(
            this.applicationInstance.name,
            config.executable,
        );
        const flavorInstance = ApplicationRegistry.getFlavorByConfig(
            this.executableInstance,
            config.flavor,
        );
        if (!flavorInstance) {
            throw new Error("Flavor is not set");
        }
        this.flavorInstance = flavorInstance;
        this.templatesInstances = ApplicationRegistry.getInputAsTemplates(flavorInstance);

        this.name = this.name || this.flavor?.name || "";
    }

    /**
     * @override this method to provide default executable from other source
     */
    _getDefaultExecutable(): Executable {
        return ApplicationRegistry.getExecutableByName(this.application.name);
    }

    /**
     * @override this method to provide default flavor from other source
     */
    _getDefaultFlavor(): Flavor {
        const flavor = ApplicationRegistry.getFlavorByName(this.executableInstance);
        if (!flavor) {
            throw new Error("Flavor is not set");
        }
        return flavor;
    }

    /**
     * @override this method to provide custom templates
     */
    _getTemplatesFromInput(): TemplateClass[] {
        return this._getInput().map((i) => new TemplateClass(i));
    }

    /**
     * @override this method to provide custom input from other sources
     */
    _getInput(): AnyObject[] {
        return (
            this.input ||
            ApplicationRegistry.getInputAsRenderedTemplates(
                this.flavorInstance,
                this.getCombinedContext(),
            ) ||
            []
        );
    }

    /**
     * @override this method to provide custom input as templates
     */
    _getInputAsTemplates(): TemplateClass[] {
        return ApplicationRegistry.getInputAsTemplates(this.flavorInstance);
    }

    /*
     * @summary expects an array with elements containing field [{content: "..."}]
     */
    get hashFromArrayInputContent(): string {
        const objectForHashing = this._getInput().map((i) => {
            return Utils.str.removeEmptyLinesFromString(
                Utils.str.removeCommentsFromSourceCode(i.content),
            );
        });
        return Utils.hash.calculateHashFromObject(objectForHashing);
    }

    setApplication(application: Application, omitSettingExecutable = false) {
        this._application = application;
        this.setProp("application", application.toJSON());
        if (!omitSettingExecutable) {
            this.setExecutable(this._getDefaultExecutable());
        }
    }

    setExecutable(executable: Executable) {
        this.executableInstance = executable;
        this.setProp("executable", executable.toJSON());
        this.setFlavor(this._getDefaultFlavor());
    }

    setFlavor(flavor: Flavor) {
        this.flavorInstance = flavor;
        this.setRuntimeItemsToDefaultValues();
        this.setProp("flavor", flavor.toJSON());
        this.setTemplates(this._getInputAsTemplates());
    }

    setTemplates(templates: TemplateClass[]) {
        this._templates = templates;
        this.render(this.context, true);
    }

    setInput(input: AnyObject[]) {
        this.setProp("input", input);
    }

    get defaultResults() {
        return this.flavor?.results || [];
    }

    get defaultMonitors() {
        return this.flavor?.monitors || [];
    }

    get defaultPostProcessors() {
        return this.flavor?.postProcessors || [];
    }

    get allowedResults() {
        return this.executable?.results || [];
    }

    get allowedMonitors() {
        return this.executable?.monitors || [];
    }

    get allowedPostProcessors() {
        return this.executable?.postProcessors || [];
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

    get renderingContext(): AnyObject {
        return this._renderingContext || {};
    }

    set renderingContext(ctx: AnyObject) {
        this._renderingContext = ctx;
    }

    // context to persist in toJSON
    get storedContext(): AnyObject {
        return _.omit(this.context, ...ExecutionUnit.omitKeys);
    }

    // context to show to users with some extra keys omitted
    get visibleRenderingContext(): AnyObject {
        return _.omit(this.renderingContext, ...ExecutionUnit.omitKeys);
    }

    static getSubworkflowContext(context: AnyObject): AnyObject {
        const { subworkflowContext } = context;
        return subworkflowContext ? { subworkflowContext } : {};
    }

    /** Update rendering context and persistent context
     * Note: this function is sometimes being called without passing a context!
     * @param context
     * @param fromTemplates
     */
    render(context: AnyObject = {}, fromTemplates = false) {
        const newInput: AnyObject[] = [];
        const newPersistentContext: AnyObject = {};
        const newRenderingContext: AnyObject = {};
        const renderingContext = { ...this.context, ...context };
        this.updateContext(renderingContext); // update in-memory context to properly render templates from input below
        (fromTemplates ? this.templatesInstances : this._getTemplatesFromInput()).forEach((t) => {
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
    getHashObject(): object {
        return {
            ...super.getHashObject(),
            application: Utils.specific.removeTimestampableKeysFromConfig(
                this.applicationInstance.toJSON(),
            ),
            executable: Utils.specific.removeTimestampableKeysFromConfig(
                this.executableInstance.toJSON(),
            ),
            flavor: this.flavorInstance
                ? Utils.specific.removeTimestampableKeysFromConfig(this.flavorInstance.toJSON())
                : undefined,
            input: this.hashFromArrayInputContent,
        };
    }

    toJSON(): AnyObject {
        const json = this.clean({
            ...super.toJSON(),
            executable: this.executableInstance.toJSON(),
            flavor: this.flavorInstance?.toJSON(),
            input: this._getInput(),
            // keys below are not propagated to the parent class on initialization of a new unit unless explicitly given
            name: this.name,
            // TODO: figure out the problem with storing context below
            // context: this.storedContext,
        });

        // Remove results from executable
        if (json.executable?.results) delete json.executable.results;

        return json;
    }
}

executionUnitSchemaMixin(ExecutionUnit.prototype);
