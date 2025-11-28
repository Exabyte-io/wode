export class ConditionUnit extends BaseUnit {
    static getConditionConfig(): {
        name: string;
        type: string;
        input: never[];
        results: never[];
        preProcessors: never[];
        postProcessors: never[];
        then: undefined;
        else: undefined;
        statement: string;
        maxOccurrences: number;
    };
    get input(): undefined;
    get then(): undefined;
    get else(): undefined;
    get statement(): undefined;
    get maxOccurrences(): undefined;
    getHashObject(): {
        statement: undefined;
        maxOccurrences: undefined;
    };
}
import { BaseUnit } from "./base";
