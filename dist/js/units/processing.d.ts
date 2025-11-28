export class ProcessingUnit extends BaseUnit {
    static getProcessingConfig(): {
        name: string;
        type: string;
    };
    setOperation(op: any): void;
    setOperationType(type: any): void;
    setInput(input: any): void;
    get operation(): undefined;
    get operationType(): undefined;
    get input(): undefined;
}
import { BaseUnit } from "./base";
