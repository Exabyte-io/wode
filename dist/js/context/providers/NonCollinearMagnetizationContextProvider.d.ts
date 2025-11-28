export class NonCollinearMagnetizationContextProvider extends JSONSchemaFormDataProvider {
    constructor(config: any);
    jsonSchemaId: string;
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
    get jsonSchemaPatchConfig(): {
        isExistingChargeDensity: {
            default: boolean;
        };
        isStartingMagnetization: {
            default: boolean;
        };
        isArbitrarySpinAngle: {
            default: boolean;
        };
        isConstrainedMagnetization: {
            default: boolean;
        };
        isFixedMagnetization: {
            default: boolean;
        };
        startingMagnetization: {
            minItems: number;
            maxItems: number;
        };
        "startingMagnetization.items.properties.value": {
            default: number;
            minimum: number;
            maximum: number;
        };
        spinAngles: {
            minItems: number;
            maxItems: number;
        };
        "spinAngles.items.properties.angle1": {
            default: number;
        };
        "spinAngles.items.properties.angle2": {
            default: number;
        };
        "constrainedMagnetization.properties.constrainType": {
            default: string;
        };
        "constrainedMagnetization.properties.lambda": {
            default: number;
        };
        "fixedMagnetization.properties.x": {
            default: number;
        };
        "fixedMagnetization.properties.y": {
            default: number;
        };
        "fixedMagnetization.properties.z": {
            default: number;
        };
    };
    get jsonSchema(): import("json-schema").JSONSchema7 | undefined;
}
import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
