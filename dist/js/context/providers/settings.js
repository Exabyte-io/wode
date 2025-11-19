"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalSettings = void 0;
var _ade = require("@mat3ra/ade");
var _made = require("@mat3ra/made");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class GlobalSettings {
  constructor() {
    _defineProperty(this, "PointsGridFormDataProvider.defaultKPPRA", 5);
    _defineProperty(this, "Material", _made.Made.Material);
    _defineProperty(this, "Application", _ade.Application);
    this.resetDefaults();
  }
  get defaultKPPRA() {
    return this["PointsGridFormDataProvider.defaultKPPRA"];
  }
  setApplication(application) {
    this.Application = application;
  }
  setMaterial(material) {
    this.Material = material;
  }
  setDefaultKPPRA(kppra) {
    this["PointsGridFormDataProvider.defaultKPPRA"] = kppra;
  }
  resetDefaults() {
    this.Material = _made.Made.Material;
    this.Application = _ade.Application;
    this["PointsGridFormDataProvider.defaultKPPRA"] = 5;
  }
}
const globalSettings = exports.globalSettings = new GlobalSettings();