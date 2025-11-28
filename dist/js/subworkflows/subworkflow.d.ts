export class Subworkflow extends BaseSubworkflow {
    static usePredefinedIds: boolean;
    static generateSubworkflowId(name: any, application?: null, model?: null, method?: null): any;
    static get defaultConfig(): {
        _id: any;
        name: string;
        application: import("node_modules/@mat3ra/ade/dist/js/applicationMixin").DefaultApplicationConfig;
        model: import("@mat3ra/mode/dist/js/types").ModelConfig;
        properties: never[];
        units: never[];
    };
    static fromArguments(application: any, model: any, method: any, name: any, units?: any[], config?: {}, Cls?: typeof Subworkflow): Subworkflow;
    constructor(config: any, _Application?: typeof Application, _ModelFactory?: typeof ModelFactory, _UnitFactory?: typeof UnitFactory);
    _Application: typeof Application;
    _ModelFactory: typeof ModelFactory;
    _UnitFactory: typeof UnitFactory;
    initialize(): void;
    _application: any;
    _model: any;
    _units: any;
    getAsUnit(): any;
    get application(): any;
    setApplication(application: any): void;
    get model(): any;
    setModel(model: any): void;
    get units(): any;
    setUnits(units: any): void;
    toJSON(exclude?: any[]): any;
    get contextProviders(): any[];
    /**
     * Extracts a reduced version of the entity config to be stored inside redux state.
     * This is used to track changes to context, monitors, properties, etc. when multiple materials are in state.
     */
    extractReducedExternalDependentConfig(): {
        id: any;
        context: any;
        units: any;
    };
    /**
     * Applies the reduced config obtained from extractReducedExternalDependentConfig on the entity.
     */
    applyReducedExternalDependentConfig(config: any): void;
    context: any;
    get contextFromAssignmentUnits(): {};
    render(context?: {}): void;
    /**
     * TODO: reuse workflow function instead
     * @param unit {Unit}
     * @param head {Boolean}
     * @param index {Number}
     */
    addUnit(unit: Unit, index?: number): void;
    removeUnit(flowchartId: any): void;
    get properties(): any[];
    getUnit(flowchartId: any): any;
    unitIndex(flowchartId: any): number;
    replaceUnit(index: any, unit: any): void;
    get scopeVariables(): string[];
    get scalarResults(): string[];
    get isMultiMaterial(): any;
    get isDraft(): any;
    setIsDraft(bool: any): any;
    get methodData(): any;
    /**
     * @summary Calculates hash of the subworkflow. Meaningful fields are units, app and model.
     * units must be sorted topologically before hashing (already sorted).
     */
    calculateHash(): string;
    _calculateModelHash(): string;
    findUnitById(id: any): any;
    findUnitKeyById(id: any): string;
    findUnitWithTag(tag: any): any;
    get hasConvergence(): boolean;
}
declare class BaseSubworkflow {
}
import { Application } from "@mat3ra/ade";
import { ModelFactory } from "@mat3ra/mode";
import { UnitFactory } from "../units";
export {};
