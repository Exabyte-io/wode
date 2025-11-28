export class NonCollinearMagnetizationContextProvider extends JSONSchemaFormDataProvider {
    constructor(config: any);
    isStartingMagnetization: boolean;
    isConstrainedMagnetization: boolean;
    isExistingChargeDensity: boolean;
    isArbitrarySpinDirection: boolean;
    isFixedMagnetization: boolean;
    constrainedMagnetization: {};
    get uniqueElementsWithLabels(): any[];
    get defaultData(): {
        isExistingChargeDensity: boolean;
        isStartingMagnetization: boolean;
        isConstrainedMagnetization: boolean;
        isArbitrarySpinAngle: boolean;
        isFixedMagnetization: boolean;
        lforcet: boolean;
        spinAngles: {
            index: number;
            atomicSpecies: any;
            angle1: number;
            angle2: number;
        }[];
        startingMagnetization: {
            index: number;
            atomicSpecies: any;
            value: number;
        }[];
        constrainedMagnetization: {
            lambda: number;
            constrainType: string;
        };
        fixedMagnetization: {
            x: number;
            y: number;
            z: number;
        };
    };
    get uiSchemaStyled(): {
        isExistingChargeDensity: {};
        lforcet: {
            "ui:readonly": boolean;
            "ui:widget": string;
            "ui:options": {
                inline: boolean;
            };
        };
        isArbitrarySpinDirection: {};
        spinAngles: {
            items: {
                atomicSpecies: {
                    "ui:readonly": boolean;
                };
                angle1: {};
                angle2: {};
            };
            "ui:readonly": boolean;
            "ui:options": {
                addable: boolean;
                orderable: boolean;
                removable: boolean;
            };
        };
        isStartingMagnetization: {};
        startingMagnetization: {
            items: {
                atomicSpecies: {
                    "ui:readonly": boolean;
                };
                value: {
                    "ui:classNames": string;
                };
            };
            "ui:readonly": boolean;
            "ui:options": {
                addable: boolean;
                orderable: boolean;
                removable: boolean;
            };
        };
        isConstrainedMagnetization: {};
        constrainedMagnetization: {
            constrainType: {};
            lambda: {};
            "ui:readonly": boolean;
        };
        isFixedMagnetization: {
            "ui:readonly": boolean;
        };
        fixedMagnetization: {
            x: {};
            y: {};
            z: {};
            "ui:readonly": boolean;
        };
    };
    get jsonSchema(): {
        $schema: string;
        title: string;
        description: string;
        type: string;
        properties: {
            isStartingMagnetization: {
                type: string;
                title: string;
                default: boolean;
            };
            startingMagnetization: {
                type: string;
                minItems: number;
                maxItems: number;
                items: {
                    type: string;
                    properties: {
                        atomicSpecies: {
                            type: string;
                            title: string;
                        };
                        value: {
                            type: string;
                            title: string;
                            default: number;
                            minimum: number;
                            maximum: number;
                        };
                    };
                };
            };
            isExistingChargeDensity: {
                type: string;
                title: string;
                default: boolean;
            };
            lforcet: {
                title: string;
                type: string;
                oneOf: {
                    const: boolean;
                    title: string;
                }[];
            };
            isArbitrarySpinDirection: {
                type: string;
                title: string;
                default: boolean;
            };
            spinAngles: {
                type: string;
                minItems: number;
                maxItems: number;
                items: {
                    type: string;
                    properties: {
                        atomicSpecies: {
                            type: string;
                            title: string;
                        };
                        angle1: {
                            type: string;
                            title: string;
                            default: number;
                        };
                        angle2: {
                            type: string;
                            title: string;
                            default: number;
                        };
                    };
                };
            };
            isConstrainedMagnetization: {
                type: string;
                title: string;
                default: boolean;
            };
            constrainedMagnetization: {
                type: string;
                properties: {
                    constrainType: {
                        type: string;
                        title: string;
                        enum: string[];
                        default: string;
                    };
                    lambda: {
                        type: string;
                        title: string;
                        default: number;
                    };
                };
            };
            isFixedMagnetization: {
                type: string;
                title: string;
                default: boolean;
            };
            fixedMagnetization: {
                type: string;
                properties: {
                    x: {
                        type: string;
                        title: string;
                        default: number;
                    };
                    y: {
                        type: string;
                        title: string;
                        default: number;
                    };
                    z: {
                        type: string;
                        title: string;
                        default: number;
                    };
                };
            };
        };
    };
}
import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
