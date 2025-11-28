export namespace defaultMapConfig {
    let name: string;
    let type: string;
    let workflowId: string;
    namespace input {
        export let target: string;
        export let scope: string;
        let name_1: string;
        export { name_1 as name };
        export let values: never[];
        export let useValues: boolean;
    }
}
export class MapUnit extends BaseUnit {
    get input(): undefined;
    get workflowId(): undefined;
    setWorkflowId(id: any): void;
}
import { BaseUnit } from "./base";
