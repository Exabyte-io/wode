import type { Application, Executable } from "@mat3ra/ade";
import { Flavor, Template as TemplateClass } from "@mat3ra/ade";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { ExecutionUnitSchemaBase } from "@mat3ra/esse/dist/js/types";
import { type ExecutionUnitSchemaMixin } from "../generated/ExecutionUnitSchemaMixin";
import { BaseUnit } from "./BaseUnit";
type Schema = ExecutionUnitSchemaBase;
type Base = typeof BaseUnit & Constructor<ExecutionUnitSchemaMixin>;
declare const ExecutionUnit_base: Base;
export declare class ExecutionUnit extends ExecutionUnit_base implements Schema {
    static omitKeys: string[];
    applicationInstance: Application;
    executableInstance: Executable;
    flavorInstance: Flavor;
    templatesInstances: TemplateClass[];
    _renderingContext: AnyObject;
    constructor(config: Schema);
    /**
     * @override this method to provide default executable from other source
     */
    _getDefaultExecutable(): Executable;
    /**
     * @override this method to provide default flavor from other source
     */
    _getDefaultFlavor(): Flavor;
    /**
     * @override this method to provide custom templates
     */
    _getTemplatesFromInput(): TemplateClass[];
    /**
     * @override this method to provide custom input from other sources
     */
    _getInput(): AnyObject[];
    /**
     * @override this method to provide custom input as templates
     */
    _getInputAsTemplates(): TemplateClass[];
    get hashFromArrayInputContent(): string;
    setApplication(application: Application, omitSettingExecutable?: boolean): void;
    setExecutable(executable: Executable): void;
    setFlavor(flavor: Flavor): void;
    setTemplates(templates: TemplateClass[]): void;
    setInput(input: AnyObject[]): void;
    get defaultResults(): {
        name: string;
    }[];
    get defaultMonitors(): {
        name: string;
    }[];
    get defaultPostProcessors(): {
        name: string;
    }[];
    get allowedResults(): {
        name: string;
    }[];
    get allowedMonitors(): {
        name: string;
    }[];
    get allowedPostProcessors(): {
        name: string;
    }[];
    get allContextProviders(): import("@mat3ra/ade").ContextProvider[];
    get contextProviders(): import("@mat3ra/ade").ContextProvider[];
    get renderingContext(): AnyObject;
    set renderingContext(ctx: AnyObject);
    get storedContext(): AnyObject;
    get visibleRenderingContext(): AnyObject;
    static getSubworkflowContext(context: AnyObject): AnyObject;
    /** Update rendering context and persistent context
     * Note: this function is sometimes being called without passing a context!
     * @param context
     * @param fromTemplates
     */
    render(context?: AnyObject, fromTemplates?: boolean): void;
    /**
     * @summary Calculates hash on unit-specific fields.
     * The meaningful fields of processing unit are operation, flavor and input at the moment.
     */
    getHashObject(): object;
    toJSON(): AnyObject;
}
export {};
