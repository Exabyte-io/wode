"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.createSubworkflow = createSubworkflow;
exports.createSubworkflowByName = createSubworkflowByName;
exports.createUnit = createUnit;
var _ApplicationRegistry = _interopRequireDefault(
    require("@exabyte-io/ade.js/dist/js/ApplicationRegistry"),
);
var _mode = require("@exabyte-io/mode.js");
var _standata = require("@mat3ra/standata");
var _lodash = _interopRequireDefault(require("lodash"));
var _units = require("../units");
var _builders = require("../units/builders");
var _utils = require("../utils");
var _dynamic = require("./dynamic");
var _subworkflow = require("./subworkflow");
function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
}
// NOTE: DFTModel => DFTModelConfig, configs should have the same name as the model/method class + "Config" at the end
function _getConfigFromModelOrMethodName(name, kind) {
    const configs = kind === "Model" ? _mode.default_models : _mode.default_methods;
    if (!configs[`${name}Config`]) {
        // eslint-disable-next-line no-param-reassign
        name = `Unknown${kind}`;
    }
    return configs[`${name}Config`];
}

/**
 * @summary Create model from subworkflow data
 * @param config {Object} model config
 * @param modelFactoryCls {any} model factory to use
 * @returns {DFTModel|Model}
 */
function createModel({ config, modelFactoryCls }) {
    const { name, config: modelConfig = {} } = config;
    const defaultConfig = _getConfigFromModelOrMethodName(name, "Model");
    return modelFactoryCls.create({
        ...defaultConfig,
        ...modelConfig,
    });
}

/**
 * @summary Create method from subworkflow data
 * @param config {Object} method configuration
 * @param methodFactoryCls {any}
 * @returns {{method, setSearchText}}
 */
function createMethod({ config, methodFactoryCls }) {
    const { name, setSearchText = null, config: methodConfig = {} } = config;
    const defaultConfig = _getConfigFromModelOrMethodName(name, "Method");
    const method = methodFactoryCls.create({
        ...defaultConfig,
        ...methodConfig,
    });
    return {
        method,
        setSearchText,
    };
}

/**
 * @summary Create top-level objects used in subworkflow initialization
 * @param subworkflowData {Object} subworkflow data
 * @param AppRegistry
 * @param modelFactoryCls {any} model factory class
 * @param methodFactoryCls {any} method factory class
 * @returns {{application: *, method: *, model: (DFTModel|Model), setSearchText: String|null}}
 */
function createTopLevel({ subworkflowData, modelFactoryCls, methodFactoryCls, AppRegistry }) {
    const { application: appConfig, model: modelConfig, method: methodConfig } = subworkflowData;
    const application = AppRegistry.createApplication(appConfig);
    const model = createModel({
        config: modelConfig,
        modelFactoryCls,
    });
    const { method, setSearchText } = createMethod({
        config: methodConfig,
        methodFactoryCls,
    });
    return {
        application,
        model,
        method,
        setSearchText,
    };
}

/**
 * @summary Create workflow unit from JSON configuration
 *      Supports applying functions to the builder prior to building via "functions"
 *      Supports applying attributes to the builder after building via "attributes"
 * @param config {Object} unit config
 * @param application {*} application
 * @param unitBuilders {Object} workflow unit builders
 * @param unitFactoryCls {*} workflow unit class factory
 * @returns {*|{head: boolean, preProcessors: [], postProcessors: [], name: *, flowchartId: *, type: *, results: [], monitors: []}}
 */
function createUnit({ config, application, unitBuilders, unitFactoryCls }) {
    const { type, config: unitConfig } = config;
    if (type === "executionBuilder") {
        const { name, execName, flavorName, flowchartId } = unitConfig;
        const builder = new unitBuilders.ExecutionUnitConfigBuilder(
            name,
            application,
            execName,
            flavorName,
            flowchartId,
        );

        // config should contain "functions" and "attributes"
        const cfg = (0, _utils.applyConfig)({
            obj: builder,
            config,
            callBuild: true,
        });
        return unitFactoryCls.create(cfg);
    }
    return unitFactoryCls.create({
        type,
        ...unitConfig,
    });
}

/**
 * @summary Dynamically create subworkflow units
 * @param dynamicSubworkflow {String} name of unit creation function
 * @param units {Array} configured units to provide to dynamic unit creation
 * @param unitBuilders {Object} unit configuration builders
 * @param unitFactoryCls {*} unit factory class
 * @param application {*} application (optional)
 * @returns {*}
 */
function createDynamicUnits({
    dynamicSubworkflow,
    units,
    unitBuilders,
    unitFactoryCls,
    application = null,
}) {
    const { name, subfolder } = dynamicSubworkflow;
    const func =
        subfolder &&
        _lodash.default.get(_dynamic.dynamicSubworkflowsByApp, `${subfolder}.${name}`, () => {});
    switch (name) {
        case "surfaceEnergy":
            // eslint-disable-next-line no-case-declarations
            const [scfUnit] = units;
            return (0, _dynamic.getSurfaceEnergySubworkflowUnits)({
                scfUnit,
                unitBuilders,
            });
        case "getQpointIrrep":
            return func({
                unitBuilders,
                unitFactoryCls,
                application,
            });
        default:
            throw new Error(`dynamicSubworkflow=${name} not recognized`);
    }
}
function createSubworkflow({
    subworkflowData,
    AppRegistry = _ApplicationRegistry.default,
    modelFactoryCls = _mode.ModelFactory,
    methodFactoryCls = _mode.MethodFactory,
    subworkflowCls = _subworkflow.Subworkflow,
    unitFactoryCls = _units.UnitFactory,
    unitBuilders = _builders.builders,
}) {
    const { application, model, method, setSearchText } = createTopLevel({
        subworkflowData,
        AppRegistry,
        modelFactoryCls,
        methodFactoryCls,
    });
    let units = [];
    const { name, units: unitConfigs, config = {}, dynamicSubworkflow = null } = subworkflowData;
    unitConfigs.forEach((_config) => {
        units.push(
            createUnit({
                config: _config,
                application,
                unitBuilders,
                unitFactoryCls,
            }),
        );
    });
    if (dynamicSubworkflow) {
        units = createDynamicUnits({
            dynamicSubworkflow,
            units,
            unitBuilders,
            unitFactoryCls,
            application,
        });
    }
    const { functions = {}, attributes = {}, ...cfg } = config;
    let subworkflow = subworkflowCls.fromArguments(application, model, method, name, units, cfg);
    subworkflow = (0, _utils.applyConfig)({
        obj: subworkflow,
        config: {
            functions,
            attributes,
        },
    });
    if (setSearchText) subworkflow.model.method.setSearchText(setSearchText);
    return subworkflow;
}

/**
 * @summary Convenience wrapper around createSubworkflow to create by app name and swf name
 * @param appName {String} application name
 * @param swfName {String} subworkflow name (snake_case.yml)
 * @param workflowSubworkflowMapByApplication {Object} object containing all workflow/subworkflow map by application
 * @param swArgs {Object} classes for instantiation
 * @returns {*} subworkflow object
 */
function createSubworkflowByName({
    appName,
    swfName,
    workflowSubworkflowMapByApplication = _standata.workflowSubforkflowMapByApplication,
    ...swArgs
}) {
    const { subworkflows } = workflowSubworkflowMapByApplication;
    const { [appName]: allSubworkflowData } = subworkflows;
    const { [swfName]: subworkflowData } = allSubworkflowData;
    return createSubworkflow({
        subworkflowData,
        ...swArgs,
    });
}
