"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.IOUnitConfigBuilder = void 0;
var _enums = require("../../enums");
var _UnitConfigBuilder = require("./UnitConfigBuilder");
class IOUnitConfigBuilder extends _UnitConfigBuilder.UnitConfigBuilder {
    constructor(name, endpointName, endpointOptions) {
        super({
            name,
            type: _enums.UNIT_TYPES.io,
        });
        this._endpointName = endpointName;
        this._endpointOptions = endpointOptions;
        this._variableName = "DATA";
        this._subtype = "input";
        this._source = "api";
    }
    endpointName(str) {
        this._endpointName = str;
        return this;
    }
    endpointOptions(options) {
        this._endpointOptions = options;
        return this;
    }
    variableName(str) {
        this._variableName = str;
        return this;
    }
    subtype(str) {
        this._subtype = str;
        return this;
    }
    source(str) {
        this._source = str;
        return this;
    }
    build() {
        return {
            ...super.build(),
            subtype: this._subtype,
            source: this._source,
            input: [
                {
                    endpoint: this._endpointName,
                    endpoint_options: this._endpointOptions,
                    name: this._variableName,
                },
            ],
        };
    }
}
exports.IOUnitConfigBuilder = IOUnitConfigBuilder;
