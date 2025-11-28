export class ExecutionUnit {
    static omitKeys: string[];
    static getSubworkflowContext(context: any): {
        subworkflowContext: any;
    } | {
        subworkflowContext?: undefined;
    };
    /**
     * @override this method to provide entities from other sources
     */
    override _initApplication(config: any): void;
    _application: any;
    _executable: any;
    _flavor: any;
    _templates: any;
    /**
     * @override this method to provide default executable from other source
     */
    override _getDefaultExecutable(): import("@mat3ra/ade").Executable;
    /**
     * @override this method to provide default flavor from other source
     */
    override _getDefaultFlavor(): import("@mat3ra/ade").Flavor | undefined;
    /**
     * @override this method to provide custom templates
     */
    override _getTemplatesFromInput(): any;
    /**
     * @override this method to provide custom input from other sources
     */
    override _getInput(): any;
    /**
     * @override this method to provide custom input as templates
     */
    override _getInputAsTemplates(): Template[];
    _initRuntimeItems(keys: any, config: any): void;
    get hashFromArrayInputContent(): string;
    get name(): any;
    get application(): any;
    get executable(): any;
    get flavor(): any;
    get templates(): any;
    setApplication(application: any, omitSettingExecutable?: boolean): void;
    setExecutable(executable: any): void;
    setFlavor(flavor: any): void;
    setTemplates(templates: any): void;
    setInput(input: any): void;
    get defaultResults(): any;
    get defaultMonitors(): any;
    get defaultPostProcessors(): any;
    get allowedResults(): any;
    get allowedMonitors(): any;
    get allowedPostProcessors(): any;
    get allContextProviders(): any[];
    get contextProviders(): any[];
    get input(): any;
    set renderingContext(ctx: any);
    get renderingContext(): any;
    _renderingContext: any;
    get storedContext(): any;
    get visibleRenderingContext(): any;
    /** Update rendering context and persistent context
     * Note: this function is sometimes being called without passing a context!
     * @param context
     * @param fromTemplates
     */
    render(context: any, fromTemplates?: boolean): void;
    /**
     * @summary Calculates hash on unit-specific fields.
     * The meaningful fields of processing unit are operation, flavor and input at the moment.
     */
    getHashObject(): any;
    toJSON(): any;
}
import { Template } from "@mat3ra/ade";
