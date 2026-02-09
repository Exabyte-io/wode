export class UnitConfigBuilder {
    static usePredefinedIds: boolean;
    static generateFlowChartId(...args: any[]): any;
    static _stringArrayToNamedObject(array: any): any;
    constructor({ name, type, flowchartId }: {
        name: any;
        type: any;
        flowchartId: any;
    });
    type: any;
    _name: any;
    _head: boolean;
    _results: any[];
    _monitors: any[];
    _preProcessors: any[];
    _postProcessors: any[];
    _flowchartId: any;
    name(str: any): this;
    head(bool: any): this;
    flowchartId(flowchartId: any): this;
    addPreProcessors(preProcessorNames: any): this;
    addPostProcessors(postProcessorNames: any): this;
    addResults(resultNames: any): this;
    addMonitors(monitorNames: any): this;
    build(): {
        type: any;
        name: any;
        head: boolean;
        results: any[];
        monitors: any[];
        flowchartId: any;
        preProcessors: any[];
        postProcessors: any[];
    };
}
