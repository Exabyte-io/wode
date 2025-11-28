export class PointsGridFormDataProvider extends JSONSchemaFormDataProvider {
    static _canTransform(data: any): any;
    constructor(config: any);
    jsonSchemaId: string;
    _divisor: any;
    reciprocalLattice: import("@mat3ra/made").ReciprocalLattice;
    dimensions: number[];
    shifts: any[];
    gridMetricType: string;
    gridMetricValue: number;
    preferGridMetric: boolean;
    _metricDescription: {
        KPPRA: string;
        spacing: string;
    };
    defaultClassNames: string;
    getDefaultShift(): number;
    get _defaultDimensions(): number[];
    get _defaultShifts(): any[];
    _getDefaultGridMetricValue(metric: any): number;
    get _defaultData(): {
        dimensions: number[];
        shifts: any[];
        gridMetricType: string;
        gridMetricValue: number;
        preferGridMetric: boolean;
        reciprocalVectorRatios: number[];
    };
    get _defaultDataWithMaterial(): object;
    get reciprocalVectorRatios(): number[];
    get jsonSchemaPatchConfig(): {
        dimensions: {
            default?: any[] | undefined;
            type: string;
            items: {
                default?: any;
                type: string;
            };
            minItems: number;
            maxItems: number;
        };
        shifts: {
            default?: any[] | undefined;
            type: string;
            items: {
                default?: any;
                type: string;
            };
            minItems: number;
            maxItems: number;
        };
        reciprocalVectorRatios: {
            default?: any[] | undefined;
            type: string;
            items: {
                default?: any;
                type: string;
            };
            minItems: number;
            maxItems: number;
        };
        gridMetricType: {
            default: string;
        };
        description: string;
        required: string[];
        dependencies: {
            gridMetricType: {
                oneOf: {
                    properties: {
                        gridMetricType: {
                            enum: string[];
                        };
                        gridMetricValue: {
                            type: string;
                            minimum: number;
                            title: string;
                            default: number;
                        };
                        preferGridMetric: {
                            type: string;
                            title: string;
                            default: boolean;
                        };
                    };
                }[];
            };
        };
    };
    get jsonSchema(): import("json-schema").JSONSchema7 | undefined;
    get uiSchema(): {
        dimensions: {
            "ui:options": {
                addable: boolean;
                orderable: boolean;
                removable: boolean;
            };
            items: {
                "ui:disabled": boolean;
                "ui:placeholder": string;
                "ui:emptyValue": number;
                "ui:label": boolean;
            };
        };
        shifts: {
            "ui:options": {
                addable: boolean;
                orderable: boolean;
                removable: boolean;
            };
            items: {
                "ui:disabled": boolean;
                "ui:placeholder": string;
                "ui:emptyValue": number;
                "ui:label": boolean;
            };
        };
        gridMetricType: {
            "ui:title": string;
        };
        gridMetricValue: {
            "ui:disabled": boolean;
            "ui:emptyValue": number;
            "ui:placeholder": string;
        };
        preferGridMetric: {
            "ui:emptyValue": boolean;
            "ui:disabled": boolean;
        };
        reciprocalVectorRatios: {
            "ui:title": string;
            "ui:orderable": boolean;
            "ui:removable": boolean;
            "ui:readonly": boolean;
            items: {
                "ui:label": boolean;
            };
        };
    };
    _getDimensionsFromKPPRA(KPPRA: any): number[];
    _getKPPRAFromDimensions(dimensions: any): number;
    calculateDimensions({ gridMetricType, gridMetricValue, units }: {
        gridMetricType: any;
        gridMetricValue: any;
        units?: string | undefined;
    }): number[];
    calculateGridMetric({ gridMetricType, dimensions, units }: {
        gridMetricType: any;
        dimensions: any;
        units?: string | undefined;
    }): number;
    transformData(data: any): any;
}
import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
