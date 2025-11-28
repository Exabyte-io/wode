export class AssignmentUnit extends BaseUnit {
    static getAssignmentConfig(): {
        name: string;
        type: string;
        operand: string;
        value: string;
        input: never[];
    };
    get operand(): undefined;
    get value(): undefined;
    get input(): undefined;
    getHashObject(): {
        input: undefined;
        operand: undefined;
        value: undefined;
    };
}
import { BaseUnit } from "./base";
