import { Application } from "@mat3ra/ade";
import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type DefaultableInMemoryEntityConstructor } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import { type NamedInMemoryEntityConstructor } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { ApplicationSchema, BaseMethod, BaseModel } from "@mat3ra/esse/dist/js/types";
import { type Method, Model, ModelFactory } from "@mat3ra/mode";
import { type SubworkflowSchemaMixin } from "../generated/SubworkflowSchemaMixin";
import { type BaseUnit, UnitFactory } from "../units";
type Base = typeof InMemoryEntity & DefaultableInMemoryEntityConstructor & NamedInMemoryEntityConstructor & Constructor<SubworkflowSchemaMixin>;
declare const Subworkflow_base: Base;
export declare class Subworkflow extends Subworkflow_base {
    static usePredefinedIds: boolean;
    private ModelFactory;
    private UnitFactory;
    private applicationInstance;
    private modelInstance;
    private unitsInstances;
    constructor(config: SubworkflowSchemaMixin, _ModelFactory?: typeof ModelFactory, _UnitFactory?: typeof UnitFactory);
    static generateSubworkflowId(name: string, application?: ApplicationSchema, model?: BaseModel, method?: BaseMethod): any;
    static get defaultConfig(): {
        _id: any;
        name: string;
        application: import("node_modules/@mat3ra/ade/dist/js/applicationMixin").DefaultApplicationConfig;
        model: import("@mat3ra/mode/dist/js/types").ModelConfig;
        properties: never[];
        units: never[];
    };
    getAsUnit(): BaseUnit<import("@mat3ra/esse/dist/js/types").WorkflowBaseUnitSchema>;
    static fromArguments(application: Application, model: Model, method: Method, name: string, units?: BaseUnit[], config?: {}, Cls?: typeof Subworkflow): Subworkflow;
    setApplication(application: Application): void;
    setModel(model: Model): void;
    setUnits(units: BaseUnit[]): void;
    toJSON(exclude?: string[]): {
        compute?: {
            queue: "D" | "OR" | "OF" | "OFplus" | "SR" | "SF" | "SFplus" | "GPOF" | "GP2OF" | "GP4OF" | "GPSF" | "GP2SF" | "GP4SF" | "OR4" | "OR8" | "OR16" | "SR4" | "SR8" | "SR16" | "GOF" | "G4OF" | "G8OF" | "GSF" | "G4SF" | "G8SF";
            nodes: number;
            ppn: number;
            timeLimit: string;
            timeLimitType?: "per single attempt" | "compound";
            isRestartable?: boolean;
            notify?: string;
            email?: string;
            maxCPU?: number;
            arguments?: {
                nimage?: number;
                npools?: number;
                nband?: number;
                ntg?: number;
                ndiag?: number;
            };
            cluster?: {
                fqdn?: string;
                jid?: string;
            };
            errors?: {
                domain?: "rupy" | "alfred" | "celim" | "webapp";
                reason?: string;
                message?: string;
                traceback?: string;
            }[];
            excludeFilesPattern?: string;
        } | undefined;
        model: Record<string, unknown>;
        units: import("@mat3ra/esse/dist/js/esse/types").AnyObject[];
    };
    get contextProviders(): any[];
    /**
     * Extracts a reduced version of the entity config to be stored inside redux state.
     * This is used to track changes to context, monitors, properties, etc. when multiple materials are in state.
     */
    extractReducedExternalDependentConfig(): {
        id: string;
        context: any;
        units: any[];
    };
    /**
     * Applies the reduced config obtained from extractReducedExternalDependentConfig on the entity.
     */
    applyReducedExternalDependentConfig(config: any): void;
    get contextFromAssignmentUnits(): {};
    render(context?: {}): void;
    /**
     * TODO: reuse workflow function instead
     */
    addUnit(unit: BaseUnit, index?: number): void;
    removeUnit(flowchartId: string): void;
    get properties(): any[];
    getUnit(flowchartId: string): {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "io";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        subtype: "input" | "output" | "dataFrame";
        source: "api" | "db" | "object_storage";
        input: ({
            type: "db_ids";
            ids: string[];
        } | {
            type: "db_collection";
            collection: string;
            draft: boolean;
        } | {
            type: "object_storage";
            objectData: {
                CONTAINER?: string;
                NAME?: string;
                PROVIDER?: string;
                REGION?: string;
                SIZE?: number;
                TIMESTAMP?: string;
            };
            overwrite?: boolean;
            pathname?: string;
            basename?: string;
            filetype?: string;
        })[];
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "reduce";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        mapFlowchartId: string;
        input: {
            operation: string;
            arguments: string[];
        }[];
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "condition";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        input: {
            scope: string;
            name: string;
        }[];
        statement: string;
        then: string;
        else: string;
        maxOccurrences: number;
        throwException?: boolean;
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "assertion";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        statement: string;
        errorMessage?: string;
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "execution";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        application: {
            _id?: string;
            slug?: string;
            systemName?: string;
            schemaVersion?: string;
            name: string;
            isDefault?: boolean;
            shortName: string;
            summary: string;
            version: string;
            build: string;
            hasAdvancedComputeOptions?: boolean;
            isLicensed?: boolean;
        };
        executable?: {
            _id?: string;
            slug?: string;
            systemName?: string;
            schemaVersion?: string;
            name: string;
            isDefault?: boolean;
            preProcessors: {
                name: string;
            }[];
            postProcessors: {
                name: string;
            }[];
            monitors: {
                name: string;
            }[];
            results: {
                name: string;
            }[];
            applicationId: string[];
            hasAdvancedComputeOptions?: boolean;
        };
        flavor?: {
            _id?: string;
            slug?: string;
            systemName?: string;
            schemaVersion?: string;
            name: string;
            isDefault?: boolean;
            preProcessors: {
                name: string;
            }[];
            postProcessors: {
                name: string;
            }[];
            monitors: {
                name: string;
            }[];
            results: {
                name: string;
            }[];
            executableId: string;
            executableName?: string;
            applicationName?: string;
            input: {
                templateId?: string;
                templateName?: string;
                name?: string;
            }[];
            supportedApplicationVersions?: string[];
        };
        input: {
            template: {
                _id?: string;
                slug?: string;
                systemName?: string;
                schemaVersion?: string;
                name: string;
                applicationName: string;
                applicationVersion?: string;
                executableName: string;
                contextProviders: {
                    name: string;
                }[];
                content: string;
            };
            rendered: string;
            isManuallyChanged: boolean;
        }[];
        context?: {
            name: import("@mat3ra/esse/dist/js/types").ContextProviderNameEnum;
            isEdited: boolean;
            data: {};
            extraData?: {};
        }[];
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "assignment";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        scope?: string;
        input?: {
            scope: string;
            name: string;
        }[];
        operand: string;
        value: string | boolean | number;
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "processing";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        operation: string;
        operationType: string;
        inputData: {
            [k: string]: unknown;
        };
    } | undefined;
    unitIndex(flowchartId: string): number;
    replaceUnit(index: number, unit: BaseUnit): void;
    get scopeVariables(): string[];
    get scalarResults(): string[];
    get isMultiMaterial(): boolean;
    get isDraft(): boolean;
    setIsDraft(bool: boolean): void;
    get methodData(): any;
    /**
     * @summary Calculates hash of the subworkflow. Meaningful fields are units, app and model.
     * units must be sorted topologically before hashing (already sorted).
     */
    calculateHash(): string;
    _calculateModelHash(): string;
    findUnitById(id: string): {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "io";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        subtype: "input" | "output" | "dataFrame";
        source: "api" | "db" | "object_storage";
        input: ({
            type: "db_ids";
            ids: string[];
        } | {
            type: "db_collection";
            collection: string;
            draft: boolean;
        } | {
            type: "object_storage";
            objectData: {
                CONTAINER?: string;
                NAME?: string;
                PROVIDER?: string;
                REGION?: string;
                SIZE?: number;
                TIMESTAMP?: string;
            };
            overwrite?: boolean;
            pathname?: string;
            basename?: string;
            filetype?: string;
        })[];
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "reduce";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        mapFlowchartId: string;
        input: {
            operation: string;
            arguments: string[];
        }[];
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "condition";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        input: {
            scope: string;
            name: string;
        }[];
        statement: string;
        then: string;
        else: string;
        maxOccurrences: number;
        throwException?: boolean;
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "assertion";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        statement: string;
        errorMessage?: string;
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "execution";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        application: {
            _id?: string;
            slug?: string;
            systemName?: string;
            schemaVersion?: string;
            name: string;
            isDefault?: boolean;
            shortName: string;
            summary: string;
            version: string;
            build: string;
            hasAdvancedComputeOptions?: boolean;
            isLicensed?: boolean;
        };
        executable?: {
            _id?: string;
            slug?: string;
            systemName?: string;
            schemaVersion?: string;
            name: string;
            isDefault?: boolean;
            preProcessors: {
                name: string;
            }[];
            postProcessors: {
                name: string;
            }[];
            monitors: {
                name: string;
            }[];
            results: {
                name: string;
            }[];
            applicationId: string[];
            hasAdvancedComputeOptions?: boolean;
        };
        flavor?: {
            _id?: string;
            slug?: string;
            systemName?: string;
            schemaVersion?: string;
            name: string;
            isDefault?: boolean;
            preProcessors: {
                name: string;
            }[];
            postProcessors: {
                name: string;
            }[];
            monitors: {
                name: string;
            }[];
            results: {
                name: string;
            }[];
            executableId: string;
            executableName?: string;
            applicationName?: string;
            input: {
                templateId?: string;
                templateName?: string;
                name?: string;
            }[];
            supportedApplicationVersions?: string[];
        };
        input: {
            template: {
                _id?: string;
                slug?: string;
                systemName?: string;
                schemaVersion?: string;
                name: string;
                applicationName: string;
                applicationVersion?: string;
                executableName: string;
                contextProviders: {
                    name: string;
                }[];
                content: string;
            };
            rendered: string;
            isManuallyChanged: boolean;
        }[];
        context?: {
            name: import("@mat3ra/esse/dist/js/types").ContextProviderNameEnum;
            isEdited: boolean;
            data: {};
            extraData?: {};
        }[];
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "assignment";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        scope?: string;
        input?: {
            scope: string;
            name: string;
        }[];
        operand: string;
        value: string | boolean | number;
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "processing";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        operation: string;
        operationType: string;
        inputData: {
            [k: string]: unknown;
        };
    } | undefined;
    findUnitKeyById(id: string): string;
    findUnitWithTag(tag: string): {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "io";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        subtype: "input" | "output" | "dataFrame";
        source: "api" | "db" | "object_storage";
        input: ({
            type: "db_ids";
            ids: string[];
        } | {
            type: "db_collection";
            collection: string;
            draft: boolean;
        } | {
            type: "object_storage";
            objectData: {
                CONTAINER?: string;
                NAME?: string;
                PROVIDER?: string;
                REGION?: string;
                SIZE?: number;
                TIMESTAMP?: string;
            };
            overwrite?: boolean;
            pathname?: string;
            basename?: string;
            filetype?: string;
        })[];
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "reduce";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        mapFlowchartId: string;
        input: {
            operation: string;
            arguments: string[];
        }[];
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "condition";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        input: {
            scope: string;
            name: string;
        }[];
        statement: string;
        then: string;
        else: string;
        maxOccurrences: number;
        throwException?: boolean;
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "assertion";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        statement: string;
        errorMessage?: string;
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "execution";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        application: {
            _id?: string;
            slug?: string;
            systemName?: string;
            schemaVersion?: string;
            name: string;
            isDefault?: boolean;
            shortName: string;
            summary: string;
            version: string;
            build: string;
            hasAdvancedComputeOptions?: boolean;
            isLicensed?: boolean;
        };
        executable?: {
            _id?: string;
            slug?: string;
            systemName?: string;
            schemaVersion?: string;
            name: string;
            isDefault?: boolean;
            preProcessors: {
                name: string;
            }[];
            postProcessors: {
                name: string;
            }[];
            monitors: {
                name: string;
            }[];
            results: {
                name: string;
            }[];
            applicationId: string[];
            hasAdvancedComputeOptions?: boolean;
        };
        flavor?: {
            _id?: string;
            slug?: string;
            systemName?: string;
            schemaVersion?: string;
            name: string;
            isDefault?: boolean;
            preProcessors: {
                name: string;
            }[];
            postProcessors: {
                name: string;
            }[];
            monitors: {
                name: string;
            }[];
            results: {
                name: string;
            }[];
            executableId: string;
            executableName?: string;
            applicationName?: string;
            input: {
                templateId?: string;
                templateName?: string;
                name?: string;
            }[];
            supportedApplicationVersions?: string[];
        };
        input: {
            template: {
                _id?: string;
                slug?: string;
                systemName?: string;
                schemaVersion?: string;
                name: string;
                applicationName: string;
                applicationVersion?: string;
                executableName: string;
                contextProviders: {
                    name: string;
                }[];
                content: string;
            };
            rendered: string;
            isManuallyChanged: boolean;
        }[];
        context?: {
            name: import("@mat3ra/esse/dist/js/types").ContextProviderNameEnum;
            isEdited: boolean;
            data: {};
            extraData?: {};
        }[];
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "assignment";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        scope?: string;
        input?: {
            scope: string;
            name: string;
        }[];
        operand: string;
        value: string | boolean | number;
    } | {
        _id?: string;
        slug?: string;
        systemName?: string;
        schemaVersion?: string;
        name: string;
        isDefault?: boolean;
        preProcessors: {
            name: string;
        }[];
        postProcessors: {
            name: string;
        }[];
        monitors: {
            name: string;
        }[];
        results: {
            name: string;
        }[];
        tags?: string[];
        status?: "idle" | "active" | "warning" | "error" | "finished";
        statusTrack?: {
            trackedAt: number;
            status: string;
            repetition?: number;
        }[];
        isDraft?: boolean;
        type: "processing";
        head?: boolean;
        flowchartId: string;
        next?: string;
        enableRender?: boolean;
        operation: string;
        operationType: string;
        inputData: {
            [k: string]: unknown;
        };
    } | undefined;
    get hasConvergence(): boolean;
}
export {};
