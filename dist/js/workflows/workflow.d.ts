export class Workflow extends BaseWorkflow {
    static getDefaultComputeConfig: any;
    static jsonSchema: {
        $id: string;
        $schema: string;
        title: string;
        type: string;
        required: string[];
        properties: {
            subworkflows: {
                description: string;
                type: string;
                items: {
                    $schema: string;
                    title: string;
                    type: string;
                    required: string[];
                    properties: {
                        _id: {
                            description: string;
                            type: string;
                        };
                        slug: {
                            description: string;
                            type: string;
                        };
                        systemName: {
                            type: string;
                        };
                        schemaVersion: {
                            description: string;
                            type: string;
                            default: string;
                        };
                        name: {
                            description: string;
                            type: string;
                        };
                        properties: {
                            description: string;
                            type: string;
                            items: {
                                description: string;
                                type: string;
                            };
                        };
                        compute: {
                            $schema: string;
                            title: string;
                            description: string;
                            type: string;
                            required: string[];
                            properties: {
                                queue: {
                                    description: string;
                                    type: string;
                                    enum: string[];
                                };
                                nodes: {
                                    description: string;
                                    type: string;
                                };
                                ppn: {
                                    description: string;
                                    type: string;
                                };
                                timeLimit: {
                                    description: string;
                                    type: string;
                                };
                                timeLimitType: {
                                    description: string;
                                    type: string;
                                    default: string;
                                    enum: string[];
                                };
                                isRestartable: {
                                    description: string;
                                    type: string;
                                    default: boolean;
                                };
                                notify: {
                                    description: string;
                                    type: string;
                                };
                                email: {
                                    description: string;
                                    type: string;
                                };
                                maxCPU: {
                                    description: string;
                                    type: string;
                                };
                                arguments: {
                                    description: string;
                                    default: {};
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    additionalProperties: boolean;
                                    properties: {
                                        nimage: {
                                            description: string;
                                            type: string;
                                            default: number;
                                            minimum: number;
                                            maximum: number;
                                        };
                                        npools: {
                                            description: string;
                                            type: string;
                                            default: number;
                                            minimum: number;
                                            maximum: number;
                                        };
                                        nband: {
                                            description: string;
                                            type: string;
                                            default: number;
                                            minimum: number;
                                            maximum: number;
                                        };
                                        ntg: {
                                            description: string;
                                            type: string;
                                            default: number;
                                            minimum: number;
                                            maximum: number;
                                        };
                                        ndiag: {
                                            description: string;
                                            type: string;
                                            default: number;
                                            minimum: number;
                                            maximum: number;
                                        };
                                    };
                                };
                                cluster: {
                                    description: string;
                                    type: string;
                                    properties: {
                                        fqdn: {
                                            description: string;
                                            type: string;
                                        };
                                        jid: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                                errors: {
                                    description: string;
                                    type: string;
                                    items: {
                                        type: string;
                                        properties: {
                                            domain: {
                                                description: string;
                                                type: string;
                                                enum: string[];
                                            };
                                            reason: {
                                                description: string;
                                                type: string;
                                            };
                                            message: {
                                                description: string;
                                                type: string;
                                            };
                                            traceback: {
                                                description: string;
                                                type: string;
                                            };
                                        };
                                    };
                                };
                                excludeFilesPattern: {
                                    description: string;
                                    type: string;
                                };
                            };
                        };
                        units: {
                            description: string;
                            type: string;
                            items: {
                                $schema: string;
                                title: string;
                                type: string;
                                oneOf: ({
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        _id: {
                                            description: string;
                                            type: string;
                                        };
                                        slug: {
                                            description: string;
                                            type: string;
                                        };
                                        systemName: {
                                            type: string;
                                        };
                                        schemaVersion: {
                                            description: string;
                                            type: string;
                                            default: string;
                                        };
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                        isDefault: {
                                            description: string;
                                            type: string;
                                            default: boolean;
                                        };
                                        preProcessors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        postProcessors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        monitors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        results: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        tags: {
                                            description: string;
                                            type: string;
                                            items: {
                                                type: string;
                                            };
                                        };
                                        status: {
                                            type: string;
                                            description: string;
                                            enum: string[];
                                        };
                                        statusTrack: {
                                            type: string;
                                            items: {
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    trackedAt: {
                                                        type: string;
                                                    };
                                                    status: {
                                                        type: string;
                                                    };
                                                    repetition: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        isDraft: {
                                            type: string;
                                        };
                                        type: {
                                            description: string;
                                            type: string;
                                            const: string;
                                        };
                                        head: {
                                            description: string;
                                            type: string;
                                        };
                                        flowchartId: {
                                            description: string;
                                            type: string;
                                        };
                                        next: {
                                            description: string;
                                            type: string;
                                        };
                                        enableRender: {
                                            description: string;
                                            type: string;
                                        };
                                        subtype: {
                                            enum: string[];
                                        };
                                        source: {
                                            enum: string[];
                                        };
                                        input: {
                                            type: string;
                                            items: {
                                                oneOf: ({
                                                    $schema: string;
                                                    title: string;
                                                    type: string;
                                                    properties: {
                                                        type: {
                                                            const: string;
                                                        };
                                                        ids: {
                                                            description: string;
                                                            type: string;
                                                            items: {
                                                                type: string;
                                                            };
                                                        };
                                                        collection?: undefined;
                                                        draft?: undefined;
                                                        objectData?: undefined;
                                                        overwrite?: undefined;
                                                        pathname?: undefined;
                                                        basename?: undefined;
                                                        filetype?: undefined;
                                                    };
                                                    required: string[];
                                                } | {
                                                    $schema: string;
                                                    title: string;
                                                    type: string;
                                                    properties: {
                                                        type: {
                                                            const: string;
                                                        };
                                                        collection: {
                                                            description: string;
                                                            type: string;
                                                        };
                                                        draft: {
                                                            description: string;
                                                            type: string;
                                                        };
                                                        ids?: undefined;
                                                        objectData?: undefined;
                                                        overwrite?: undefined;
                                                        pathname?: undefined;
                                                        basename?: undefined;
                                                        filetype?: undefined;
                                                    };
                                                    required: string[];
                                                } | {
                                                    $schema: string;
                                                    title: string;
                                                    type: string;
                                                    required: string[];
                                                    properties: {
                                                        type: {
                                                            const: string;
                                                        };
                                                        objectData: {
                                                            $schema: string;
                                                            title: string;
                                                            type: string;
                                                            properties: {
                                                                CONTAINER: {
                                                                    description: string;
                                                                    type: string;
                                                                };
                                                                NAME: {
                                                                    description: string;
                                                                    type: string;
                                                                };
                                                                PROVIDER: {
                                                                    description: string;
                                                                    type: string;
                                                                };
                                                                REGION: {
                                                                    description: string;
                                                                    type: string;
                                                                };
                                                                SIZE: {
                                                                    description: string;
                                                                    type: string;
                                                                };
                                                                TIMESTAMP: {
                                                                    description: string;
                                                                    type: string;
                                                                };
                                                            };
                                                        };
                                                        overwrite: {
                                                            description: string;
                                                            type: string;
                                                        };
                                                        pathname: {
                                                            description: string;
                                                            type: string;
                                                        };
                                                        basename: {
                                                            description: string;
                                                            type: string;
                                                            $comment: string;
                                                        };
                                                        filetype: {
                                                            description: string;
                                                            type: string;
                                                        };
                                                        ids?: undefined;
                                                        collection?: undefined;
                                                        draft?: undefined;
                                                    };
                                                })[];
                                                discriminator: {
                                                    propertyName: string;
                                                };
                                                type?: undefined;
                                                required?: undefined;
                                                properties?: undefined;
                                                $schema?: undefined;
                                                title?: undefined;
                                            };
                                            description?: undefined;
                                        };
                                        mapFlowchartId?: undefined;
                                        statement?: undefined;
                                        then?: undefined;
                                        else?: undefined;
                                        maxOccurrences?: undefined;
                                        throwException?: undefined;
                                        errorMessage?: undefined;
                                        application?: undefined;
                                        executable?: undefined;
                                        flavor?: undefined;
                                        context?: undefined;
                                        scope?: undefined;
                                        operand?: undefined;
                                        value?: undefined;
                                        operation?: undefined;
                                        operationType?: undefined;
                                        inputData?: undefined;
                                    };
                                } | {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        _id: {
                                            description: string;
                                            type: string;
                                        };
                                        slug: {
                                            description: string;
                                            type: string;
                                        };
                                        systemName: {
                                            type: string;
                                        };
                                        schemaVersion: {
                                            description: string;
                                            type: string;
                                            default: string;
                                        };
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                        isDefault: {
                                            description: string;
                                            type: string;
                                            default: boolean;
                                        };
                                        preProcessors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        postProcessors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        monitors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        results: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        tags: {
                                            description: string;
                                            type: string;
                                            items: {
                                                type: string;
                                            };
                                        };
                                        status: {
                                            type: string;
                                            description: string;
                                            enum: string[];
                                        };
                                        statusTrack: {
                                            type: string;
                                            items: {
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    trackedAt: {
                                                        type: string;
                                                    };
                                                    status: {
                                                        type: string;
                                                    };
                                                    repetition: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        isDraft: {
                                            type: string;
                                        };
                                        type: {
                                            description: string;
                                            type: string;
                                            const: string;
                                        };
                                        head: {
                                            description: string;
                                            type: string;
                                        };
                                        flowchartId: {
                                            description: string;
                                            type: string;
                                        };
                                        next: {
                                            description: string;
                                            type: string;
                                        };
                                        enableRender: {
                                            description: string;
                                            type: string;
                                        };
                                        mapFlowchartId: {
                                            description: string;
                                            type: string;
                                        };
                                        input: {
                                            description: string;
                                            type: string;
                                            items: {
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    operation: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                    arguments: {
                                                        description: string;
                                                        type: string;
                                                        items: {
                                                            type: string;
                                                        };
                                                    };
                                                    scope?: undefined;
                                                    name?: undefined;
                                                    template?: undefined;
                                                    rendered?: undefined;
                                                    isManuallyChanged?: undefined;
                                                };
                                                oneOf?: undefined;
                                                discriminator?: undefined;
                                                $schema?: undefined;
                                                title?: undefined;
                                            };
                                        };
                                        subtype?: undefined;
                                        source?: undefined;
                                        statement?: undefined;
                                        then?: undefined;
                                        else?: undefined;
                                        maxOccurrences?: undefined;
                                        throwException?: undefined;
                                        errorMessage?: undefined;
                                        application?: undefined;
                                        executable?: undefined;
                                        flavor?: undefined;
                                        context?: undefined;
                                        scope?: undefined;
                                        operand?: undefined;
                                        value?: undefined;
                                        operation?: undefined;
                                        operationType?: undefined;
                                        inputData?: undefined;
                                    };
                                } | {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        _id: {
                                            description: string;
                                            type: string;
                                        };
                                        slug: {
                                            description: string;
                                            type: string;
                                        };
                                        systemName: {
                                            type: string;
                                        };
                                        schemaVersion: {
                                            description: string;
                                            type: string;
                                            default: string;
                                        };
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                        isDefault: {
                                            description: string;
                                            type: string;
                                            default: boolean;
                                        };
                                        preProcessors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        postProcessors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        monitors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        results: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        tags: {
                                            description: string;
                                            type: string;
                                            items: {
                                                type: string;
                                            };
                                        };
                                        status: {
                                            type: string;
                                            description: string;
                                            enum: string[];
                                        };
                                        statusTrack: {
                                            type: string;
                                            items: {
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    trackedAt: {
                                                        type: string;
                                                    };
                                                    status: {
                                                        type: string;
                                                    };
                                                    repetition: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        isDraft: {
                                            type: string;
                                        };
                                        type: {
                                            description: string;
                                            type: string;
                                            const: string;
                                        };
                                        head: {
                                            description: string;
                                            type: string;
                                        };
                                        flowchartId: {
                                            description: string;
                                            type: string;
                                        };
                                        next: {
                                            description: string;
                                            type: string;
                                        };
                                        enableRender: {
                                            description: string;
                                            type: string;
                                        };
                                        input: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    scope: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                    operation?: undefined;
                                                    arguments?: undefined;
                                                    template?: undefined;
                                                    rendered?: undefined;
                                                    isManuallyChanged?: undefined;
                                                };
                                                oneOf?: undefined;
                                                discriminator?: undefined;
                                            };
                                        };
                                        statement: {
                                            description: string;
                                            type: string;
                                        };
                                        then: {
                                            description: string;
                                            type: string;
                                        };
                                        else: {
                                            description: string;
                                            type: string;
                                        };
                                        maxOccurrences: {
                                            description: string;
                                            type: string;
                                        };
                                        throwException: {
                                            description: string;
                                            type: string;
                                        };
                                        subtype?: undefined;
                                        source?: undefined;
                                        mapFlowchartId?: undefined;
                                        errorMessage?: undefined;
                                        application?: undefined;
                                        executable?: undefined;
                                        flavor?: undefined;
                                        context?: undefined;
                                        scope?: undefined;
                                        operand?: undefined;
                                        value?: undefined;
                                        operation?: undefined;
                                        operationType?: undefined;
                                        inputData?: undefined;
                                    };
                                } | {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        _id: {
                                            description: string;
                                            type: string;
                                        };
                                        slug: {
                                            description: string;
                                            type: string;
                                        };
                                        systemName: {
                                            type: string;
                                        };
                                        schemaVersion: {
                                            description: string;
                                            type: string;
                                            default: string;
                                        };
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                        isDefault: {
                                            description: string;
                                            type: string;
                                            default: boolean;
                                        };
                                        preProcessors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        postProcessors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        monitors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        results: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        tags: {
                                            description: string;
                                            type: string;
                                            items: {
                                                type: string;
                                            };
                                        };
                                        status: {
                                            type: string;
                                            description: string;
                                            enum: string[];
                                        };
                                        statusTrack: {
                                            type: string;
                                            items: {
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    trackedAt: {
                                                        type: string;
                                                    };
                                                    status: {
                                                        type: string;
                                                    };
                                                    repetition: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        isDraft: {
                                            type: string;
                                        };
                                        type: {
                                            description: string;
                                            type: string;
                                            const: string;
                                        };
                                        head: {
                                            description: string;
                                            type: string;
                                        };
                                        flowchartId: {
                                            description: string;
                                            type: string;
                                        };
                                        next: {
                                            description: string;
                                            type: string;
                                        };
                                        enableRender: {
                                            description: string;
                                            type: string;
                                        };
                                        statement: {
                                            type: string;
                                            description: string;
                                        };
                                        errorMessage: {
                                            type: string;
                                            description: string;
                                        };
                                        subtype?: undefined;
                                        source?: undefined;
                                        input?: undefined;
                                        mapFlowchartId?: undefined;
                                        then?: undefined;
                                        else?: undefined;
                                        maxOccurrences?: undefined;
                                        throwException?: undefined;
                                        application?: undefined;
                                        executable?: undefined;
                                        flavor?: undefined;
                                        context?: undefined;
                                        scope?: undefined;
                                        operand?: undefined;
                                        value?: undefined;
                                        operation?: undefined;
                                        operationType?: undefined;
                                        inputData?: undefined;
                                    };
                                } | {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        _id: {
                                            description: string;
                                            type: string;
                                        };
                                        slug: {
                                            description: string;
                                            type: string;
                                        };
                                        systemName: {
                                            type: string;
                                        };
                                        schemaVersion: {
                                            description: string;
                                            type: string;
                                            default: string;
                                        };
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                        isDefault: {
                                            description: string;
                                            type: string;
                                            default: boolean;
                                        };
                                        preProcessors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        postProcessors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        monitors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        results: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        tags: {
                                            description: string;
                                            type: string;
                                            items: {
                                                type: string;
                                            };
                                        };
                                        status: {
                                            type: string;
                                            description: string;
                                            enum: string[];
                                        };
                                        statusTrack: {
                                            type: string;
                                            items: {
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    trackedAt: {
                                                        type: string;
                                                    };
                                                    status: {
                                                        type: string;
                                                    };
                                                    repetition: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        isDraft: {
                                            type: string;
                                        };
                                        type: {
                                            description: string;
                                            type: string;
                                            const: string;
                                        };
                                        head: {
                                            description: string;
                                            type: string;
                                        };
                                        flowchartId: {
                                            description: string;
                                            type: string;
                                        };
                                        next: {
                                            description: string;
                                            type: string;
                                        };
                                        enableRender: {
                                            description: string;
                                            type: string;
                                        };
                                        application: {
                                            $schema: string;
                                            title: string;
                                            type: string;
                                            required: string[];
                                            properties: {
                                                _id: {
                                                    description: string;
                                                    type: string;
                                                };
                                                slug: {
                                                    description: string;
                                                    type: string;
                                                };
                                                systemName: {
                                                    type: string;
                                                };
                                                schemaVersion: {
                                                    description: string;
                                                    type: string;
                                                    default: string;
                                                };
                                                name: {
                                                    description: string;
                                                    type: string;
                                                };
                                                isDefault: {
                                                    description: string;
                                                    type: string;
                                                    default: boolean;
                                                };
                                                shortName: {
                                                    description: string;
                                                    type: string;
                                                };
                                                summary: {
                                                    description: string;
                                                    type: string;
                                                };
                                                version: {
                                                    description: string;
                                                    type: string;
                                                };
                                                build: {
                                                    description: string;
                                                    type: string;
                                                };
                                                hasAdvancedComputeOptions: {
                                                    description: string;
                                                    type: string;
                                                };
                                                isLicensed: {
                                                    description: string;
                                                    type: string;
                                                };
                                            };
                                        };
                                        executable: {
                                            $schema: string;
                                            title: string;
                                            type: string;
                                            required: string[];
                                            properties: {
                                                _id: {
                                                    description: string;
                                                    type: string;
                                                };
                                                slug: {
                                                    description: string;
                                                    type: string;
                                                };
                                                systemName: {
                                                    type: string;
                                                };
                                                schemaVersion: {
                                                    description: string;
                                                    type: string;
                                                    default: string;
                                                };
                                                name: {
                                                    description: string;
                                                    type: string;
                                                };
                                                isDefault: {
                                                    description: string;
                                                    type: string;
                                                    default: boolean;
                                                };
                                                preProcessors: {
                                                    description: string;
                                                    type: string;
                                                    items: {
                                                        $schema: string;
                                                        title: string;
                                                        type: string;
                                                        required: string[];
                                                        properties: {
                                                            name: {
                                                                description: string;
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                };
                                                postProcessors: {
                                                    description: string;
                                                    type: string;
                                                    items: {
                                                        $schema: string;
                                                        title: string;
                                                        type: string;
                                                        required: string[];
                                                        properties: {
                                                            name: {
                                                                description: string;
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                };
                                                monitors: {
                                                    description: string;
                                                    type: string;
                                                    items: {
                                                        $schema: string;
                                                        title: string;
                                                        type: string;
                                                        required: string[];
                                                        properties: {
                                                            name: {
                                                                description: string;
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                };
                                                results: {
                                                    description: string;
                                                    type: string;
                                                    items: {
                                                        $schema: string;
                                                        title: string;
                                                        type: string;
                                                        required: string[];
                                                        properties: {
                                                            name: {
                                                                description: string;
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                };
                                                applicationId: {
                                                    description: string;
                                                    type: string;
                                                    items: {
                                                        type: string;
                                                    };
                                                };
                                                hasAdvancedComputeOptions: {
                                                    description: string;
                                                    type: string;
                                                };
                                            };
                                        };
                                        flavor: {
                                            $schema: string;
                                            title: string;
                                            type: string;
                                            required: string[];
                                            properties: {
                                                _id: {
                                                    description: string;
                                                    type: string;
                                                };
                                                slug: {
                                                    description: string;
                                                    type: string;
                                                };
                                                systemName: {
                                                    type: string;
                                                };
                                                schemaVersion: {
                                                    description: string;
                                                    type: string;
                                                    default: string;
                                                };
                                                name: {
                                                    description: string;
                                                    type: string;
                                                };
                                                isDefault: {
                                                    description: string;
                                                    type: string;
                                                    default: boolean;
                                                };
                                                preProcessors: {
                                                    description: string;
                                                    type: string;
                                                    items: {
                                                        $schema: string;
                                                        title: string;
                                                        type: string;
                                                        required: string[];
                                                        properties: {
                                                            name: {
                                                                description: string;
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                };
                                                postProcessors: {
                                                    description: string;
                                                    type: string;
                                                    items: {
                                                        $schema: string;
                                                        title: string;
                                                        type: string;
                                                        required: string[];
                                                        properties: {
                                                            name: {
                                                                description: string;
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                };
                                                monitors: {
                                                    description: string;
                                                    type: string;
                                                    items: {
                                                        $schema: string;
                                                        title: string;
                                                        type: string;
                                                        required: string[];
                                                        properties: {
                                                            name: {
                                                                description: string;
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                };
                                                results: {
                                                    description: string;
                                                    type: string;
                                                    items: {
                                                        $schema: string;
                                                        title: string;
                                                        type: string;
                                                        required: string[];
                                                        properties: {
                                                            name: {
                                                                description: string;
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                };
                                                executableId: {
                                                    description: string;
                                                    type: string;
                                                };
                                                executableName: {
                                                    description: string;
                                                    type: string;
                                                };
                                                applicationName: {
                                                    description: string;
                                                    type: string;
                                                };
                                                input: {
                                                    title: string;
                                                    type: string;
                                                    items: {
                                                        $schema: string;
                                                        title: string;
                                                        type: string;
                                                        additionalProperties: boolean;
                                                        properties: {
                                                            templateId: {
                                                                type: string;
                                                            };
                                                            templateName: {
                                                                type: string;
                                                            };
                                                            name: {
                                                                description: string;
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                };
                                                supportedApplicationVersions: {
                                                    description: string;
                                                    type: string;
                                                    items: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        input: {
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    template: {
                                                        $schema: string;
                                                        title: string;
                                                        type: string;
                                                        required: string[];
                                                        properties: {
                                                            _id: {
                                                                description: string;
                                                                type: string;
                                                            };
                                                            slug: {
                                                                description: string;
                                                                type: string;
                                                            };
                                                            systemName: {
                                                                type: string;
                                                            };
                                                            schemaVersion: {
                                                                description: string;
                                                                type: string;
                                                                default: string;
                                                            };
                                                            name: {
                                                                description: string;
                                                                type: string;
                                                            };
                                                            applicationName: {
                                                                type: string;
                                                            };
                                                            applicationVersion: {
                                                                type: string;
                                                            };
                                                            executableName: {
                                                                type: string;
                                                            };
                                                            contextProviders: {
                                                                type: string;
                                                                items: {
                                                                    $schema: string;
                                                                    title: string;
                                                                    type: string;
                                                                    required: string[];
                                                                    properties: {
                                                                        name: {
                                                                            description: string;
                                                                            type: string;
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                            content: {
                                                                description: string;
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                    rendered: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                    isManuallyChanged: {
                                                        type: string;
                                                        default: boolean;
                                                    };
                                                    operation?: undefined;
                                                    arguments?: undefined;
                                                    scope?: undefined;
                                                    name?: undefined;
                                                };
                                                oneOf?: undefined;
                                                discriminator?: undefined;
                                            };
                                            description?: undefined;
                                        };
                                        context: {
                                            type: string;
                                            items: {
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        type: string;
                                                        tsType: string;
                                                    };
                                                    isEdited: {
                                                        type: string;
                                                    };
                                                    data: {
                                                        type: string;
                                                    };
                                                    extraData: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        subtype?: undefined;
                                        source?: undefined;
                                        mapFlowchartId?: undefined;
                                        statement?: undefined;
                                        then?: undefined;
                                        else?: undefined;
                                        maxOccurrences?: undefined;
                                        throwException?: undefined;
                                        errorMessage?: undefined;
                                        scope?: undefined;
                                        operand?: undefined;
                                        value?: undefined;
                                        operation?: undefined;
                                        operationType?: undefined;
                                        inputData?: undefined;
                                    };
                                } | {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        _id: {
                                            description: string;
                                            type: string;
                                        };
                                        slug: {
                                            description: string;
                                            type: string;
                                        };
                                        systemName: {
                                            type: string;
                                        };
                                        schemaVersion: {
                                            description: string;
                                            type: string;
                                            default: string;
                                        };
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                        isDefault: {
                                            description: string;
                                            type: string;
                                            default: boolean;
                                        };
                                        preProcessors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        postProcessors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        monitors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        results: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        tags: {
                                            description: string;
                                            type: string;
                                            items: {
                                                type: string;
                                            };
                                        };
                                        status: {
                                            type: string;
                                            description: string;
                                            enum: string[];
                                        };
                                        statusTrack: {
                                            type: string;
                                            items: {
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    trackedAt: {
                                                        type: string;
                                                    };
                                                    status: {
                                                        type: string;
                                                    };
                                                    repetition: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        isDraft: {
                                            type: string;
                                        };
                                        type: {
                                            description: string;
                                            type: string;
                                            const: string;
                                        };
                                        head: {
                                            description: string;
                                            type: string;
                                        };
                                        flowchartId: {
                                            description: string;
                                            type: string;
                                        };
                                        next: {
                                            description: string;
                                            type: string;
                                        };
                                        enableRender: {
                                            description: string;
                                            type: string;
                                        };
                                        scope: {
                                            type: string;
                                        };
                                        input: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    scope: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                    operation?: undefined;
                                                    arguments?: undefined;
                                                    template?: undefined;
                                                    rendered?: undefined;
                                                    isManuallyChanged?: undefined;
                                                };
                                                oneOf?: undefined;
                                                discriminator?: undefined;
                                            };
                                        };
                                        operand: {
                                            description: string;
                                            type: string;
                                        };
                                        value: {
                                            description: string;
                                            oneOf: {
                                                type: string;
                                            }[];
                                        };
                                        subtype?: undefined;
                                        source?: undefined;
                                        mapFlowchartId?: undefined;
                                        statement?: undefined;
                                        then?: undefined;
                                        else?: undefined;
                                        maxOccurrences?: undefined;
                                        throwException?: undefined;
                                        errorMessage?: undefined;
                                        application?: undefined;
                                        executable?: undefined;
                                        flavor?: undefined;
                                        context?: undefined;
                                        operation?: undefined;
                                        operationType?: undefined;
                                        inputData?: undefined;
                                    };
                                } | {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        _id: {
                                            description: string;
                                            type: string;
                                        };
                                        slug: {
                                            description: string;
                                            type: string;
                                        };
                                        systemName: {
                                            type: string;
                                        };
                                        schemaVersion: {
                                            description: string;
                                            type: string;
                                            default: string;
                                        };
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                        isDefault: {
                                            description: string;
                                            type: string;
                                            default: boolean;
                                        };
                                        preProcessors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        postProcessors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        monitors: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        results: {
                                            description: string;
                                            type: string;
                                            items: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    name: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        tags: {
                                            description: string;
                                            type: string;
                                            items: {
                                                type: string;
                                            };
                                        };
                                        status: {
                                            type: string;
                                            description: string;
                                            enum: string[];
                                        };
                                        statusTrack: {
                                            type: string;
                                            items: {
                                                type: string;
                                                required: string[];
                                                properties: {
                                                    trackedAt: {
                                                        type: string;
                                                    };
                                                    status: {
                                                        type: string;
                                                    };
                                                    repetition: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        isDraft: {
                                            type: string;
                                        };
                                        type: {
                                            description: string;
                                            type: string;
                                            const: string;
                                        };
                                        head: {
                                            description: string;
                                            type: string;
                                        };
                                        flowchartId: {
                                            description: string;
                                            type: string;
                                        };
                                        next: {
                                            description: string;
                                            type: string;
                                        };
                                        enableRender: {
                                            description: string;
                                            type: string;
                                        };
                                        operation: {
                                            description: string;
                                            type: string;
                                        };
                                        operationType: {
                                            description: string;
                                            type: string;
                                        };
                                        inputData: {
                                            description: string;
                                        };
                                        subtype?: undefined;
                                        source?: undefined;
                                        input?: undefined;
                                        mapFlowchartId?: undefined;
                                        statement?: undefined;
                                        then?: undefined;
                                        else?: undefined;
                                        maxOccurrences?: undefined;
                                        throwException?: undefined;
                                        errorMessage?: undefined;
                                        application?: undefined;
                                        executable?: undefined;
                                        flavor?: undefined;
                                        context?: undefined;
                                        scope?: undefined;
                                        operand?: undefined;
                                        value?: undefined;
                                    };
                                })[];
                                discriminator: {
                                    propertyName: string;
                                };
                                required: string[];
                            };
                        };
                        model: {
                            $schema: string;
                            title: string;
                            type: string;
                            required: string[];
                            additionalProperties: boolean;
                            properties: {
                                type: {
                                    description: string;
                                    type: string;
                                };
                                subtype: {
                                    description: string;
                                    type: string;
                                };
                                method: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        type: {
                                            description: string;
                                            type: string;
                                        };
                                        subtype: {
                                            description: string;
                                            type: string;
                                        };
                                        precision: {
                                            description: string;
                                            type: string;
                                        };
                                        data: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                        application: {
                            $schema: string;
                            title: string;
                            type: string;
                            required: string[];
                            properties: {
                                _id: {
                                    description: string;
                                    type: string;
                                };
                                slug: {
                                    description: string;
                                    type: string;
                                };
                                systemName: {
                                    type: string;
                                };
                                schemaVersion: {
                                    description: string;
                                    type: string;
                                    default: string;
                                };
                                name: {
                                    description: string;
                                    type: string;
                                };
                                isDefault: {
                                    description: string;
                                    type: string;
                                    default: boolean;
                                };
                                shortName: {
                                    description: string;
                                    type: string;
                                };
                                summary: {
                                    description: string;
                                    type: string;
                                };
                                version: {
                                    description: string;
                                    type: string;
                                };
                                build: {
                                    description: string;
                                    type: string;
                                };
                                hasAdvancedComputeOptions: {
                                    description: string;
                                    type: string;
                                };
                                isLicensed: {
                                    description: string;
                                    type: string;
                                };
                            };
                        };
                        isDraft: {
                            description: string;
                            type: string;
                            default: boolean;
                        };
                    };
                };
            };
            units: {
                description: string;
                type: string;
                items: {
                    $schema: string;
                    title: string;
                    type: string;
                    oneOf: ({
                        $schema: string;
                        title: string;
                        type: string;
                        required: string[];
                        properties: {
                            _id: {
                                description: string;
                                type: string;
                            };
                            slug: {
                                description: string;
                                type: string;
                            };
                            systemName: {
                                type: string;
                            };
                            schemaVersion: {
                                description: string;
                                type: string;
                                default: string;
                            };
                            name: {
                                description: string;
                                type: string;
                            };
                            isDefault: {
                                description: string;
                                type: string;
                                default: boolean;
                            };
                            preProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            postProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            monitors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            results: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            tags: {
                                description: string;
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                            status: {
                                type: string;
                                description: string;
                                enum: string[];
                            };
                            statusTrack: {
                                type: string;
                                items: {
                                    type: string;
                                    required: string[];
                                    properties: {
                                        trackedAt: {
                                            type: string;
                                        };
                                        status: {
                                            type: string;
                                        };
                                        repetition: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                            isDraft: {
                                type: string;
                            };
                            type: {
                                description: string;
                                type: string;
                                const: string;
                            };
                            head: {
                                description: string;
                                type: string;
                            };
                            flowchartId: {
                                description: string;
                                type: string;
                            };
                            next: {
                                description: string;
                                type: string;
                            };
                            enableRender: {
                                description: string;
                                type: string;
                            };
                            subtype: {
                                enum: string[];
                            };
                            source: {
                                enum: string[];
                            };
                            input: {
                                type: string;
                                items: {
                                    oneOf: ({
                                        $schema: string;
                                        title: string;
                                        type: string;
                                        properties: {
                                            type: {
                                                const: string;
                                            };
                                            ids: {
                                                description: string;
                                                type: string;
                                                items: {
                                                    type: string;
                                                };
                                            };
                                            collection?: undefined;
                                            draft?: undefined;
                                            objectData?: undefined;
                                            overwrite?: undefined;
                                            pathname?: undefined;
                                            basename?: undefined;
                                            filetype?: undefined;
                                        };
                                        required: string[];
                                    } | {
                                        $schema: string;
                                        title: string;
                                        type: string;
                                        properties: {
                                            type: {
                                                const: string;
                                            };
                                            collection: {
                                                description: string;
                                                type: string;
                                            };
                                            draft: {
                                                description: string;
                                                type: string;
                                            };
                                            ids?: undefined;
                                            objectData?: undefined;
                                            overwrite?: undefined;
                                            pathname?: undefined;
                                            basename?: undefined;
                                            filetype?: undefined;
                                        };
                                        required: string[];
                                    } | {
                                        $schema: string;
                                        title: string;
                                        type: string;
                                        required: string[];
                                        properties: {
                                            type: {
                                                const: string;
                                            };
                                            objectData: {
                                                $schema: string;
                                                title: string;
                                                type: string;
                                                properties: {
                                                    CONTAINER: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                    NAME: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                    PROVIDER: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                    REGION: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                    SIZE: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                    TIMESTAMP: {
                                                        description: string;
                                                        type: string;
                                                    };
                                                };
                                            };
                                            overwrite: {
                                                description: string;
                                                type: string;
                                            };
                                            pathname: {
                                                description: string;
                                                type: string;
                                            };
                                            basename: {
                                                description: string;
                                                type: string;
                                                $comment: string;
                                            };
                                            filetype: {
                                                description: string;
                                                type: string;
                                            };
                                            ids?: undefined;
                                            collection?: undefined;
                                            draft?: undefined;
                                        };
                                    })[];
                                    discriminator: {
                                        propertyName: string;
                                    };
                                    type?: undefined;
                                    required?: undefined;
                                    properties?: undefined;
                                    $schema?: undefined;
                                    title?: undefined;
                                };
                                description?: undefined;
                                required?: undefined;
                                properties?: undefined;
                            };
                            mapFlowchartId?: undefined;
                            statement?: undefined;
                            then?: undefined;
                            else?: undefined;
                            maxOccurrences?: undefined;
                            throwException?: undefined;
                            errorMessage?: undefined;
                            application?: undefined;
                            executable?: undefined;
                            flavor?: undefined;
                            context?: undefined;
                            scope?: undefined;
                            operand?: undefined;
                            value?: undefined;
                            operation?: undefined;
                            operationType?: undefined;
                            inputData?: undefined;
                            workflowId?: undefined;
                        };
                    } | {
                        $schema: string;
                        title: string;
                        type: string;
                        required: string[];
                        properties: {
                            _id: {
                                description: string;
                                type: string;
                            };
                            slug: {
                                description: string;
                                type: string;
                            };
                            systemName: {
                                type: string;
                            };
                            schemaVersion: {
                                description: string;
                                type: string;
                                default: string;
                            };
                            name: {
                                description: string;
                                type: string;
                            };
                            isDefault: {
                                description: string;
                                type: string;
                                default: boolean;
                            };
                            preProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            postProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            monitors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            results: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            tags: {
                                description: string;
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                            status: {
                                type: string;
                                description: string;
                                enum: string[];
                            };
                            statusTrack: {
                                type: string;
                                items: {
                                    type: string;
                                    required: string[];
                                    properties: {
                                        trackedAt: {
                                            type: string;
                                        };
                                        status: {
                                            type: string;
                                        };
                                        repetition: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                            isDraft: {
                                type: string;
                            };
                            type: {
                                description: string;
                                type: string;
                                const: string;
                            };
                            head: {
                                description: string;
                                type: string;
                            };
                            flowchartId: {
                                description: string;
                                type: string;
                            };
                            next: {
                                description: string;
                                type: string;
                            };
                            enableRender: {
                                description: string;
                                type: string;
                            };
                            mapFlowchartId: {
                                description: string;
                                type: string;
                            };
                            input: {
                                description: string;
                                type: string;
                                items: {
                                    type: string;
                                    required: string[];
                                    properties: {
                                        operation: {
                                            description: string;
                                            type: string;
                                        };
                                        arguments: {
                                            description: string;
                                            type: string;
                                            items: {
                                                type: string;
                                            };
                                        };
                                        scope?: undefined;
                                        name?: undefined;
                                        template?: undefined;
                                        rendered?: undefined;
                                        isManuallyChanged?: undefined;
                                    };
                                    oneOf?: undefined;
                                    discriminator?: undefined;
                                    $schema?: undefined;
                                    title?: undefined;
                                };
                                required?: undefined;
                                properties?: undefined;
                            };
                            subtype?: undefined;
                            source?: undefined;
                            statement?: undefined;
                            then?: undefined;
                            else?: undefined;
                            maxOccurrences?: undefined;
                            throwException?: undefined;
                            errorMessage?: undefined;
                            application?: undefined;
                            executable?: undefined;
                            flavor?: undefined;
                            context?: undefined;
                            scope?: undefined;
                            operand?: undefined;
                            value?: undefined;
                            operation?: undefined;
                            operationType?: undefined;
                            inputData?: undefined;
                            workflowId?: undefined;
                        };
                    } | {
                        $schema: string;
                        title: string;
                        type: string;
                        required: string[];
                        properties: {
                            _id: {
                                description: string;
                                type: string;
                            };
                            slug: {
                                description: string;
                                type: string;
                            };
                            systemName: {
                                type: string;
                            };
                            schemaVersion: {
                                description: string;
                                type: string;
                                default: string;
                            };
                            name: {
                                description: string;
                                type: string;
                            };
                            isDefault: {
                                description: string;
                                type: string;
                                default: boolean;
                            };
                            preProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            postProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            monitors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            results: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            tags: {
                                description: string;
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                            status: {
                                type: string;
                                description: string;
                                enum: string[];
                            };
                            statusTrack: {
                                type: string;
                                items: {
                                    type: string;
                                    required: string[];
                                    properties: {
                                        trackedAt: {
                                            type: string;
                                        };
                                        status: {
                                            type: string;
                                        };
                                        repetition: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                            isDraft: {
                                type: string;
                            };
                            type: {
                                description: string;
                                type: string;
                                const: string;
                            };
                            head: {
                                description: string;
                                type: string;
                            };
                            flowchartId: {
                                description: string;
                                type: string;
                            };
                            next: {
                                description: string;
                                type: string;
                            };
                            enableRender: {
                                description: string;
                                type: string;
                            };
                            input: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        scope: {
                                            description: string;
                                            type: string;
                                        };
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                        operation?: undefined;
                                        arguments?: undefined;
                                        template?: undefined;
                                        rendered?: undefined;
                                        isManuallyChanged?: undefined;
                                    };
                                    oneOf?: undefined;
                                    discriminator?: undefined;
                                };
                                required?: undefined;
                                properties?: undefined;
                            };
                            statement: {
                                description: string;
                                type: string;
                            };
                            then: {
                                description: string;
                                type: string;
                            };
                            else: {
                                description: string;
                                type: string;
                            };
                            maxOccurrences: {
                                description: string;
                                type: string;
                            };
                            throwException: {
                                description: string;
                                type: string;
                            };
                            subtype?: undefined;
                            source?: undefined;
                            mapFlowchartId?: undefined;
                            errorMessage?: undefined;
                            application?: undefined;
                            executable?: undefined;
                            flavor?: undefined;
                            context?: undefined;
                            scope?: undefined;
                            operand?: undefined;
                            value?: undefined;
                            operation?: undefined;
                            operationType?: undefined;
                            inputData?: undefined;
                            workflowId?: undefined;
                        };
                    } | {
                        $schema: string;
                        title: string;
                        type: string;
                        required: string[];
                        properties: {
                            _id: {
                                description: string;
                                type: string;
                            };
                            slug: {
                                description: string;
                                type: string;
                            };
                            systemName: {
                                type: string;
                            };
                            schemaVersion: {
                                description: string;
                                type: string;
                                default: string;
                            };
                            name: {
                                description: string;
                                type: string;
                            };
                            isDefault: {
                                description: string;
                                type: string;
                                default: boolean;
                            };
                            preProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            postProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            monitors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            results: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            tags: {
                                description: string;
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                            status: {
                                type: string;
                                description: string;
                                enum: string[];
                            };
                            statusTrack: {
                                type: string;
                                items: {
                                    type: string;
                                    required: string[];
                                    properties: {
                                        trackedAt: {
                                            type: string;
                                        };
                                        status: {
                                            type: string;
                                        };
                                        repetition: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                            isDraft: {
                                type: string;
                            };
                            type: {
                                description: string;
                                type: string;
                                const: string;
                            };
                            head: {
                                description: string;
                                type: string;
                            };
                            flowchartId: {
                                description: string;
                                type: string;
                            };
                            next: {
                                description: string;
                                type: string;
                            };
                            enableRender: {
                                description: string;
                                type: string;
                            };
                            statement: {
                                type: string;
                                description: string;
                            };
                            errorMessage: {
                                type: string;
                                description: string;
                            };
                            subtype?: undefined;
                            source?: undefined;
                            input?: undefined;
                            mapFlowchartId?: undefined;
                            then?: undefined;
                            else?: undefined;
                            maxOccurrences?: undefined;
                            throwException?: undefined;
                            application?: undefined;
                            executable?: undefined;
                            flavor?: undefined;
                            context?: undefined;
                            scope?: undefined;
                            operand?: undefined;
                            value?: undefined;
                            operation?: undefined;
                            operationType?: undefined;
                            inputData?: undefined;
                            workflowId?: undefined;
                        };
                    } | {
                        $schema: string;
                        title: string;
                        type: string;
                        required: string[];
                        properties: {
                            _id: {
                                description: string;
                                type: string;
                            };
                            slug: {
                                description: string;
                                type: string;
                            };
                            systemName: {
                                type: string;
                            };
                            schemaVersion: {
                                description: string;
                                type: string;
                                default: string;
                            };
                            name: {
                                description: string;
                                type: string;
                            };
                            isDefault: {
                                description: string;
                                type: string;
                                default: boolean;
                            };
                            preProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            postProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            monitors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            results: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            tags: {
                                description: string;
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                            status: {
                                type: string;
                                description: string;
                                enum: string[];
                            };
                            statusTrack: {
                                type: string;
                                items: {
                                    type: string;
                                    required: string[];
                                    properties: {
                                        trackedAt: {
                                            type: string;
                                        };
                                        status: {
                                            type: string;
                                        };
                                        repetition: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                            isDraft: {
                                type: string;
                            };
                            type: {
                                description: string;
                                type: string;
                                const: string;
                            };
                            head: {
                                description: string;
                                type: string;
                            };
                            flowchartId: {
                                description: string;
                                type: string;
                            };
                            next: {
                                description: string;
                                type: string;
                            };
                            enableRender: {
                                description: string;
                                type: string;
                            };
                            application: {
                                $schema: string;
                                title: string;
                                type: string;
                                required: string[];
                                properties: {
                                    _id: {
                                        description: string;
                                        type: string;
                                    };
                                    slug: {
                                        description: string;
                                        type: string;
                                    };
                                    systemName: {
                                        type: string;
                                    };
                                    schemaVersion: {
                                        description: string;
                                        type: string;
                                        default: string;
                                    };
                                    name: {
                                        description: string;
                                        type: string;
                                    };
                                    isDefault: {
                                        description: string;
                                        type: string;
                                        default: boolean;
                                    };
                                    shortName: {
                                        description: string;
                                        type: string;
                                    };
                                    summary: {
                                        description: string;
                                        type: string;
                                    };
                                    version: {
                                        description: string;
                                        type: string;
                                    };
                                    build: {
                                        description: string;
                                        type: string;
                                    };
                                    hasAdvancedComputeOptions: {
                                        description: string;
                                        type: string;
                                    };
                                    isLicensed: {
                                        description: string;
                                        type: string;
                                    };
                                };
                            };
                            executable: {
                                $schema: string;
                                title: string;
                                type: string;
                                required: string[];
                                properties: {
                                    _id: {
                                        description: string;
                                        type: string;
                                    };
                                    slug: {
                                        description: string;
                                        type: string;
                                    };
                                    systemName: {
                                        type: string;
                                    };
                                    schemaVersion: {
                                        description: string;
                                        type: string;
                                        default: string;
                                    };
                                    name: {
                                        description: string;
                                        type: string;
                                    };
                                    isDefault: {
                                        description: string;
                                        type: string;
                                        default: boolean;
                                    };
                                    preProcessors: {
                                        description: string;
                                        type: string;
                                        items: {
                                            $schema: string;
                                            title: string;
                                            type: string;
                                            required: string[];
                                            properties: {
                                                name: {
                                                    description: string;
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                    postProcessors: {
                                        description: string;
                                        type: string;
                                        items: {
                                            $schema: string;
                                            title: string;
                                            type: string;
                                            required: string[];
                                            properties: {
                                                name: {
                                                    description: string;
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                    monitors: {
                                        description: string;
                                        type: string;
                                        items: {
                                            $schema: string;
                                            title: string;
                                            type: string;
                                            required: string[];
                                            properties: {
                                                name: {
                                                    description: string;
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                    results: {
                                        description: string;
                                        type: string;
                                        items: {
                                            $schema: string;
                                            title: string;
                                            type: string;
                                            required: string[];
                                            properties: {
                                                name: {
                                                    description: string;
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                    applicationId: {
                                        description: string;
                                        type: string;
                                        items: {
                                            type: string;
                                        };
                                    };
                                    hasAdvancedComputeOptions: {
                                        description: string;
                                        type: string;
                                    };
                                };
                            };
                            flavor: {
                                $schema: string;
                                title: string;
                                type: string;
                                required: string[];
                                properties: {
                                    _id: {
                                        description: string;
                                        type: string;
                                    };
                                    slug: {
                                        description: string;
                                        type: string;
                                    };
                                    systemName: {
                                        type: string;
                                    };
                                    schemaVersion: {
                                        description: string;
                                        type: string;
                                        default: string;
                                    };
                                    name: {
                                        description: string;
                                        type: string;
                                    };
                                    isDefault: {
                                        description: string;
                                        type: string;
                                        default: boolean;
                                    };
                                    preProcessors: {
                                        description: string;
                                        type: string;
                                        items: {
                                            $schema: string;
                                            title: string;
                                            type: string;
                                            required: string[];
                                            properties: {
                                                name: {
                                                    description: string;
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                    postProcessors: {
                                        description: string;
                                        type: string;
                                        items: {
                                            $schema: string;
                                            title: string;
                                            type: string;
                                            required: string[];
                                            properties: {
                                                name: {
                                                    description: string;
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                    monitors: {
                                        description: string;
                                        type: string;
                                        items: {
                                            $schema: string;
                                            title: string;
                                            type: string;
                                            required: string[];
                                            properties: {
                                                name: {
                                                    description: string;
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                    results: {
                                        description: string;
                                        type: string;
                                        items: {
                                            $schema: string;
                                            title: string;
                                            type: string;
                                            required: string[];
                                            properties: {
                                                name: {
                                                    description: string;
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                    executableId: {
                                        description: string;
                                        type: string;
                                    };
                                    executableName: {
                                        description: string;
                                        type: string;
                                    };
                                    applicationName: {
                                        description: string;
                                        type: string;
                                    };
                                    input: {
                                        title: string;
                                        type: string;
                                        items: {
                                            $schema: string;
                                            title: string;
                                            type: string;
                                            additionalProperties: boolean;
                                            properties: {
                                                templateId: {
                                                    type: string;
                                                };
                                                templateName: {
                                                    type: string;
                                                };
                                                name: {
                                                    description: string;
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                    supportedApplicationVersions: {
                                        description: string;
                                        type: string;
                                        items: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                            input: {
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        template: {
                                            $schema: string;
                                            title: string;
                                            type: string;
                                            required: string[];
                                            properties: {
                                                _id: {
                                                    description: string;
                                                    type: string;
                                                };
                                                slug: {
                                                    description: string;
                                                    type: string;
                                                };
                                                systemName: {
                                                    type: string;
                                                };
                                                schemaVersion: {
                                                    description: string;
                                                    type: string;
                                                    default: string;
                                                };
                                                name: {
                                                    description: string;
                                                    type: string;
                                                };
                                                applicationName: {
                                                    type: string;
                                                };
                                                applicationVersion: {
                                                    type: string;
                                                };
                                                executableName: {
                                                    type: string;
                                                };
                                                contextProviders: {
                                                    type: string;
                                                    items: {
                                                        $schema: string;
                                                        title: string;
                                                        type: string;
                                                        required: string[];
                                                        properties: {
                                                            name: {
                                                                description: string;
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                };
                                                content: {
                                                    description: string;
                                                    type: string;
                                                };
                                            };
                                        };
                                        rendered: {
                                            description: string;
                                            type: string;
                                        };
                                        isManuallyChanged: {
                                            type: string;
                                            default: boolean;
                                        };
                                        operation?: undefined;
                                        arguments?: undefined;
                                        scope?: undefined;
                                        name?: undefined;
                                    };
                                    oneOf?: undefined;
                                    discriminator?: undefined;
                                };
                                description?: undefined;
                                required?: undefined;
                                properties?: undefined;
                            };
                            context: {
                                type: string;
                                items: {
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            type: string;
                                            tsType: string;
                                        };
                                        isEdited: {
                                            type: string;
                                        };
                                        data: {
                                            type: string;
                                        };
                                        extraData: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                            subtype?: undefined;
                            source?: undefined;
                            mapFlowchartId?: undefined;
                            statement?: undefined;
                            then?: undefined;
                            else?: undefined;
                            maxOccurrences?: undefined;
                            throwException?: undefined;
                            errorMessage?: undefined;
                            scope?: undefined;
                            operand?: undefined;
                            value?: undefined;
                            operation?: undefined;
                            operationType?: undefined;
                            inputData?: undefined;
                            workflowId?: undefined;
                        };
                    } | {
                        $schema: string;
                        title: string;
                        type: string;
                        required: string[];
                        properties: {
                            _id: {
                                description: string;
                                type: string;
                            };
                            slug: {
                                description: string;
                                type: string;
                            };
                            systemName: {
                                type: string;
                            };
                            schemaVersion: {
                                description: string;
                                type: string;
                                default: string;
                            };
                            name: {
                                description: string;
                                type: string;
                            };
                            isDefault: {
                                description: string;
                                type: string;
                                default: boolean;
                            };
                            preProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            postProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            monitors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            results: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            tags: {
                                description: string;
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                            status: {
                                type: string;
                                description: string;
                                enum: string[];
                            };
                            statusTrack: {
                                type: string;
                                items: {
                                    type: string;
                                    required: string[];
                                    properties: {
                                        trackedAt: {
                                            type: string;
                                        };
                                        status: {
                                            type: string;
                                        };
                                        repetition: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                            isDraft: {
                                type: string;
                            };
                            type: {
                                description: string;
                                type: string;
                                const: string;
                            };
                            head: {
                                description: string;
                                type: string;
                            };
                            flowchartId: {
                                description: string;
                                type: string;
                            };
                            next: {
                                description: string;
                                type: string;
                            };
                            enableRender: {
                                description: string;
                                type: string;
                            };
                            scope: {
                                type: string;
                            };
                            input: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        scope: {
                                            description: string;
                                            type: string;
                                        };
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                        operation?: undefined;
                                        arguments?: undefined;
                                        template?: undefined;
                                        rendered?: undefined;
                                        isManuallyChanged?: undefined;
                                    };
                                    oneOf?: undefined;
                                    discriminator?: undefined;
                                };
                                required?: undefined;
                                properties?: undefined;
                            };
                            operand: {
                                description: string;
                                type: string;
                            };
                            value: {
                                description: string;
                                oneOf: {
                                    type: string;
                                }[];
                            };
                            subtype?: undefined;
                            source?: undefined;
                            mapFlowchartId?: undefined;
                            statement?: undefined;
                            then?: undefined;
                            else?: undefined;
                            maxOccurrences?: undefined;
                            throwException?: undefined;
                            errorMessage?: undefined;
                            application?: undefined;
                            executable?: undefined;
                            flavor?: undefined;
                            context?: undefined;
                            operation?: undefined;
                            operationType?: undefined;
                            inputData?: undefined;
                            workflowId?: undefined;
                        };
                    } | {
                        $schema: string;
                        title: string;
                        type: string;
                        required: string[];
                        properties: {
                            _id: {
                                description: string;
                                type: string;
                            };
                            slug: {
                                description: string;
                                type: string;
                            };
                            systemName: {
                                type: string;
                            };
                            schemaVersion: {
                                description: string;
                                type: string;
                                default: string;
                            };
                            name: {
                                description: string;
                                type: string;
                            };
                            isDefault: {
                                description: string;
                                type: string;
                                default: boolean;
                            };
                            preProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            postProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            monitors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            results: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            tags: {
                                description: string;
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                            status: {
                                type: string;
                                description: string;
                                enum: string[];
                            };
                            statusTrack: {
                                type: string;
                                items: {
                                    type: string;
                                    required: string[];
                                    properties: {
                                        trackedAt: {
                                            type: string;
                                        };
                                        status: {
                                            type: string;
                                        };
                                        repetition: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                            isDraft: {
                                type: string;
                            };
                            type: {
                                description: string;
                                type: string;
                                const: string;
                            };
                            head: {
                                description: string;
                                type: string;
                            };
                            flowchartId: {
                                description: string;
                                type: string;
                            };
                            next: {
                                description: string;
                                type: string;
                            };
                            enableRender: {
                                description: string;
                                type: string;
                            };
                            operation: {
                                description: string;
                                type: string;
                            };
                            operationType: {
                                description: string;
                                type: string;
                            };
                            inputData: {
                                description: string;
                            };
                            subtype?: undefined;
                            source?: undefined;
                            input?: undefined;
                            mapFlowchartId?: undefined;
                            statement?: undefined;
                            then?: undefined;
                            else?: undefined;
                            maxOccurrences?: undefined;
                            throwException?: undefined;
                            errorMessage?: undefined;
                            application?: undefined;
                            executable?: undefined;
                            flavor?: undefined;
                            context?: undefined;
                            scope?: undefined;
                            operand?: undefined;
                            value?: undefined;
                            workflowId?: undefined;
                        };
                    } | {
                        $schema: string;
                        title: string;
                        type: string;
                        required: string[];
                        properties: {
                            _id: {
                                description: string;
                                type: string;
                            };
                            slug: {
                                description: string;
                                type: string;
                            };
                            systemName: {
                                type: string;
                            };
                            schemaVersion: {
                                description: string;
                                type: string;
                                default: string;
                            };
                            name: {
                                description: string;
                                type: string;
                            };
                            isDefault: {
                                description: string;
                                type: string;
                                default: boolean;
                            };
                            preProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            postProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            monitors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            results: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            tags: {
                                description: string;
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                            status: {
                                type: string;
                                description: string;
                                enum: string[];
                            };
                            statusTrack: {
                                type: string;
                                items: {
                                    type: string;
                                    required: string[];
                                    properties: {
                                        trackedAt: {
                                            type: string;
                                        };
                                        status: {
                                            type: string;
                                        };
                                        repetition: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                            isDraft: {
                                type: string;
                            };
                            type: {
                                description: string;
                                type: string;
                                const: string;
                            };
                            head: {
                                description: string;
                                type: string;
                            };
                            flowchartId: {
                                description: string;
                                type: string;
                            };
                            next: {
                                description: string;
                                type: string;
                            };
                            enableRender: {
                                description: string;
                                type: string;
                            };
                            workflowId: {
                                description: string;
                                type: string;
                            };
                            input: {
                                description: string;
                                type: string;
                                required: string[];
                                properties: {
                                    target: {
                                        description: string;
                                        type: string;
                                    };
                                    scope: {
                                        description: string;
                                        type: string;
                                    };
                                    name: {
                                        description: string;
                                        type: string;
                                    };
                                    values: {
                                        description: string;
                                        type: string;
                                        items: {
                                            oneOf: {
                                                type: string;
                                            }[];
                                        };
                                    };
                                    useValues: {
                                        type: string;
                                    };
                                };
                                items?: undefined;
                            };
                            subtype?: undefined;
                            source?: undefined;
                            mapFlowchartId?: undefined;
                            statement?: undefined;
                            then?: undefined;
                            else?: undefined;
                            maxOccurrences?: undefined;
                            throwException?: undefined;
                            errorMessage?: undefined;
                            application?: undefined;
                            executable?: undefined;
                            flavor?: undefined;
                            context?: undefined;
                            scope?: undefined;
                            operand?: undefined;
                            value?: undefined;
                            operation?: undefined;
                            operationType?: undefined;
                            inputData?: undefined;
                        };
                    } | {
                        $schema: string;
                        title: string;
                        type: string;
                        required: string[];
                        properties: {
                            _id: {
                                description: string;
                                type: string;
                            };
                            slug: {
                                description: string;
                                type: string;
                            };
                            systemName: {
                                type: string;
                            };
                            schemaVersion: {
                                description: string;
                                type: string;
                                default: string;
                            };
                            name: {
                                description: string;
                                type: string;
                            };
                            isDefault: {
                                description: string;
                                type: string;
                                default: boolean;
                            };
                            preProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            postProcessors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            monitors: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            results: {
                                description: string;
                                type: string;
                                items: {
                                    $schema: string;
                                    title: string;
                                    type: string;
                                    required: string[];
                                    properties: {
                                        name: {
                                            description: string;
                                            type: string;
                                        };
                                    };
                                };
                            };
                            tags: {
                                description: string;
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                            status: {
                                type: string;
                                description: string;
                                enum: string[];
                            };
                            statusTrack: {
                                type: string;
                                items: {
                                    type: string;
                                    required: string[];
                                    properties: {
                                        trackedAt: {
                                            type: string;
                                        };
                                        status: {
                                            type: string;
                                        };
                                        repetition: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                            isDraft: {
                                type: string;
                            };
                            type: {
                                description: string;
                                type: string;
                                const: string;
                            };
                            head: {
                                description: string;
                                type: string;
                            };
                            flowchartId: {
                                description: string;
                                type: string;
                            };
                            next: {
                                description: string;
                                type: string;
                            };
                            enableRender: {
                                description: string;
                                type: string;
                            };
                            subtype?: undefined;
                            source?: undefined;
                            input?: undefined;
                            mapFlowchartId?: undefined;
                            statement?: undefined;
                            then?: undefined;
                            else?: undefined;
                            maxOccurrences?: undefined;
                            throwException?: undefined;
                            errorMessage?: undefined;
                            application?: undefined;
                            executable?: undefined;
                            flavor?: undefined;
                            context?: undefined;
                            scope?: undefined;
                            operand?: undefined;
                            value?: undefined;
                            operation?: undefined;
                            operationType?: undefined;
                            inputData?: undefined;
                            workflowId?: undefined;
                        };
                    })[];
                    discriminator: {
                        propertyName: string;
                    };
                    required: string[];
                };
            };
            properties: {
                description: string;
                type: string;
                items: {
                    description: string;
                    oneOf: {
                        type: string;
                    }[];
                };
            };
            isUsingDataset: {
                description: string;
                type: string;
            };
            workflows: {
                description: string;
                type: string;
                items: {
                    type: string;
                };
            };
            _id: {
                description: string;
                type: string;
            };
            slug: {
                description: string;
                type: string;
            };
            systemName: {
                type: string;
            };
            schemaVersion: {
                description: string;
                type: string;
                default: string;
            };
            name: {
                description: string;
                type: string;
            };
            isDefault: {
                description: string;
                type: string;
                default: boolean;
            };
            metadata: {
                type: string;
            };
        };
    };
    static usePredefinedIds: boolean;
    static get defaultConfig(): {
        name: string;
        properties: never[];
        subworkflows: {
            _id: string;
            application: {
                name: string;
                summary: string;
                version: string;
            };
            model: {
                method: {
                    subtype: string;
                    type: string;
                };
                subtype: string;
                type: string;
            };
            name: string;
            properties: never[];
            units: never[];
        }[];
        workflows: never[];
        units: {
            _id: string;
            flowchartId: string;
            head: boolean;
            monitors: never[];
            postProcessors: never[];
            preProcessors: never[];
            results: never[];
            type: string;
            name: string;
        }[];
    };
    static generateWorkflowId(name: any, properties?: null, subworkflows?: null, applicationName?: null): any;
    static fromSubworkflow(subworkflow: any, ClsConstructor?: typeof Workflow): Workflow;
    static fromSubworkflows(name: any, ClsConstructor?: typeof Workflow, ...subworkflows: any[]): Workflow;
    constructor(config: any, _Subworkflow?: typeof Subworkflow, _UnitFactory?: typeof UnitFactory, _Workflow?: typeof Workflow, _MapUnit?: typeof MapUnit);
    _Subworkflow: typeof Subworkflow;
    _UnitFactory: typeof UnitFactory;
    _Workflow: typeof Workflow;
    _MapUnit: typeof MapUnit;
    initialize(): void;
    _subworkflows: any;
    _units: any;
    _workflows: any;
    /**
     * @summary Adds subworkflow to current workflow.
     * @param subworkflow {Subworkflow}
     * @param head {Boolean}
     */
    addSubworkflow(subworkflow: Subworkflow, head?: boolean, index?: number): void;
    removeSubworkflow(id: any): void;
    subworkflowId(index: any): any;
    replaceSubworkflowAtIndex(index: any, newSubworkflow: any): void;
    get units(): any;
    setUnits(arr: any): void;
    get usedApplications(): any[];
    get usedApplicationNames(): any[];
    get usedApplicationVersions(): any[];
    get usedApplicationNamesWithVersions(): string[];
    get usedModels(): any[];
    get humanReadableUsedModels(): any[];
    toJSON(exclude?: any[]): lodash.Omit<any, any>;
    get isDefault(): any;
    set isMultiMaterial(value: any);
    get isMultiMaterial(): any;
    set isUsingDataset(value: boolean);
    get isUsingDataset(): boolean;
    get properties(): any[];
    get humanReadableProperties(): string[];
    get systemName(): string;
    get defaultDescription(): string;
    get exabyteId(): any;
    get hash(): any;
    get isOutdated(): any;
    get history(): any;
    setMethodData(methodData: any): void;
    /**
     * @param unit {Unit}
     * @param head {Boolean}
     * @param index {Number}
     */
    addUnit(unit: Unit, head?: boolean, index?: number): void;
    removeUnit(flowchartId: any): void;
    /**
     * @return Subworkflow[]
     */
    get subworkflows(): any;
    get workflows(): any;
    addUnitType(type: any, head?: boolean, index?: number): void;
    addMapUnit(mapUnit: any, mapWorkflow: any): void;
    findSubworkflowById(id: any): any;
    get allSubworkflows(): any[];
    /**
     * @summary Calculates hash of the workflow. Meaningful fields are units and subworkflows.
     * units and subworkflows must be sorted topologically before hashing (already sorted).
     */
    calculateHash(): string;
}
declare class BaseWorkflow {
}
import { Subworkflow } from "../subworkflows/subworkflow";
import { UnitFactory } from "../units/factory";
import { MapUnit } from "../units";
import lodash from "lodash";
export {};
