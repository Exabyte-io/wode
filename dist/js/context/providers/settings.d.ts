export const globalSettings: GlobalSettings;
declare class GlobalSettings {
    "PointsGridFormDataProvider.defaultKPPRA": number;
    Material: typeof import("@mat3ra/made").Material;
    Application: typeof Application;
    get defaultKPPRA(): number;
    setApplication(application: any): void;
    setMaterial(material: any): void;
    setDefaultKPPRA(kppra: any): void;
    resetDefaults(): void;
}
import { Application } from "@mat3ra/ade";
export {};
