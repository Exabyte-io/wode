export class SubworkflowUnit extends BaseUnit {
    static getSubworkflowConfig(): {
        name: string;
        type: string;
    };
}
import { BaseUnit } from "./base";
