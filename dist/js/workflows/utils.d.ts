import type { WorkflowBaseUnitSchema } from "@mat3ra/esse/dist/js/types";
/**
 * @summary set the head of an array of units
 */
export declare function setUnitsHead<T extends WorkflowBaseUnitSchema>(units: T[]): T[];
/**
 * @summary Re-establishes the linked `next => flowchartId` logic in an array of units
 */
export declare function setNextLinks<T extends WorkflowBaseUnitSchema>(units: T[]): T[];
