import type { SubworkflowSchema, WorkflowBaseUnitSchema } from "@mat3ra/esse/dist/js/types";
/**
 * @summary set the head of an array of units
 */
export declare function setUnitsHead<T extends WorkflowBaseUnitSchema>(units: T[]): T[];
/**
 * @summary Re-establishes the linked `next => flowchartId` logic in an array of units
 */
export declare function setNextLinks<T extends WorkflowBaseUnitSchema>(units: T[]): T[];
/**
 * @summary Apply configuration data to an object
 * @param obj {*} object / class containing methods or attributes to be set
 * @param config { functions: {}, attributes: {} } functions to call and attributes to set
 * @param callBuild {boolean} if true; call build between applying functions and attributes
 * @returns {*} updated object
 */
export declare function applyConfig({ obj, config, callBuild, }: {
    obj: any;
    config: {
        functions?: Record<string, any>;
        attributes?: Record<string, any>;
    };
    callBuild: boolean;
}): any;
/**
 * @summary Safely extract unit object from subworkflow data
 */
export declare function findUnit({ subworkflowData, index, type, }: {
    subworkflowData: SubworkflowSchema;
    index: number;
    type: "assignment" | "condition" | "processing" | "io" | "assertion" | "execution" | "reduce";
}): {
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
    executable: {
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
    flavor: {
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
                name: import("@mat3ra/esse/dist/js/types").ContextProviderNameEnum;
            }[];
            content: string;
        };
        rendered: string;
        isManuallyChanged: boolean;
    }[];
    context: ({
        name: "input";
        data: {
            contextProviderName: "nwchem-total-energy";
            CHARGE: number;
            MULT: number;
            BASIS: string;
            NAT: number;
            NTYP: number;
            ATOMIC_POSITIONS: string;
            ATOMIC_POSITIONS_WITHOUT_CONSTRAINTS: string;
            ATOMIC_SPECIES: string;
            FUNCTIONAL: string;
            CARTESIAN: boolean;
        } | {
            IBRAV: number;
            RESTART_MODE: "from_scratch" | "restart";
            ATOMIC_SPECIES: {
                X: string;
                Mass_X: number;
                PseudoPot_X: string;
            }[];
            ATOMIC_SPECIES_WITH_LABELS: {
                X: string;
                Mass_X: number;
                PseudoPot_X: string;
            }[];
            NAT: number;
            NTYP: number;
            NTYP_WITH_LABELS: number;
            ATOMIC_POSITIONS?: {
                X?: string;
                x: number;
                y: number;
                z: number;
                "if_pos(1)"?: number;
                "if_pos(2)"?: number;
                "if_pos(3)"?: number;
            }[];
            ATOMIC_POSITIONS_WITHOUT_CONSTRAINTS?: string;
            CELL_PARAMETERS: {
                v1?: [number, number, number];
                v2?: [number, number, number];
                v3?: [number, number, number];
            };
            FIRST_IMAGE: {
                X?: string;
                x: number;
                y: number;
                z: number;
                "if_pos(1)"?: number;
                "if_pos(2)"?: number;
                "if_pos(3)"?: number;
            }[];
            LAST_IMAGE: {
                X?: string;
                x: number;
                y: number;
                z: number;
                "if_pos(1)"?: number;
                "if_pos(2)"?: number;
                "if_pos(3)"?: number;
            }[];
            INTERMEDIATE_IMAGES: {
                X?: string;
                x: number;
                y: number;
                z: number;
                "if_pos(1)"?: number;
                "if_pos(2)"?: number;
                "if_pos(3)"?: number;
            }[][];
            contextProviderName: "qe-neb";
        } | {
            IBRAV: number;
            RESTART_MODE: "from_scratch" | "restart";
            ATOMIC_SPECIES: {
                X: string;
                Mass_X: number;
                PseudoPot_X: string;
            }[];
            ATOMIC_SPECIES_WITH_LABELS: {
                X: string;
                Mass_X: number;
                PseudoPot_X: string;
            }[];
            NAT: number;
            NTYP: number;
            NTYP_WITH_LABELS: number;
            ATOMIC_POSITIONS: {
                X?: string;
                x: number;
                y: number;
                z: number;
                "if_pos(1)"?: number;
                "if_pos(2)"?: number;
                "if_pos(3)"?: number;
            }[];
            ATOMIC_POSITIONS_WITHOUT_CONSTRAINTS: string;
            CELL_PARAMETERS: {
                v1?: [number, number, number];
                v2?: [number, number, number];
                v3?: [number, number, number];
            };
            contextProviderName: "qe-pwx";
        } | {
            POSCAR: string;
            POSCAR_WITH_CONSTRAINTS: string;
            contextProviderName: "vasp";
        } | {
            FIRST_IMAGE: string;
            LAST_IMAGE: string;
            INTERMEDIATE_IMAGES: string[];
            contextProviderName: "vasp-neb";
        };
        extraData: {
            materialHash: string;
        };
        isEdited: boolean;
    } | {
        name: "cutoffs";
        data: {
            wavefunction?: number;
            density?: number;
        };
        isEdited: boolean;
        extraData: {};
    } | {
        name: "kgrid" | "qgrid" | "igrid";
        data: {
            dimensions: [number, number, number] | [string, string, string];
            shifts?: [number, number, number];
            reciprocalVectorRatios?: [number, number, number];
            gridMetricType: "KPPRA" | "spacing";
            gridMetricValue: number;
            preferGridMetric?: boolean;
        };
        extraData: {
            materialHash: string;
        };
        isEdited: boolean;
    } | {
        name: "qpath" | "ipath" | "kpath" | "explicitKPath" | "explicitKPath2PIBA";
        data: [{
            point?: string;
            steps: number;
            coordinates: number[];
        }, ...{
            point?: string;
            steps: number;
            coordinates: number[];
        }[]];
        extraData: {
            materialHash: string;
        };
        isEdited: boolean;
    } | {
        name: "hubbard_j";
        data: [{
            paramType?: "U" | "J" | "B" | "E2" | "E3";
            atomicSpecies?: string;
            atomicOrbital?: string;
            value?: number;
        }, ...{
            paramType?: "U" | "J" | "B" | "E2" | "E3";
            atomicSpecies?: string;
            atomicOrbital?: string;
            value?: number;
        }[]];
        isEdited: boolean;
        extraData: {};
    } | {
        name: "hubbard_u";
        data: {
            atomicSpecies?: string;
            atomicOrbital?: string;
            hubbardUValue?: number;
        }[];
        extraData: {
            materialHash: string;
        };
        isEdited: boolean;
    } | {
        name: "hubbard_v";
        data: [{
            atomicSpecies?: string;
            siteIndex?: number;
            atomicOrbital?: string;
            atomicSpecies2?: string;
            siteIndex2?: number;
            atomicOrbital2?: string;
            hubbardVValue?: number;
        }, ...{
            atomicSpecies?: string;
            siteIndex?: number;
            atomicOrbital?: string;
            atomicSpecies2?: string;
            siteIndex2?: number;
            atomicOrbital2?: string;
            hubbardVValue?: number;
        }[]];
        isEdited: boolean;
        extraData: {};
    } | {
        name: "hubbard_legacy";
        data: [{
            atomicSpecies?: string;
            atomicSpeciesIndex?: number;
            hubbardUValue?: number;
        }, ...{
            atomicSpecies?: string;
            atomicSpeciesIndex?: number;
            hubbardUValue?: number;
        }[]];
        isEdited: boolean;
        extraData: {};
    } | {
        name: "neb";
        data: {
            nImages?: number;
        };
        isEdited: boolean;
        extraData: {};
    } | {
        name: "boundaryConditions";
        data: {
            type?: "pbc" | "bc1" | "bc2" | "bc3";
            offset?: number;
            electricField?: number;
            targetFermiEnergy?: number;
        };
        extraData: {
            materialHash: string;
        };
        isEdited: boolean;
    } | {
        name: "mlSettings";
        data: {
            target_column_name?: string;
            problem_category?: "regression" | "classification" | "clustering";
        };
        isEdited: boolean;
        extraData: {};
    } | {
        name: "mlTrainTestSplit";
        data: {
            fraction_held_as_test_set?: number;
        };
        isEdited: boolean;
        extraData: {};
    } | {
        name: "dynamics";
        data: {
            numberOfSteps?: number;
            timeStep?: number;
            electronMass?: number;
            temperature?: number;
        };
        isEdited: boolean;
        extraData: {};
    } | {
        name: "collinearMagnetization";
        data: {
            startingMagnetization: {
                atomicSpecies: string;
                value: number;
                index: number;
            }[];
            isTotalMagnetization: boolean;
            totalMagnetization: number;
        };
        extraData: {
            materialHash: string;
        };
        isEdited: boolean;
    } | {
        name: "nonCollinearMagnetization";
        data: {
            isExistingChargeDensity?: boolean;
            isStartingMagnetization?: boolean;
            startingMagnetization?: {
                index?: number;
                atomicSpecies?: string;
                value?: number;
            }[];
            isArbitrarySpinAngle?: boolean;
            isArbitrarySpinDirection?: boolean;
            lforcet?: boolean;
            spinAngles?: {
                index?: number;
                atomicSpecies?: string;
                angle1?: number;
                angle2?: number;
            }[];
            isConstrainedMagnetization?: boolean;
            constrainedMagnetization?: {
                constrainType?: "none" | "total" | "atomic" | "total direction" | "atomic direction";
                lambda?: number;
            };
            isFixedMagnetization?: boolean;
            fixedMagnetization?: {
                x?: number;
                y?: number;
                z?: number;
            };
        };
        extraData: {
            materialHash: string;
        };
        isEdited: boolean;
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
};
