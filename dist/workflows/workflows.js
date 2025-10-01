"use strict";

module.exports = {
    workflowData: {
        subworkflows: {
            deepmd: {
                deepmd: {
                    application: {
                        name: "deepmd",
                        version: "2.0.2",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "DeePMD",
                    units: [
                        {
                            config: {
                                execName: "python",
                                flavorName: "espresso_cp_to_deepmd",
                                name: "espresso_cp_to_deepmd",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "dp",
                                flavorName: "dp_train_se_e2_r",
                                name: "dp_train_se_e2_r",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "python",
                                flavorName: "espresso_to_lammps_structure",
                                name: "espresso_to_lammps_structure",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "lmp",
                                flavorName: "lammps_md",
                                name: "lammps_md",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                espresso_cp_md: {
                    application: {
                        name: "espresso",
                        version: "7.2",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "CP-MD",
                    units: [
                        {
                            config: {
                                execName: "cp.x",
                                flavorName: "cp",
                                name: "cp",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
            },
            espresso: {
                average_electrostatic_potential_find_minima: {
                    application: {
                        name: "python",
                        version: "3.10.13",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "Find ESP Value",
                    units: [
                        {
                            config: {
                                execName: "python",
                                flavorName: "generic:processing:find_extrema:scipy",
                                flowchartId: "python-find-extrema",
                                name: "Find Extrema",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                input: [
                                    {
                                        name: "STDOUT",
                                        scope: "python-find-extrema",
                                    },
                                ],
                                name: "Set Average ESP Value",
                                operand: "AVG_ESP",
                                value: "json.loads(STDOUT)['minima']",
                            },
                            type: "assignment",
                        },
                    ],
                },
                average_electrostatic_potential_via_band_structure: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    config: {
                        isMultiMaterial: true,
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Band Structure + average ESP",
                    units: [
                        {
                            config: {
                                name: "Set Material Index",
                                operand: "MATERIAL_INDEX",
                                value: 0,
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            type: "executionBuilder",
                        },
                        {
                            attributes: {
                                results: [
                                    {
                                        name: "band_gaps",
                                    },
                                ],
                            },
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_bands",
                                flowchartId: "pw-bands-calculate-band-gap",
                                name: "pw_bands",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                input: [
                                    {
                                        name: "band_gaps",
                                        scope: "pw-bands-calculate-band-gap",
                                    },
                                ],
                                name: "Select indirect band gap",
                                operand: "BAND_GAP_INDIRECT",
                                value: "[bandgap for bandgap in band_gaps['values'] if bandgap['type'] == 'indirect'][0]",
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                name: "Set Valence Band Maximum",
                                operand: "VBM",
                                value: "BAND_GAP_INDIRECT['eigenvalueValence']",
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                execName: "bands.x",
                                flavorName: "bands",
                                name: "bands",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "pp.x",
                                flavorName: "pp_electrostatic_potential",
                                name: "Electrostatic Potential (ESP)",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "average.x",
                                flavorName: "average_potential",
                                flowchartId: "average-electrostatic-potential",
                                name: "average ESP",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                input: [
                                    {
                                        name: "average_potential_profile",
                                        scope: "average-electrostatic-potential",
                                    },
                                ],
                                name: "Set Macroscopically Averaged ESP Data",
                                operand: "array_from_context",
                                value: "average_potential_profile['yDataSeries'][1]",
                            },
                            type: "assignment",
                        },
                    ],
                },
                band_gap: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Band Gap",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_nscf",
                                name: "pw_nscf",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                band_gap_hse_dos: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        config: {
                            subtype: "us",
                            type: "pseudopotential",
                        },
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        config: {
                            functional: {
                                name: "hse06",
                                slug: "hse06",
                            },
                            subtype: "hybrid",
                            type: "dft",
                        },
                        name: "DFTModel",
                    },
                    name: "HSE Band Gap",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf_hse",
                                name: "pw_scf_hse",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "projwfc.x",
                                flavorName: "projwfc",
                                name: "projwfc",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                band_structure: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Band Structure",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_bands",
                                name: "pw_bands",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "bands.x",
                                flavorName: "bands",
                                name: "bands",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                band_structure_dos: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Band Structure + Density of States",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_bands",
                                name: "pw_bands",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "bands.x",
                                flavorName: "bands",
                                name: "bands",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_nscf",
                                name: "pw_nscf",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "projwfc.x",
                                flavorName: "projwfc",
                                name: "projwfc",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                band_structure_hse: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        config: {
                            subtype: "us",
                            type: "pseudopotential",
                        },
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        config: {
                            functional: {
                                name: "hse06",
                                slug: "hse06",
                            },
                            subtype: "hybrid",
                            type: "dft",
                        },
                        name: "DFTModel",
                    },
                    name: "Band Structure - HSE",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf_bands_hse",
                                name: "pw_scf_bands_hse",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "bands.x",
                                flavorName: "bands",
                                name: "bands",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                band_structure_magn: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Spin magnetic bandstructure",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf_magn",
                                name: "pw_scf_magn",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_bands_magn",
                                name: "pw_bands_magn",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "bands.x",
                                flavorName: "bands_spin_up",
                                name: "bands_spin_up",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "bands.x",
                                flavorName: "bands_spin_dn",
                                name: "bands_spin_dn",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                band_structure_soc: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        config: {
                            subtype: "nc-fr",
                            type: "pseudopotential",
                        },
                        name: "PseudopotentialMethod",
                        setSearchText: "nc-fr",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Spin orbit coupling bandstructure",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf_soc",
                                name: "pw_scf_soc",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_bands_soc",
                                name: "pw_bands_soc",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "bands.x",
                                flavorName: "bands",
                                name: "bands",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                dielectric_tensor: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        config: {
                            data: {},
                            subtype: "nc",
                            type: "pseudopotential",
                        },
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Compute Dielectric Function",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                name: "Set No-Symmetry Flag",
                                operand: "NO_SYMMETRY_NO_INVERSION",
                                value: true,
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_nscf",
                                name: "pw_nscf",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "epsilon.x",
                                flavorName: "dielectric_tensor",
                                name: "Compute dielectric function",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                dos: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Density of States",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_nscf",
                                name: "pw_nscf",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "projwfc.x",
                                flavorName: "projwfc",
                                name: "projwfc",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                electronic_density_mesh: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Electronic Density Mesh",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "pp.x",
                                flavorName: "pp_density",
                                name: "pp_density",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                esm: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Effective Screening Medium (ESM)",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_esm",
                                name: "pw_esm",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                esm_relax: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Effective Screening Medium (ESM) Relax",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_esm_relax",
                                name: "pw_esm_relax",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                espresso_extract_kpoints: {
                    application: {
                        name: "python",
                        version: "3.10.13",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "Extract KPOINTS",
                    units: [
                        {
                            config: {
                                execName: "python",
                                flavorName: "espresso_extract_kpoints",
                                name: "Extract kpoints",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                espresso_xml_get_qpt_irr: {
                    application: {
                        name: "python",
                        version: "3.10.13",
                    },
                    dynamicSubworkflow: {
                        name: "getQpointIrrep",
                        subfolder: "espresso",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "espresso-xml-get-qpt-irr",
                    units: [],
                },
                fixed_cell_relaxation: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Fixed-cell Relaxation",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_relax",
                                name: "pw_relax",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                gw_band_structure_band_gap_full_frequency: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                        setSearchText: ".*dojo-oncv.*",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Full Frequency GW Band Structure + Band Gap",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "gw.x",
                                flavorName: "gw_bands_full_frequency",
                                name: "gw_bands_full_frequency",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                gw_band_structure_band_gap_plasmon_pole: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                        setSearchText: ".*dojo-oncv.*",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Plasmon-Pole GW Band Structure + Band Gap",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "gw.x",
                                flavorName: "gw_bands_plasmon_pole",
                                name: "gw_bands_plasmon_pole",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                hubbard_u_hp: {
                    application: {
                        name: "espresso",
                        version: "7.2",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Hubbard U",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf_dft_u",
                                name: "pw_scf_dft_u",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "hp.x",
                                flavorName: "hp",
                                name: "hp",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                kpoint_convergence: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "K-point Convergence",
                    units: [
                        {
                            config: {
                                flowchartId: "init-tolerance",
                                name: "Init tolerance",
                                operand: "TOL",
                                value: 0.00001,
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                flowchartId: "init-increment",
                                name: "Init increment",
                                operand: "INC",
                                value: 1,
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                flowchartId: "init-result",
                                name: "Init result",
                                operand: "PREV_RESULT",
                                value: 0,
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                flowchartId: "init-parameter",
                                name: "Init parameter",
                                operand: "PARAMETER",
                                value: 1,
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf_kpt_conv",
                                flowchartId: "pwscf-kpoint-convergence",
                                name: "pw_scf_kpt_conv",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                flowchartId: "store-result",
                                input: [
                                    {
                                        name: "total_energy",
                                        scope: "pwscf-kpoint-convergence",
                                    },
                                ],
                                name: "store result",
                                operand: "RESULT",
                                value: "total_energy",
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                else: "update-result",
                                flowchartId: "check-convergence",
                                maxOccurrences: 50,
                                name: "check convergence",
                                statement: "abs((PREV_RESULT-RESULT)/RESULT) < TOL",
                                then: "convergence-is-reached",
                            },
                            type: "condition",
                        },
                        {
                            config: {
                                flowchartId: "update-result",
                                input: [
                                    {
                                        name: "RESULT",
                                        scope: "global",
                                    },
                                ],
                                name: "update result",
                                operand: "PREV_RESULT",
                                value: "RESULT",
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                flowchartId: "increment-parameter",
                                input: [
                                    {
                                        name: "INC",
                                        scope: "global",
                                    },
                                    {
                                        name: "PARAMETER",
                                        scope: "global",
                                    },
                                ],
                                name: "increment parameter",
                                next: "pwscf-kpoint-convergence",
                                operand: "PREV_RESULT",
                                value: "PARAMETER+INC",
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                flowchartId: "convergence-is-reached",
                                input: [
                                    {
                                        name: "PARAMETER",
                                        scope: "global",
                                    },
                                ],
                                name: "exit",
                                operand: "PARAMETER",
                                value: "PARAMETER",
                            },
                            type: "assignment",
                        },
                    ],
                },
                neb: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    config: {
                        isMultiMaterial: true,
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Nudged Elastic Band (NEB)",
                    units: [
                        {
                            config: {
                                execName: "neb.x",
                                flavorName: "neb",
                                name: "neb",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                ph_init_qpoints: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "ph-init-qpoints",
                    units: [
                        {
                            config: {
                                execName: "ph.x",
                                flavorName: "ph_init_qpoints",
                                name: "ph_init_qpoints",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                ph_single_irr_qpt: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "ph-single-irr-qpt",
                    units: [
                        {
                            config: {
                                execName: "ph.x",
                                flavorName: "ph_single_irr_qpt",
                                name: "ph_single_irr_qpt",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                phonon_dispersions: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Phonon Dispersions",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "ph.x",
                                flavorName: "ph_grid",
                                name: "ph_grid",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "q2r.x",
                                flavorName: "q2r",
                                name: "q2r",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "matdyn.x",
                                flavorName: "matdyn_path",
                                name: "matdyn_path",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                phonon_dos: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Phonon Density of States",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "ph.x",
                                flavorName: "ph_grid",
                                name: "ph_grid",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "q2r.x",
                                flavorName: "q2r",
                                name: "q2r",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "matdyn.x",
                                flavorName: "matdyn_grid",
                                name: "matdyn_grid",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                phonon_dos_dispersion: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Phonon Density of States + Dispersions",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "ph.x",
                                flavorName: "ph_grid",
                                name: "ph_grid",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "q2r.x",
                                flavorName: "q2r",
                                name: "q2r",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "matdyn.x",
                                flavorName: "matdyn_grid",
                                name: "matdyn_grid",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "matdyn.x",
                                flavorName: "matdyn_path",
                                name: "matdyn_path",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                phonon_reduce: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "reduce",
                    units: [
                        {
                            config: {
                                execName: "ph.x",
                                flavorName: "ph_grid_restart",
                                name: "ph_grid_restart",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "q2r.x",
                                flavorName: "q2r",
                                name: "q2r",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "matdyn.x",
                                flavorName: "matdyn_grid",
                                name: "matdyn_grid",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "matdyn.x",
                                flavorName: "matdyn_path",
                                name: "matdyn_path",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                post_processor: {
                    application: {
                        name: "shell",
                        version: "5.1.8",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "post-processor",
                    units: [
                        {
                            config: {
                                execName: "sh",
                                flavorName: "espresso_collect_dynmat",
                                name: "shell",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                pre_processor: {
                    application: {
                        name: "shell",
                        version: "5.1.8",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "pre-processor",
                    units: [
                        {
                            config: {
                                execName: "sh",
                                flavorName: "espresso_link_outdir_save",
                                name: "shell",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                pw_scf: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "pw-scf",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                recalculate_bands: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Recalculate Bands",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_bands",
                                name: "pw_bands",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "bands.x",
                                flavorName: "bands",
                                name: "bands",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                surface_energy: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    dynamicSubworkflow: {
                        name: "surfaceEnergy",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Surface Energy",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                total_energy: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Total Energy",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                valence_band_offset_calc_from_previous_esp_vbm: {
                    application: {
                        name: "python",
                        version: "3.10.13",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "Calculate VBO",
                    units: [
                        {
                            config: {
                                name: "Difference of valence band maxima",
                                operand: "VBM_DIFF",
                                value: "VBM_LEFT - VBM_RIGHT",
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                name: "Difference of macroscopically averaged ESP in bulk",
                                operand: "AVG_ESP_DIFF",
                                value: "AVG_ESP_LEFT[0] - AVG_ESP_RIGHT[0]",
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                name: "Lineup of macroscopically averaged ESP in interface",
                                operand: "ESP_LINEUP",
                                value: "np.abs(AVG_ESP_INTERFACE[0] - AVG_ESP_INTERFACE[1])",
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                name: "Valence Band Offset",
                                operand: "VALENCE_BAND_OFFSET",
                                results: [
                                    {
                                        name: "valence_band_offset",
                                    },
                                ],
                                value: "abs(VBM_DIFF - AVG_ESP_DIFF + (np.sign(AVG_ESP_DIFF) * ESP_LINEUP))",
                            },
                            type: "assignment",
                        },
                    ],
                },
                variable_cell_relaxation: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    config: {
                        systemName: "espresso-variable-cell-relaxation",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Variable-cell Relaxation",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_vc-relax",
                                name: "pw_vc-relax",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                zero_point_energy: {
                    application: {
                        name: "espresso",
                        version: "6.3",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Zero Point Energy",
                    units: [
                        {
                            config: {
                                execName: "pw.x",
                                flavorName: "pw_scf",
                                name: "pw_scf",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "ph.x",
                                flavorName: "ph_gamma",
                                name: "ph_zpe",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
            },
            jupyterLab: {
                jupyter_notebook: {
                    application: {
                        name: "jupyterLab",
                        version: "4.3.0",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "Jupyter Notebook",
                    units: [
                        {
                            attributes: {
                                preProcessors: [
                                    {
                                        name: "record_python_environment",
                                    },
                                ],
                            },
                            config: {
                                execName: "jupyter",
                                flavorName: "notebook",
                                name: "notebook",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
            },
            nwchem: {
                total_energy: {
                    application: {
                        name: "nwchem",
                        version: "7.0.2",
                    },
                    method: {
                        name: "LocalOrbitalMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Total Energy",
                    units: [
                        {
                            config: {
                                execName: "nwchem",
                                flavorName: "nwchem_total_energy",
                                name: "nwchem_total_energy",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
            },
            python: {
                python_script: {
                    application: {
                        name: "python",
                        version: "3.10.13",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "Python Script",
                    units: [
                        {
                            config: {
                                execName: "python",
                                flavorName: "hello_world",
                                name: "python",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
            },
            "python/ml": {
                classification_tail: {
                    application: {
                        name: "python",
                        version: "3.10.13",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "Machine Learning",
                    units: [
                        {
                            attributes: {
                                enableRender: true,
                            },
                            config: {
                                execName: "python",
                                flavorName: "pyml:setup_variables_packages",
                                name: "Setup Variables and Packages",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "python",
                                flavorName: "pyml:data_input:read_csv:pandas",
                                name: "Data Input",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "python",
                                flavorName: "pyml:data_input:train_test_split:sklearn",
                                name: "Train Test Split",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "python",
                                flavorName: "pyml:pre_processing:standardization:sklearn",
                                name: "Data Standardize",
                            },
                            type: "executionBuilder",
                        },
                        {
                            attributes: {
                                results: [
                                    {
                                        name: "workflow:pyml_predict",
                                    },
                                ],
                                tags: [
                                    "remove-all-results",
                                    "creates-predictions-csv-during-predict-phase",
                                ],
                            },
                            config: {
                                execName: "python",
                                flavorName: "pyml:model:random_forest_classification:sklearn",
                                name: "Model Train and Predict",
                            },
                            type: "executionBuilder",
                        },
                        {
                            attributes: {
                                postProcessors: [
                                    {
                                        name: "remove_virtual_environment",
                                    },
                                ],
                                results: [
                                    {
                                        basename: "my_roc_plot.png",
                                        filetype: "image",
                                        name: "file_content",
                                    },
                                ],
                                tags: ["remove-all-results"],
                            },
                            config: {
                                execName: "python",
                                flavorName: "pyml:post_processing:roc_curve:sklearn",
                                name: "ROC Curve Plot",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                clustering_tail: {
                    application: {
                        name: "python",
                        version: "3.10.13",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "Machine Learning",
                    units: [
                        {
                            attributes: {
                                enableRender: true,
                            },
                            config: {
                                execName: "python",
                                flavorName: "pyml:setup_variables_packages",
                                name: "Setup Variables and Packages",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "python",
                                flavorName: "pyml:data_input:read_csv:pandas",
                                name: "Data Input",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "python",
                                flavorName: "pyml:data_input:train_test_split:sklearn",
                                name: "Train Test Split",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "python",
                                flavorName: "pyml:pre_processing:standardization:sklearn",
                                name: "Data Standardize",
                            },
                            type: "executionBuilder",
                        },
                        {
                            attributes: {
                                results: [
                                    {
                                        name: "workflow:pyml_predict",
                                    },
                                ],
                                tags: [
                                    "remove-all-results",
                                    "creates-predictions-csv-during-predict-phase",
                                ],
                            },
                            config: {
                                execName: "python",
                                flavorName: "pyml:model:k_means_clustering:sklearn",
                                name: "Model Train and Predict",
                            },
                            type: "executionBuilder",
                        },
                        {
                            attributes: {
                                postProcessors: [
                                    {
                                        name: "remove_virtual_environment",
                                    },
                                ],
                                results: [
                                    {
                                        basename: "train_test_split.png",
                                        filetype: "image",
                                        name: "file_content",
                                    },
                                    {
                                        basename: "train_clusters.png",
                                        filetype: "image",
                                        name: "file_content",
                                    },
                                    {
                                        basename: "test_clusters.png",
                                        filetype: "image",
                                        name: "file_content",
                                    },
                                ],
                                tags: ["remove-all-results"],
                            },
                            config: {
                                execName: "python",
                                flavorName: "pyml:post_processing:pca_2d_clusters:matplotlib",
                                name: "2D PCA Clusters Plot",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                regression_tail: {
                    application: {
                        name: "python",
                        version: "3.10.13",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "Machine Learning",
                    units: [
                        {
                            attributes: {
                                enableRender: true,
                            },
                            config: {
                                execName: "python",
                                flavorName: "pyml:setup_variables_packages",
                                name: "Setup Variables and Packages",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "python",
                                flavorName: "pyml:data_input:read_csv:pandas",
                                name: "Data Input",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "python",
                                flavorName: "pyml:data_input:train_test_split:sklearn",
                                name: "Train Test Split",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "python",
                                flavorName: "pyml:pre_processing:standardization:sklearn",
                                name: "Data Standardize",
                            },
                            type: "executionBuilder",
                        },
                        {
                            attributes: {
                                results: [
                                    {
                                        name: "workflow:pyml_predict",
                                    },
                                ],
                                tags: [
                                    "remove-all-results",
                                    "creates-predictions-csv-during-predict-phase",
                                ],
                            },
                            config: {
                                execName: "python",
                                flavorName: "pyml:model:multilayer_perceptron:sklearn",
                                name: "Model Train and Predict",
                            },
                            type: "executionBuilder",
                        },
                        {
                            attributes: {
                                postProcessors: [
                                    {
                                        name: "remove_virtual_environment",
                                    },
                                ],
                                results: [
                                    {
                                        basename: "my_parity_plot.png",
                                        filetype: "image",
                                        name: "file_content",
                                    },
                                ],
                                tags: ["remove-all-results"],
                            },
                            config: {
                                execName: "python",
                                flavorName: "pyml:post_processing:parity_plot:matplotlib",
                                name: "Parity Plot",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                train_head: {
                    application: {
                        name: "python",
                        version: "3.10.13",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "Set Up the Job",
                    units: [
                        {
                            config: {
                                flowchartId: "head-set-predict-status",
                                name: "Set Workflow Mode",
                                operand: "IS_WORKFLOW_RUNNING_TO_PREDICT",
                                tags: ["pyml:workflow-type-setter"],
                                value: "False",
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                enableRender: true,
                                flowchartId: "head-fetch-training-data",
                                input: [
                                    {
                                        basename: "{{DATASET_BASENAME}}",
                                        objectData: {
                                            CONTAINER: "",
                                            NAME: "{{DATASET_FILEPATH}}",
                                            PROVIDER: "",
                                            REGION: "",
                                        },
                                    },
                                ],
                                name: "Fetch Dataset",
                                source: "object_storage",
                            },
                            type: "io",
                        },
                        {
                            config: {
                                else: "end-of-ml-train-head",
                                flowchartId: "head-branch-on-predict-status",
                                input: [
                                    {
                                        name: "IS_WORKFLOW_RUNNING_TO_PREDICT",
                                        scope: "global",
                                    },
                                ],
                                name: "Train or Predict?",
                                statement: "IS_WORKFLOW_RUNNING_TO_PREDICT",
                                then: "head-fetch-trained-model",
                            },
                            type: "condition",
                        },
                        {
                            config: {
                                enableRender: true,
                                flowchartId: "head-fetch-trained-model",
                                input: [
                                    {
                                        basename: "",
                                        objectData: {
                                            CONTAINER: "",
                                            NAME: "",
                                            PROVIDER: "",
                                            REGION: "",
                                        },
                                    },
                                ],
                                name: "Fetch Trained Model as file",
                                source: "object_storage",
                                tags: ["set-io-unit-filenames"],
                            },
                            type: "io",
                        },
                        {
                            config: {
                                flowchartId: "end-of-ml-train-head",
                                name: "End Setup",
                                operand: "IS_SETUP_COMPLETE",
                                value: "True",
                            },
                            type: "assignment",
                        },
                    ],
                },
            },
            shell: {
                batch_espresso_pwscf: {
                    application: {
                        name: "shell",
                        version: "5.1.8",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "Shell Batch Job (Espresso PWSCF)",
                    units: [
                        {
                            config: {
                                execName: "sh",
                                flavorName: "job_espresso_pw_scf",
                                name: "shell",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                hello_world: {
                    application: {
                        name: "shell",
                        version: "5.1.8",
                    },
                    method: {
                        name: "UnknownMethod",
                    },
                    model: {
                        name: "UnknownModel",
                    },
                    name: "Shell Hello World",
                    units: [
                        {
                            config: {
                                execName: "sh",
                                flavorName: "hello_world",
                                name: "shell",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
            },
            vasp: {
                band_gap: {
                    application: {
                        name: "vasp",
                        version: "5.4.4",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Band Gap",
                    units: [
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp",
                                name: "vasp",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp_nscf",
                                name: "vasp_nscf",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                band_structure: {
                    application: {
                        name: "vasp",
                        version: "5.4.4",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Band Structure",
                    units: [
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp",
                                name: "vasp",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp_bands",
                                name: "vasp_bands",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                band_structure_dos: {
                    application: {
                        name: "vasp",
                        version: "5.4.4",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Band Structure + Density of States",
                    units: [
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp",
                                name: "vasp",
                            },
                            functions: {
                                addResults: ["density_of_states"],
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp_bands",
                                name: "vasp_bands",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                dos: {
                    application: {
                        name: "vasp",
                        version: "5.4.4",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Density of States",
                    units: [
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp",
                                name: "vasp",
                            },
                            functions: {
                                addResults: ["density_of_states"],
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                fixed_cell_relaxation: {
                    application: {
                        name: "vasp",
                        version: "5.4.4",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Fixed-cell Relaxation",
                    units: [
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp_relax",
                                name: "vasp_relax",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                initial_final_total_energies: {
                    application: {
                        name: "vasp",
                        version: "5.4.4",
                    },
                    config: {
                        functions: {
                            setDefaultCompute: null,
                        },
                        isMultiMaterial: true,
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Initial/Final Total Energies",
                    units: [
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp_neb_initial",
                                name: "vasp_neb_initial",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp_neb_final",
                                name: "vasp_neb_final",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                kpoint_convergence: {
                    application: {
                        name: "vasp",
                        version: "5.4.4",
                    },
                    method: {
                        config: {
                            subtype: "paw",
                            type: "pseudopotential",
                        },
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "K-point Convergence",
                    units: [
                        {
                            config: {
                                flowchartId: "init-tolerance",
                                name: "Init tolerance",
                                operand: "TOL",
                                value: 0.00001,
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                flowchartId: "init-increment",
                                name: "Init increment",
                                operand: "INC",
                                value: 1,
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                flowchartId: "init-result",
                                name: "Init result",
                                operand: "PREV_RESULT",
                                value: 0,
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                flowchartId: "init-parameter",
                                name: "Init parameter",
                                operand: "PARAMETER",
                                value: 1,
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp_kpt_conv",
                                flowchartId: "vasp-kpoint-convergence",
                                name: "vasp_kpt_conv",
                            },
                            type: "executionBuilder",
                        },
                        {
                            config: {
                                flowchartId: "store-result",
                                input: [
                                    {
                                        name: "total_energy",
                                        scope: "vasp-kpoint-convergence",
                                    },
                                ],
                                name: "store result",
                                operand: "RESULT",
                                value: "total_energy",
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                else: "update-result",
                                flowchartId: "check-convergence",
                                maxOccurrences: 50,
                                name: "check convergence",
                                statement: "abs((PREV_RESULT-RESULT)/RESULT) < TOL",
                                then: "convergence-is-reached",
                            },
                            type: "condition",
                        },
                        {
                            config: {
                                flowchartId: "update-result",
                                input: [
                                    {
                                        name: "RESULT",
                                        scope: "global",
                                    },
                                ],
                                name: "update result",
                                operand: "PREV_RESULT",
                                value: "RESULT",
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                flowchartId: "increment-parameter",
                                input: [
                                    {
                                        name: "INC",
                                        scope: "global",
                                    },
                                    {
                                        name: "PARAMETER",
                                        scope: "global",
                                    },
                                ],
                                name: "increment parameter",
                                next: "vasp-kpoint-convergence",
                                operand: "PREV_RESULT",
                                value: "PARAMETER+INC",
                            },
                            type: "assignment",
                        },
                        {
                            config: {
                                flowchartId: "convergence-is-reached",
                                input: [
                                    {
                                        name: "PARAMETER",
                                        scope: "global",
                                    },
                                ],
                                name: "exit",
                                operand: "PARAMETER",
                                value: "PARAMETER",
                            },
                            type: "assignment",
                        },
                    ],
                },
                neb_subworkflow: {
                    application: {
                        name: "vasp",
                        version: "5.4.4",
                    },
                    config: {
                        isMultiMaterial: true,
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Nudged Elastic Band (NEB)",
                    units: [
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp_neb",
                                name: "vasp_neb",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                prepare_images: {
                    application: {
                        name: "shell",
                        version: "5.1.8",
                    },
                    config: {
                        isMultiMaterial: true,
                    },
                    method: {
                        name: "Method",
                    },
                    model: {
                        name: "Model",
                    },
                    name: "Prepare Directories",
                    units: [
                        {
                            config: {
                                execName: "sh",
                                flavorName: "bash_vasp_prepare_neb_images",
                                name: "prepare-neb-images",
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                recalculate_bands: {
                    application: {
                        name: "vasp",
                        version: "5.4.4",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Recalculate Bands",
                    units: [
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp_bands",
                                name: "vasp_bands",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                surface_energy: {
                    application: {
                        name: "vasp",
                        version: "5.4.4",
                    },
                    dynamicSubworkflow: {
                        name: "surfaceEnergy",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Surface Energy",
                    units: [
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp_symprec",
                                name: "vasp_symprec",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                total_energy: {
                    application: {
                        name: "vasp",
                        version: "5.4.4",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Total Energy",
                    units: [
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp",
                                name: "vasp",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                variable_cell_relaxation: {
                    application: {
                        name: "vasp",
                        version: "5.4.4",
                    },
                    config: {
                        systemName: "vasp-variable-cell-relaxation",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Variable-cell Relaxation",
                    units: [
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp_vc_relax",
                                name: "vasp_vc_relax",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
                zero_point_energy: {
                    application: {
                        name: "vasp",
                        version: "5.4.4",
                    },
                    method: {
                        name: "PseudopotentialMethod",
                    },
                    model: {
                        name: "DFTModel",
                    },
                    name: "Zero Point Energy",
                    units: [
                        {
                            config: {
                                execName: "vasp",
                                flavorName: "vasp_zpe",
                                name: "vasp_zpe",
                            },
                            functions: {
                                head: true,
                            },
                            type: "executionBuilder",
                        },
                    ],
                },
            },
        },
        workflows: {
            deepmd: {
                deepmd_md: {
                    name: "Molecular Dynamics - DeePMD",
                    units: [
                        {
                            name: "espresso_cp_md",
                            type: "subworkflow",
                        },
                        {
                            name: "deepmd",
                            type: "subworkflow",
                        },
                    ],
                },
            },
            espresso: {
                band_gap: {
                    name: "Band Gap",
                    units: [
                        {
                            name: "band_gap",
                            type: "subworkflow",
                        },
                    ],
                },
                band_gap_dos_hse: {
                    name: "Band Gap + DoS - HSE",
                    units: [
                        {
                            name: "band_gap_hse_dos",
                            type: "subworkflow",
                        },
                    ],
                },
                band_structure: {
                    name: "Band Structure",
                    units: [
                        {
                            name: "band_structure",
                            type: "subworkflow",
                        },
                    ],
                },
                band_structure_dos: {
                    name: "Band Structure + Density of States",
                    units: [
                        {
                            name: "band_structure_dos",
                            type: "subworkflow",
                        },
                    ],
                },
                band_structure_hse: {
                    name: "Band Structure - HSE",
                    units: [
                        {
                            config: {
                                attributes: {
                                    name: "Preliminary SCF Calculation",
                                },
                            },
                            name: "pw_scf",
                            type: "subworkflow",
                        },
                        {
                            name: "espresso_extract_kpoints",
                            type: "subworkflow",
                        },
                        {
                            config: {
                                attributes: {
                                    name: "Main HSE Run",
                                },
                            },
                            name: "band_structure_hse",
                            type: "subworkflow",
                        },
                    ],
                },
                band_structure_magn: {
                    name: "Bandstructure with spin magnetism - QE",
                    units: [
                        {
                            config: {
                                attributes: {
                                    name: "Bandstructure with spin magnetism",
                                },
                            },
                            name: "band_structure_magn",
                            type: "subworkflow",
                        },
                    ],
                },
                band_structure_soc: {
                    name: "Bandstructure with SOC - QE",
                    units: [
                        {
                            config: {
                                attributes: {
                                    name: "Bandstructure with SOC",
                                },
                            },
                            name: "band_structure_soc",
                            type: "subworkflow",
                        },
                    ],
                },
                dielectric_tensor: {
                    name: "Dielectric Function",
                    units: [
                        {
                            name: "dielectric_tensor",
                            type: "subworkflow",
                        },
                    ],
                },
                dos: {
                    name: "Density of States",
                    units: [
                        {
                            name: "dos",
                            type: "subworkflow",
                        },
                    ],
                },
                electronic_density_mesh: {
                    name: "Electronic Density Mesh",
                    units: [
                        {
                            name: "electronic_density_mesh",
                            type: "subworkflow",
                        },
                    ],
                },
                esm: {
                    name: "Effective Screening Medium (ESM)",
                    units: [
                        {
                            name: "esm",
                            type: "subworkflow",
                        },
                    ],
                },
                esm_relax: {
                    name: "Effective Screening Medium (ESM) Relax",
                    units: [
                        {
                            name: "esm_relax",
                            type: "subworkflow",
                        },
                    ],
                },
                fixed_cell_relaxation: {
                    name: "Fixed-cell Relaxation",
                    units: [
                        {
                            name: "fixed_cell_relaxation",
                            type: "subworkflow",
                        },
                    ],
                },
                gw_band_structure_band_gap_full_frequency: {
                    name: "Full Frequency GW Band Structure + Band Gap",
                    units: [
                        {
                            name: "gw_band_structure_band_gap_full_frequency",
                            type: "subworkflow",
                        },
                    ],
                },
                gw_band_structure_band_gap_plasmon_pole: {
                    name: "Plasmon-Pole GW Band Structure + Band Gap",
                    units: [
                        {
                            name: "gw_band_structure_band_gap_plasmon_pole",
                            type: "subworkflow",
                        },
                    ],
                },
                hubbard_u_hp: {
                    name: "Hubbard U - HP",
                    units: [
                        {
                            config: {
                                attributes: {
                                    name: "Hubbard U Calculation",
                                },
                            },
                            name: "hubbard_u_hp",
                            type: "subworkflow",
                        },
                    ],
                },
                kpoint_convergence: {
                    name: "K-point Convergence",
                    units: [
                        {
                            name: "kpoint_convergence",
                            type: "subworkflow",
                        },
                    ],
                },
                neb: {
                    name: "Nudged Elastic Band (NEB)",
                    units: [
                        {
                            name: "neb",
                            type: "subworkflow",
                        },
                    ],
                },
                phonon_dispersions: {
                    name: "Phonon Dispersions",
                    units: [
                        {
                            name: "phonon_dispersions",
                            type: "subworkflow",
                        },
                    ],
                },
                phonon_dos: {
                    name: "Phonon Density of States",
                    units: [
                        {
                            name: "phonon_dos",
                            type: "subworkflow",
                        },
                    ],
                },
                phonon_dos_dispersion: {
                    name: "Phonon Density of States + Dispersions",
                    units: [
                        {
                            name: "phonon_dos_dispersion",
                            type: "subworkflow",
                        },
                    ],
                },
                phonon_map: {
                    name: "Phonon Map",
                    units: [
                        {
                            name: "phononMap",
                            type: "workflow",
                            units: [
                                {
                                    name: "pw_scf",
                                    type: "subworkflow",
                                },
                                {
                                    name: "ph_init_qpoints",
                                    type: "subworkflow",
                                },
                                {
                                    name: "espresso_xml_get_qpt_irr",
                                    type: "subworkflow",
                                },
                            ],
                        },
                        {
                            config: {
                                functions: {
                                    setDefaultCompute: null,
                                },
                                input: {
                                    name: "Q_POINTS",
                                },
                                mapUnit: true,
                            },
                            name: "phonon_map_workflow",
                            type: "workflow",
                            units: [
                                {
                                    name: "pre_processor",
                                    type: "subworkflow",
                                },
                                {
                                    name: "ph_single_irr_qpt",
                                    type: "subworkflow",
                                },
                                {
                                    name: "post_processor",
                                    type: "subworkflow",
                                },
                            ],
                        },
                        {
                            name: "phonon_reduce",
                            type: "subworkflow",
                        },
                    ],
                },
                recalculate_bands: {
                    name: "Recalculate Bands",
                    units: [
                        {
                            name: "recalculate_bands",
                            type: "subworkflow",
                        },
                    ],
                },
                surface_energy: {
                    name: "Surface Energy",
                    units: [
                        {
                            name: "surface_energy",
                            type: "subworkflow",
                        },
                    ],
                },
                total_energy: {
                    name: "Total Energy",
                    units: [
                        {
                            name: "total_energy",
                            type: "subworkflow",
                        },
                    ],
                },
                valence_band_offset: {
                    name: "Valence Band Offset (2D)",
                    units: [
                        {
                            config: {
                                attributes: {
                                    name: "BS + Avg ESP (Interface)",
                                },
                            },
                            name: "average_electrostatic_potential_via_band_structure",
                            type: "subworkflow",
                            unitConfigs: [
                                {
                                    config: {
                                        attributes: {
                                            name: "Set Material Index (Interface)",
                                            value: "0",
                                        },
                                    },
                                    index: 0,
                                    type: "assignment",
                                },
                            ],
                        },
                        {
                            config: {
                                attributes: {
                                    name: "Find ESP Values (Interface)",
                                },
                            },
                            name: "average_electrostatic_potential_find_minima",
                            type: "subworkflow",
                            unitConfigs: [
                                {
                                    config: {
                                        attributes: {
                                            operand: "AVG_ESP_INTERFACE",
                                        },
                                    },
                                    index: 1,
                                    type: "assignment",
                                },
                            ],
                        },
                        {
                            config: {
                                attributes: {
                                    name: "BS + Avg ESP (interface left)",
                                },
                            },
                            name: "average_electrostatic_potential_via_band_structure",
                            type: "subworkflow",
                            unitConfigs: [
                                {
                                    config: {
                                        attributes: {
                                            name: "Set Material Index (Interface left)",
                                            value: "1",
                                        },
                                    },
                                    index: 0,
                                    type: "assignment",
                                },
                                {
                                    config: {
                                        attributes: {
                                            flowchartId: "pw-bands-calculate-band-gap-left",
                                        },
                                    },
                                    index: 2,
                                    type: "executionBuilder",
                                },
                                {
                                    config: {
                                        attributes: {
                                            input: [
                                                {
                                                    name: "band_gaps",
                                                    scope: "pw-bands-calculate-band-gap-left",
                                                },
                                            ],
                                        },
                                    },
                                    index: 3,
                                    type: "assignment",
                                },
                                {
                                    config: {
                                        attributes: {
                                            operand: "VBM_LEFT",
                                        },
                                    },
                                    index: 4,
                                    type: "assignment",
                                },
                                {
                                    config: {
                                        attributes: {
                                            flowchartId: "average-electrostatic-potential-left",
                                        },
                                    },
                                    index: 7,
                                    type: "executionBuilder",
                                },
                                {
                                    config: {
                                        attributes: {
                                            input: [
                                                {
                                                    name: "average_potential_profile",
                                                    scope: "average-electrostatic-potential-left",
                                                },
                                            ],
                                        },
                                    },
                                    index: 8,
                                    type: "assignment",
                                },
                            ],
                        },
                        {
                            config: {
                                attributes: {
                                    name: "Find ESP Value (Interface left)",
                                },
                            },
                            name: "average_electrostatic_potential_find_minima",
                            type: "subworkflow",
                            unitConfigs: [
                                {
                                    config: {
                                        attributes: {
                                            flowchartId: "python-find-extrema-left",
                                        },
                                    },
                                    index: 0,
                                    type: "executionBuilder",
                                },
                                {
                                    config: {
                                        attributes: {
                                            input: [
                                                {
                                                    name: "STDOUT",
                                                    scope: "python-find-extrema-left",
                                                },
                                            ],
                                            operand: "AVG_ESP_LEFT",
                                        },
                                    },
                                    index: 1,
                                    type: "assignment",
                                },
                            ],
                        },
                        {
                            config: {
                                attributes: {
                                    name: "BS + Avg ESP (interface right)",
                                },
                            },
                            name: "average_electrostatic_potential_via_band_structure",
                            type: "subworkflow",
                            unitConfigs: [
                                {
                                    config: {
                                        attributes: {
                                            name: "Set Material Index (Interface right)",
                                            value: "2",
                                        },
                                    },
                                    index: 0,
                                    type: "assignment",
                                },
                                {
                                    config: {
                                        attributes: {
                                            flowchartId: "pw-bands-calculate-band-gap-right",
                                        },
                                    },
                                    index: 2,
                                    type: "executionBuilder",
                                },
                                {
                                    config: {
                                        attributes: {
                                            input: [
                                                {
                                                    name: "band_gaps",
                                                    scope: "pw-bands-calculate-band-gap-right",
                                                },
                                            ],
                                        },
                                    },
                                    index: 3,
                                    type: "assignment",
                                },
                                {
                                    config: {
                                        attributes: {
                                            operand: "VBM_RIGHT",
                                        },
                                    },
                                    index: 4,
                                    type: "assignment",
                                },
                                {
                                    config: {
                                        attributes: {
                                            flowchartId: "average-electrostatic-potential-right",
                                        },
                                    },
                                    index: 7,
                                    type: "executionBuilder",
                                },
                                {
                                    config: {
                                        attributes: {
                                            input: [
                                                {
                                                    name: "average_potential_profile",
                                                    scope: "average-electrostatic-potential-right",
                                                },
                                            ],
                                        },
                                    },
                                    index: 8,
                                    type: "assignment",
                                },
                            ],
                        },
                        {
                            config: {
                                attributes: {
                                    name: "Find ESP Value (Interface right)",
                                },
                            },
                            name: "average_electrostatic_potential_find_minima",
                            type: "subworkflow",
                            unitConfigs: [
                                {
                                    config: {
                                        attributes: {
                                            flowchartId: "python-find-extrema-right",
                                        },
                                    },
                                    index: 0,
                                    type: "executionBuilder",
                                },
                                {
                                    config: {
                                        attributes: {
                                            input: [
                                                {
                                                    name: "STDOUT",
                                                    scope: "python-find-extrema-right",
                                                },
                                            ],
                                            operand: "AVG_ESP_RIGHT",
                                        },
                                    },
                                    index: 1,
                                    type: "assignment",
                                },
                            ],
                        },
                        {
                            name: "valence_band_offset_calc_from_previous_esp_vbm",
                            type: "subworkflow",
                        },
                    ],
                },
                variable_cell_relaxation: {
                    name: "Variable-cell Relaxation",
                    units: [
                        {
                            name: "variable_cell_relaxation",
                            type: "subworkflow",
                        },
                    ],
                },
                zero_point_energy: {
                    name: "Zero Point Energy",
                    units: [
                        {
                            name: "zero_point_energy",
                            type: "subworkflow",
                        },
                    ],
                },
            },
            jupyterLab: {
                jupyter_notebook: {
                    name: "Jupyter Notebook",
                    units: [
                        {
                            name: "jupyter_notebook",
                            type: "subworkflow",
                        },
                    ],
                },
            },
            nwchem: {
                total_energy: {
                    name: "Total Energy",
                    units: [
                        {
                            name: "total_energy",
                            type: "subworkflow",
                        },
                    ],
                },
            },
            python: {
                python_script: {
                    name: "Python Script",
                    units: [
                        {
                            name: "python_script",
                            type: "subworkflow",
                        },
                    ],
                },
            },
            "python/ml": {
                classification_workflow: {
                    config: {
                        attributes: {
                            isUsingDataset: true,
                        },
                    },
                    name: "Python ML Train Classification",
                    units: [
                        {
                            name: "train_head",
                            type: "subworkflow",
                        },
                        {
                            name: "classification_tail",
                            type: "subworkflow",
                        },
                    ],
                },
                clustering_workflow: {
                    config: {
                        attributes: {
                            isUsingDataset: true,
                        },
                    },
                    name: "Python ML Train Clustering",
                    units: [
                        {
                            name: "train_head",
                            type: "subworkflow",
                        },
                        {
                            name: "classification_tail",
                            type: "subworkflow",
                        },
                    ],
                },
                regression_workflow: {
                    config: {
                        attributes: {
                            isUsingDataset: true,
                        },
                    },
                    name: "Python ML Train Regression",
                    units: [
                        {
                            name: "train_head",
                            type: "subworkflow",
                        },
                        {
                            name: "regression_tail",
                            type: "subworkflow",
                        },
                    ],
                },
            },
            shell: {
                batch_espresso_pwscf: {
                    name: "Shell Batch Job (Espresso PWSCF)",
                    units: [
                        {
                            name: "batch_espresso_pwscf",
                            type: "subworkflow",
                        },
                    ],
                },
                hello_world: {
                    name: "Shell Script",
                    units: [
                        {
                            name: "hello_world",
                            type: "subworkflow",
                        },
                    ],
                },
            },
            vasp: {
                band_gap: {
                    name: "Band Gap",
                    units: [
                        {
                            name: "band_gap",
                            type: "subworkflow",
                        },
                    ],
                },
                band_structure: {
                    name: "Band Structure",
                    units: [
                        {
                            name: "band_structure",
                            type: "subworkflow",
                        },
                    ],
                },
                band_structure_dos: {
                    name: "Band Structure + Density of States",
                    units: [
                        {
                            name: "band_structure_dos",
                            type: "subworkflow",
                        },
                    ],
                },
                dos: {
                    name: "Density of States",
                    units: [
                        {
                            name: "dos",
                            type: "subworkflow",
                        },
                    ],
                },
                fixed_cell_relaxation: {
                    name: "Fixed-cell Relaxation",
                    units: [
                        {
                            name: "fixed_cell_relaxation",
                            type: "subworkflow",
                        },
                    ],
                },
                kpoint_convergence: {
                    name: "K-point Convergence",
                    units: [
                        {
                            name: "kpoint_convergence",
                            type: "subworkflow",
                        },
                    ],
                },
                neb: {
                    name: "Nudged Elastic Band (NEB)",
                    units: [
                        {
                            name: "initial_final_total_energies",
                            type: "subworkflow",
                        },
                        {
                            name: "prepare_images",
                            type: "subworkflow",
                        },
                        {
                            name: "neb_subworkflow",
                            type: "subworkflow",
                        },
                    ],
                },
                recalculate_bands: {
                    name: "Recalculate Bands",
                    units: [
                        {
                            name: "recalculate_bands",
                            type: "subworkflow",
                        },
                    ],
                },
                surface_energy: {
                    name: "Surface Energy",
                    units: [
                        {
                            name: "surface_energy",
                            type: "subworkflow",
                        },
                    ],
                },
                total_energy: {
                    name: "Total Energy",
                    units: [
                        {
                            name: "total_energy",
                            type: "subworkflow",
                        },
                    ],
                },
                variable_cell_relaxation: {
                    name: "Variable-cell Relaxation",
                    units: [
                        {
                            name: "variable_cell_relaxation",
                            type: "subworkflow",
                        },
                    ],
                },
                zero_point_energy: {
                    name: "Zero Point Energy",
                    units: [
                        {
                            name: "zero_point_energy",
                            type: "subworkflow",
                        },
                    ],
                },
            },
        },
    },
};
