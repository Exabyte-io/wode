import { Application, ApplicationRegistry as AdeRegistry, Executable, Flavor } from "@mat3ra/ade";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type {
    ContextItemSchema,
    ExecutableSchema,
    ExecutionUnitSchema,
    FlavorSchema,
} from "@mat3ra/esse/dist/js/types";
import { Utils } from "@mat3ra/utils";

import { contextMixin } from "../context/mixins/ContextAndRenderFieldsMixin";
import {
    type ImportantSettingsProvider,
    importantSettingsProviderMixin,
} from "../context/mixins/ImportantSettingsProviderMixin";
import { type ExternalContext, createProvider } from "../context/providers";
import ExecutionUnitInput from "../ExecutionUnitInput";
import {
    type ExecutionUnitSchemaMixin,
    executionUnitSchemaMixin,
} from "../generated/ExecutionUnitSchemaMixin";
import type ConvergenceParameter from "../subworkflows/convergence/ConvergenceParameter";
import { BaseUnit } from "./BaseUnit";

type Schema = ExecutionUnitSchema;
type Base = typeof BaseUnit &
    Constructor<ExecutionUnitSchemaMixin> &
    Constructor<ImportantSettingsProvider>;

interface SetApplicationProps {
    application: Application;
    executable?: Executable | ExecutableSchema;
    flavor?: Flavor | FlavorSchema;
}

interface SetExecutableProps {
    executable?: Executable | ExecutableSchema;
    flavor?: Flavor | FlavorSchema;
}

export class ExecutionUnit extends (BaseUnit as Base) implements Schema {
    applicationInstance!: Application;

    executableInstance!: Executable;

    flavorInstance!: Flavor;

    inputInstances: ExecutionUnitInput[] = [];

    renderingContext: Record<string, unknown> = {};

    declare toJSON: () => Schema & AnyObject;

    constructor(config: Schema) {
        super(config);

        const { application, executable, flavor } = config;
        const applicationInstance = AdeRegistry.createApplication(application);
        const executableInstance = AdeRegistry.getExecutableByConfig(application.name, executable);
        const flavorInstance = AdeRegistry.getFlavorByConfig(executableInstance, flavor);

        if (!flavorInstance) {
            throw new Error("Flavor is not set");
        }

        this.setApplication({
            application: applicationInstance,
            executable: executableInstance,
            flavor: flavorInstance,
        });

        this.name = this.name || this.flavor?.name || "";
    }

    setApplication({ application, executable, flavor }: SetApplicationProps) {
        this.applicationInstance = application;
        this.setProp("application", application.toJSON());
        this.setExecutable({ executable, flavor });
    }

    setExecutable({ executable, flavor }: SetExecutableProps) {
        const defaultExecutable = AdeRegistry.getExecutableByName(this.application.name);
        const instance =
            executable instanceof Executable
                ? executable
                : new Executable(executable ?? defaultExecutable.toJSON());

        this.allowedResults = instance.results;
        this.allowedMonitors = instance.monitors;
        this.allowedPostProcessors = instance.postProcessors;

        this.setProp("executable", instance.toJSON());
        this.setFlavor(flavor);
    }

    setFlavor(flavor?: Flavor | FlavorSchema) {
        const defaultFlavor = AdeRegistry.getFlavorByConfig(this.executableInstance);
        const instance =
            flavor instanceof Flavor ? flavor : new Flavor(flavor ?? defaultFlavor?.toJSON());

        if (!instance) {
            throw new Error("Flavor is not found for executable");
        }

        this.flavorInstance = instance;
        this.defaultMonitors = instance.monitors;
        this.defaultResults = instance.results;
        this.defaultPostProcessors = instance.postProcessors;

        this.setProp("flavor", instance.toJSON());
        this.setRuntimeItemsToDefaultValues();
        this.setDefaultInput();
    }

    setDefaultInput() {
        const inputs = AdeRegistry.getInput(this.flavorInstance);
        this.inputInstances = inputs.map(ExecutionUnitInput.createFromTemplate);
    }

    getContextProvidersInstances(externalContext: ExternalContext) {
        const uniqueContextProviderNames = [
            ...new Set(
                this.inputInstances
                    .map((input) => {
                        return input.template.contextProviders.map((provider) => {
                            return provider.name;
                        });
                    })
                    .flat(),
            ),
        ];

        return uniqueContextProviderNames.map((name) => {
            return createProvider(name, this.context, externalContext);
        });
    }

    addConvergenceContext(parameter: ConvergenceParameter, externalContext: ExternalContext) {
        // TODO: kgrid should be abstracted and selected by user
        const parameterToContextProviderMap = {
            N_k: "kgrid",
            N_k_nonuniform: "kgrid",
        } as const;

        const contextName = parameterToContextProviderMap[parameter.name];

        const fullContext = this.getContextProvidersInstances(externalContext).map(
            (contextProvider) => {
                if (contextProvider.name === contextName) {
                    contextProvider.applyCovergenceParameter(parameter);
                    return contextProvider.getContextItemData();
                }
                return contextProvider.getContextItemData();
            },
        );

        this.saveContext(fullContext);
    }

    render(externalContext: ExternalContext) {
        const fullContext = this.getContextProvidersInstances(externalContext).map(
            (contextProvider) => {
                return contextProvider.getContextItemData();
            },
        );

        this.saveContext(fullContext);

        this.input = this.inputInstances.map((input) => {
            return input.render(this.renderingContext).toJSON();
        });
    }

    private saveContext(fullContext: ContextItemSchema[]) {
        // persistent context
        this.context = fullContext.filter((c) => c.isEdited);

        this.renderingContext = Object.fromEntries(
            fullContext.map((context) => {
                return [context.name, context.data];
            }),
        );
    }

    /**
     * @summary Calculates hash on unit-specific fields.
     * The meaningful fields of processing unit are operation, flavor and input at the moment.
     */
    getHashObject() {
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
            input: Utils.hash.calculateHashFromObject(
                this.input.map((i) => {
                    return Utils.str.removeEmptyLinesFromString(
                        Utils.str.removeCommentsFromSourceCode(i.template.content),
                    );
                }),
            ),
        };
    }

    // toJSON() {
    //     const json = super.toJSON() as ExecutionUnitSchemaBase & AnyObject;

    //     // Remove results from executable; TODO: why do we need this?
    //     if (json.executable) {
    //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //         const { results: _, ...executable } = json.executable;

    //         return {
    //             ...json,
    //             executable: {
    //                 ...executable,
    //             },
    //         };
    //     }

    //     return json;
    // }
}

executionUnitSchemaMixin(ExecutionUnit.prototype);
contextMixin(ExecutionUnit.prototype);
importantSettingsProviderMixin(ExecutionUnit.prototype);
