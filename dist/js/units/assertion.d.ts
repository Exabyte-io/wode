export class AssertionUnit extends BaseUnit {
    static getAssertionConfig(): {
        name: string;
        type: string;
        statement: string;
        errorMessage: string;
    };
    get statement(): undefined;
    get errorMessage(): undefined;
    getHashObject(): {
        statement: undefined;
        errorMessage: undefined;
    };
}
import { BaseUnit } from "./base";
