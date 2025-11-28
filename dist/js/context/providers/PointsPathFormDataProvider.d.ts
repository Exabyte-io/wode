import { JSONSchemaFormDataProvider } from "@mat3ra/ade";
export declare class PointsPathFormDataProvider extends JSONSchemaFormDataProvider {
    constructor(config: any);
    get isEditedIsSetToFalseOnMaterialUpdate(): unknown;
    get defaultData(): any;
    get symmetryPointsFromMaterial(): any;
    get jsonSchema(): {
        $schema: string;
        title: string;
        description: string;
        type: string;
        items: {
            type: string;
            properties: {
                point: {
                    type: string;
                    default: string;
                    enum: any[];
                };
                steps: {
                    type: string;
                    default: number;
                };
            };
        };
        minItems: number;
    };
    get uiSchema(): {
        items: {};
    };
    get uiSchemaStyled(): {
        items: {
            point: {};
            steps: {};
        };
    };
    get templates(): {};
    getBrillouinZoneImageComponent(title: string): any;
    get useExplicitPath(): boolean;
    yieldDataForRendering(): {
        [x: string]: boolean | object | undefined;
    };
    transformData(path?: never[], useExplicitPath?: boolean): any[];
    get2PIBACoordinates(point: any): any;
    _convertToExplicitPath(path: any): {
        coordinates: any;
        steps: number;
    }[];
}
export declare class ExplicitPointsPathFormDataProvider extends PointsPathFormDataProvider {
    get useExplicitPath(): boolean;
}
export declare class ExplicitPointsPath2PIBAFormDataProvider extends ExplicitPointsPathFormDataProvider {
    get is2PIBA(): boolean;
}
