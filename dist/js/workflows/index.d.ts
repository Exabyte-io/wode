import { Workflow } from "./workflow";
export function createWorkflows({ appName, workflowCls, workflowSubworkflowMapByApplication, ...swArgs }: {
    [x: string]: any;
    appName?: null | undefined;
    workflowCls?: typeof Workflow | undefined;
    workflowSubworkflowMapByApplication?: {
        workflows: {
            espresso: {
                band_gap: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                band_gap_dos_hse: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                band_structure: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                band_structure_dos: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                band_structure_hse: {
                    __path__: string;
                    name: string;
                    units: ({
                        name: string;
                        type: string;
                        config: {
                            attributes: {
                                name: string;
                            };
                        };
                    } | {
                        name: string;
                        type: string;
                        config?: undefined;
                    })[];
                };
                band_structure_magn: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                        config: {
                            attributes: {
                                name: string;
                            };
                        };
                    }[];
                };
                band_structure_soc: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                        config: {
                            attributes: {
                                name: string;
                            };
                        };
                    }[];
                };
                dielectric_tensor: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                dos: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                electronic_density_mesh: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                esm: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                esm_relax: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                fixed_cell_relaxation: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                gw_band_structure_band_gap_full_frequency: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                gw_band_structure_band_gap_plasmon_pole: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                kpoint_convergence: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                neb: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                phonon_dispersions: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                phonon_dos: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                phonon_dos_dispersion: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                phonon_map: {
                    __path__: string;
                    name: string;
                    units: ({
                        name: string;
                        type: string;
                        units: {
                            name: string;
                            type: string;
                        }[];
                        config?: undefined;
                    } | {
                        config: {
                            functions: {
                                setDefaultCompute: null;
                            };
                            input: {
                                name: string;
                            };
                            mapUnit: boolean;
                        };
                        name: string;
                        type: string;
                        units: {
                            name: string;
                            type: string;
                        }[];
                    } | {
                        name: string;
                        type: string;
                        units?: undefined;
                        config?: undefined;
                    })[];
                };
                recalculate_bands: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                surface_energy: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                total_energy: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                    tags: string[];
                };
                valence_band_offset: {
                    __path__: string;
                    name: string;
                    units: ({
                        name: string;
                        type: string;
                        config: {
                            attributes: {
                                name: string;
                            };
                        };
                        unitConfigs: ({
                            index: number;
                            type: string;
                            config: {
                                attributes: {
                                    name: string;
                                    value: string;
                                    flowchartId?: undefined;
                                    input?: undefined;
                                    operand?: undefined;
                                };
                            };
                        } | {
                            index: number;
                            type: string;
                            config: {
                                attributes: {
                                    flowchartId: string;
                                    name?: undefined;
                                    value?: undefined;
                                    input?: undefined;
                                    operand?: undefined;
                                };
                            };
                        } | {
                            index: number;
                            type: string;
                            config: {
                                attributes: {
                                    input: {
                                        name: string;
                                        scope: string;
                                    }[];
                                    name?: undefined;
                                    value?: undefined;
                                    flowchartId?: undefined;
                                    operand?: undefined;
                                };
                            };
                        } | {
                            index: number;
                            type: string;
                            config: {
                                attributes: {
                                    operand: string;
                                    name?: undefined;
                                    value?: undefined;
                                    flowchartId?: undefined;
                                    input?: undefined;
                                };
                            };
                        })[];
                    } | {
                        name: string;
                        type: string;
                        config: {
                            attributes: {
                                name: string;
                            };
                        };
                        unitConfigs: ({
                            index: number;
                            type: string;
                            config: {
                                attributes: {
                                    flowchartId: string;
                                    operand?: undefined;
                                    input?: undefined;
                                };
                            };
                        } | {
                            index: number;
                            type: string;
                            config: {
                                attributes: {
                                    operand: string;
                                    input: {
                                        name: string;
                                        scope: string;
                                    }[];
                                    flowchartId?: undefined;
                                };
                            };
                        })[];
                    } | {
                        name: string;
                        type: string;
                        config?: undefined;
                        unitConfigs?: undefined;
                    })[];
                };
                variable_cell_relaxation: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                    tags: string[];
                };
                zero_point_energy: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
            };
            nwchem: {
                total_energy: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
            };
            python: {
                classification_workflow: {
                    __path__: string;
                    config: {
                        attributes: {
                            isUsingDataset: boolean;
                        };
                    };
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                clustering_workflow: {
                    __path__: string;
                    config: {
                        attributes: {
                            isUsingDataset: boolean;
                        };
                    };
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                regression_workflow: {
                    __path__: string;
                    config: {
                        attributes: {
                            isUsingDataset: boolean;
                        };
                    };
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                python_script: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
            };
            shell: {
                batch_espresso_pwscf: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                hello_world: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
            };
            vasp: {
                band_gap: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                band_structure: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                band_structure_dos: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                dos: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                fixed_cell_relaxation: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                kpoint_convergence: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                neb: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                recalculate_bands: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                surface_energy: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                total_energy: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
                variable_cell_relaxation: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                    tags: string[];
                };
                zero_point_energy: {
                    __path__: string;
                    name: string;
                    units: {
                        name: string;
                        type: string;
                    }[];
                };
            };
        };
        subworkflows: {
            espresso: {
                average_electrostatic_potential_find_minima: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        config: {
                            name: string;
                            execName: string;
                            flavorName: string;
                            flowchartId: string;
                            operand?: undefined;
                            value?: undefined;
                            input?: undefined;
                        };
                        type: string;
                    } | {
                        config: {
                            name: string;
                            operand: string;
                            value: string;
                            input: {
                                name: string;
                                scope: string;
                            }[];
                            execName?: undefined;
                            flavorName?: undefined;
                            flowchartId?: undefined;
                        };
                        type: string;
                    })[];
                    config: {
                        attributes: {
                            name: string;
                        };
                    };
                };
                average_electrostatic_potential_via_band_structure: {
                    __path__: string;
                    config: {
                        isMultiMaterial: boolean;
                        attributes: {
                            name: string;
                        };
                    };
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        config: {
                            name: string;
                            operand: string;
                            value: string;
                            execName?: undefined;
                            flavorName?: undefined;
                            flowchartId?: undefined;
                            input?: undefined;
                        };
                        type: string;
                        attributes?: undefined;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                            operand?: undefined;
                            value?: undefined;
                            flowchartId?: undefined;
                            input?: undefined;
                        };
                        type: string;
                        attributes?: undefined;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                            flowchartId: string;
                            operand?: undefined;
                            value?: undefined;
                            input?: undefined;
                        };
                        type: string;
                        attributes: {
                            results: {
                                name: string;
                            }[];
                        };
                    } | {
                        config: {
                            name: string;
                            operand: string;
                            value: string;
                            input: {
                                name: string;
                                scope: string;
                            }[];
                            execName?: undefined;
                            flavorName?: undefined;
                            flowchartId?: undefined;
                        };
                        type: string;
                        attributes?: undefined;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                            flowchartId: string;
                            operand?: undefined;
                            value?: undefined;
                            input?: undefined;
                        };
                        type: string;
                        attributes?: undefined;
                    })[];
                };
                band_gap: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                        functions?: undefined;
                    })[];
                    config: {};
                };
                band_gap_hse_dos: {
                    __path__: string;
                    name: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    model: {
                        name: string;
                        config: {
                            type: string;
                            subtype: string;
                            functional: {
                                name: string;
                                slug: string;
                            };
                        };
                    };
                    method: {
                        name: string;
                        config: {
                            type: string;
                            subtype: string;
                        };
                    };
                    units: ({
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                        functions?: undefined;
                    })[];
                    config: {};
                };
                band_structure: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                        functions?: undefined;
                    })[];
                    config: {};
                };
                band_structure_dos: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                band_structure_hse: {
                    __path__: string;
                    name: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    model: {
                        name: string;
                        config: {
                            type: string;
                            subtype: string;
                            functional: {
                                name: string;
                                slug: string;
                            };
                        };
                    };
                    method: {
                        name: string;
                        config: {
                            type: string;
                            subtype: string;
                        };
                    };
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {
                        attributes: {
                            name: string;
                        };
                    };
                };
                band_structure_magn: {
                    __path__: string;
                    name: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    units: ({
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                        functions?: undefined;
                    })[];
                    config: {
                        attributes: {
                            name: string;
                        };
                    };
                };
                band_structure_soc: {
                    __path__: string;
                    name: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                        setSearchText: string;
                        config: {
                            type: string;
                            subtype: string;
                        };
                    };
                    model: {
                        name: string;
                    };
                    units: ({
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                        functions?: undefined;
                    })[];
                    config: {
                        attributes: {
                            name: string;
                        };
                    };
                };
                dielectric_tensor: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        config: {
                            data: {};
                            subtype: string;
                            type: string;
                        };
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                            operand?: undefined;
                            value?: undefined;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    } | {
                        config: {
                            name: string;
                            operand: string;
                            value: boolean;
                            execName?: undefined;
                            flavorName?: undefined;
                        };
                        type: string;
                        functions?: undefined;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                            operand?: undefined;
                            value?: undefined;
                        };
                        type: string;
                        functions?: undefined;
                    })[];
                    config: {};
                };
                dos: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                electronic_density_mesh: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                esm: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                esm_relax: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                espresso_extract_kpoints: {
                    __path__: string;
                    name: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    units: {
                        config: {
                            name: string;
                            execName: string;
                            flavorName: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                espresso_xml_get_qpt_irr: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    dynamicSubworkflow: {
                        name: string;
                        subfolder: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: never[];
                    config: {};
                };
                fixed_cell_relaxation: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                gw_band_structure_band_gap_full_frequency: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                        setSearchText: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                        functions?: undefined;
                    })[];
                    config: {};
                };
                gw_band_structure_band_gap_plasmon_pole: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                        setSearchText: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                        functions?: undefined;
                    })[];
                    config: {};
                };
                kpoint_convergence: {
                    __path__: string;
                    name: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    units: ({
                        config: {
                            name: string;
                            flowchartId: string;
                            operand: string;
                            value: number;
                            execName?: undefined;
                            flavorName?: undefined;
                            input?: undefined;
                            statement?: undefined;
                            maxOccurrences?: undefined;
                            then?: undefined;
                            else?: undefined;
                            next?: undefined;
                        };
                        type: string;
                    } | {
                        config: {
                            name: string;
                            flowchartId: string;
                            execName: string;
                            flavorName: string;
                            operand?: undefined;
                            value?: undefined;
                            input?: undefined;
                            statement?: undefined;
                            maxOccurrences?: undefined;
                            then?: undefined;
                            else?: undefined;
                            next?: undefined;
                        };
                        type: string;
                    } | {
                        config: {
                            name: string;
                            flowchartId: string;
                            operand: string;
                            value: string;
                            input: {
                                name: string;
                                scope: string;
                            }[];
                            execName?: undefined;
                            flavorName?: undefined;
                            statement?: undefined;
                            maxOccurrences?: undefined;
                            then?: undefined;
                            else?: undefined;
                            next?: undefined;
                        };
                        type: string;
                    } | {
                        config: {
                            name: string;
                            flowchartId: string;
                            statement: string;
                            maxOccurrences: number;
                            then: string;
                            else: string;
                            operand?: undefined;
                            value?: undefined;
                            execName?: undefined;
                            flavorName?: undefined;
                            input?: undefined;
                            next?: undefined;
                        };
                        type: string;
                    } | {
                        config: {
                            name: string;
                            flowchartId: string;
                            operand: string;
                            value: string;
                            input: {
                                name: string;
                                scope: string;
                            }[];
                            next: string;
                            execName?: undefined;
                            flavorName?: undefined;
                            statement?: undefined;
                            maxOccurrences?: undefined;
                            then?: undefined;
                            else?: undefined;
                        };
                        type: string;
                    })[];
                    config: {};
                };
                neb: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    config: {
                        isMultiMaterial: boolean;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                };
                ph_init_qpoints: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                ph_single_irr_qpt: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                phonon_dispersions: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                phonon_dos: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                phonon_dos_dispersion: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                phonon_reduce: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                post_processor: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                pre_processor: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                pw_scf: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    }[];
                    config: {
                        attributes: {
                            name: string;
                        };
                    };
                };
                recalculate_bands: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                surface_energy: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    dynamicSubworkflow: {
                        name: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                total_energy: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    }[];
                    tags: string[];
                    config: {};
                };
                valence_band_offset_calc_from_previous_esp_vbm: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        config: {
                            name: string;
                            operand: string;
                            value: string;
                            results?: undefined;
                        };
                        type: string;
                    } | {
                        config: {
                            name: string;
                            operand: string;
                            value: string;
                            results: {
                                name: string;
                            }[];
                        };
                        type: string;
                    })[];
                    config: {};
                };
                variable_cell_relaxation: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    config: {
                        systemName: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    }[];
                    tags: string[];
                };
                zero_point_energy: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
            };
            nwchem: {
                total_energy: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    }[];
                    config: {};
                };
            };
            python: {
                classification_tail: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        attributes: {
                            enableRender: boolean;
                            results?: undefined;
                            tags?: undefined;
                            postProcessors?: undefined;
                        };
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                        attributes?: undefined;
                    } | {
                        attributes: {
                            results: {
                                name: string;
                            }[];
                            tags: string[];
                            enableRender?: undefined;
                            postProcessors?: undefined;
                        };
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    } | {
                        attributes: {
                            postProcessors: {
                                name: string;
                            }[];
                            results: {
                                basename: string;
                                filetype: string;
                                name: string;
                            }[];
                            tags: string[];
                            enableRender?: undefined;
                        };
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    })[];
                    config: {};
                };
                clustering_tail: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        attributes: {
                            enableRender: boolean;
                            results?: undefined;
                            tags?: undefined;
                            postProcessors?: undefined;
                        };
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                        attributes?: undefined;
                    } | {
                        attributes: {
                            results: {
                                name: string;
                            }[];
                            tags: string[];
                            enableRender?: undefined;
                            postProcessors?: undefined;
                        };
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    } | {
                        attributes: {
                            postProcessors: {
                                name: string;
                            }[];
                            results: {
                                basename: string;
                                filetype: string;
                                name: string;
                            }[];
                            tags: string[];
                            enableRender?: undefined;
                        };
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    })[];
                };
                regression_tail: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        attributes: {
                            enableRender: boolean;
                            results?: undefined;
                            tags?: undefined;
                            postProcessors?: undefined;
                        };
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                        attributes?: undefined;
                    } | {
                        attributes: {
                            results: {
                                name: string;
                            }[];
                            tags: string[];
                            enableRender?: undefined;
                            postProcessors?: undefined;
                        };
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    } | {
                        attributes: {
                            postProcessors: {
                                name: string;
                            }[];
                            results: {
                                basename: string;
                                filetype: string;
                                name: string;
                            }[];
                            tags: string[];
                            enableRender?: undefined;
                        };
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    })[];
                    config: {};
                };
                train_head: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        config: {
                            flowchartId: string;
                            name: string;
                            operand: string;
                            tags: string[];
                            value: string;
                            enableRender?: undefined;
                            input?: undefined;
                            source?: undefined;
                            else?: undefined;
                            statement?: undefined;
                            then?: undefined;
                        };
                        type: string;
                    } | {
                        config: {
                            enableRender: boolean;
                            flowchartId: string;
                            input: {
                                basename: string;
                                objectData: {
                                    CONTAINER: string;
                                    NAME: string;
                                    PROVIDER: string;
                                    REGION: string;
                                };
                            }[];
                            name: string;
                            source: string;
                            operand?: undefined;
                            tags?: undefined;
                            value?: undefined;
                            else?: undefined;
                            statement?: undefined;
                            then?: undefined;
                        };
                        type: string;
                    } | {
                        config: {
                            else: string;
                            flowchartId: string;
                            input: {
                                name: string;
                                scope: string;
                            }[];
                            name: string;
                            statement: string;
                            then: string;
                            operand?: undefined;
                            tags?: undefined;
                            value?: undefined;
                            enableRender?: undefined;
                            source?: undefined;
                        };
                        type: string;
                    } | {
                        config: {
                            enableRender: boolean;
                            flowchartId: string;
                            input: {
                                basename: string;
                                objectData: {
                                    CONTAINER: string;
                                    NAME: string;
                                    PROVIDER: string;
                                    REGION: string;
                                };
                            }[];
                            name: string;
                            source: string;
                            tags: string[];
                            operand?: undefined;
                            value?: undefined;
                            else?: undefined;
                            statement?: undefined;
                            then?: undefined;
                        };
                        type: string;
                    } | {
                        config: {
                            flowchartId: string;
                            name: string;
                            operand: string;
                            value: string;
                            tags?: undefined;
                            enableRender?: undefined;
                            input?: undefined;
                            source?: undefined;
                            else?: undefined;
                            statement?: undefined;
                            then?: undefined;
                        };
                        type: string;
                    })[];
                    config: {};
                };
                python_script: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
            };
            shell: {
                batch_espresso_pwscf: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                hello_world: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                    config: {};
                };
            };
            vasp: {
                band_gap: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                        functions?: undefined;
                    })[];
                    config: {};
                };
                band_structure: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                        functions?: undefined;
                    })[];
                    config: {};
                };
                band_structure_dos: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            addResults: string[];
                            head: boolean;
                        };
                        type: string;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                        functions?: undefined;
                    })[];
                    config: {};
                };
                dos: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            addResults: string[];
                            head: boolean;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                fixed_cell_relaxation: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                initial_final_total_energies: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    config: {
                        isMultiMaterial: boolean;
                        functions: {
                            setDefaultCompute: null;
                        };
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: ({
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    } | {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                        functions?: undefined;
                    })[];
                };
                kpoint_convergence: {
                    __path__: string;
                    name: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    model: {
                        name: string;
                    };
                    method: {
                        name: string;
                    };
                    units: ({
                        config: {
                            name: string;
                            flowchartId: string;
                            operand: string;
                            value: number;
                            execName?: undefined;
                            flavorName?: undefined;
                            input?: undefined;
                            statement?: undefined;
                            maxOccurrences?: undefined;
                            then?: undefined;
                            else?: undefined;
                            next?: undefined;
                        };
                        type: string;
                    } | {
                        config: {
                            name: string;
                            flowchartId: string;
                            execName: string;
                            flavorName: string;
                            operand?: undefined;
                            value?: undefined;
                            input?: undefined;
                            statement?: undefined;
                            maxOccurrences?: undefined;
                            then?: undefined;
                            else?: undefined;
                            next?: undefined;
                        };
                        type: string;
                    } | {
                        config: {
                            name: string;
                            flowchartId: string;
                            operand: string;
                            value: string;
                            input: {
                                name: string;
                                scope: string;
                            }[];
                            execName?: undefined;
                            flavorName?: undefined;
                            statement?: undefined;
                            maxOccurrences?: undefined;
                            then?: undefined;
                            else?: undefined;
                            next?: undefined;
                        };
                        type: string;
                    } | {
                        config: {
                            name: string;
                            flowchartId: string;
                            statement: string;
                            maxOccurrences: number;
                            then: string;
                            else: string;
                            operand?: undefined;
                            value?: undefined;
                            execName?: undefined;
                            flavorName?: undefined;
                            input?: undefined;
                            next?: undefined;
                        };
                        type: string;
                    } | {
                        config: {
                            name: string;
                            flowchartId: string;
                            operand: string;
                            value: string;
                            input: {
                                name: string;
                                scope: string;
                            }[];
                            next: string;
                            execName?: undefined;
                            flavorName?: undefined;
                            statement?: undefined;
                            maxOccurrences?: undefined;
                            then?: undefined;
                            else?: undefined;
                        };
                        type: string;
                    })[];
                    config: {};
                };
                neb_subworkflow: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    config: {
                        isMultiMaterial: boolean;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                };
                prepare_images: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    config: {
                        isMultiMaterial: boolean;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        type: string;
                    }[];
                };
                recalculate_bands: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                surface_energy: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    dynamicSubworkflow: {
                        name: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                total_energy: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    }[];
                    config: {};
                };
                variable_cell_relaxation: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    config: {
                        systemName: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    }[];
                    tags: string[];
                };
                zero_point_energy: {
                    __path__: string;
                    application: {
                        name: string;
                        version: string;
                    };
                    method: {
                        name: string;
                    };
                    model: {
                        name: string;
                    };
                    name: string;
                    units: {
                        config: {
                            execName: string;
                            flavorName: string;
                            name: string;
                        };
                        functions: {
                            head: boolean;
                        };
                        type: string;
                    }[];
                    config: {};
                };
            };
        };
    } | undefined;
}): any[];
/**
 * @summary Create workflow configurations for all applications
 * @param applications {Array<String>} array of application names
 * @param workflowCls {*} workflow class to instantiate
 * @param workflowSubworkflowMapByApplication {Object} object containing all workflow/subworkflow map by application
 * @param swArgs {Object} other classes for instantiation
 * @returns {Array<Object>} array of workflow configurations
 */
export function createWorkflowConfigs({ applications, workflowCls, workflowSubworkflowMapByApplication, ...swArgs }: Array<string>): Array<Object>;
import { createWorkflow } from "./create";
export { Workflow, createWorkflow };
