"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.WORKFLOW_STATUSES =
    exports.UNIT_TYPES =
    exports.UNIT_TAGS =
    exports.UNIT_STATUSES =
    exports.UNIT_NAME_INVALID_CHARS =
    exports.TAB_NAVIGATION_CONFIG =
    exports.IO_ID_COLUMN =
        void 0;
/**
 * THIS ENUMS ARE SHARED WITH TESTS.
 * DO NOT IMPORT ANYTHINGS IN THIS MODULE.
 */

const IO_ID_COLUMN = (exports.IO_ID_COLUMN = "exabyteId");
const UNIT_TYPES = (exports.UNIT_TYPES = {
    // not currently used
    convergence: "convergence",
    exit: "exit",
    // actively used
    execution: "execution",
    map: "map",
    reduce: "reduce",
    assignment: "assignment",
    condition: "condition",
    subworkflow: "subworkflow",
    processing: "processing",
    io: "io",
    assertion: "assertion",
});
const UNIT_STATUSES = (exports.UNIT_STATUSES = {
    idle: "idle",
    active: "active",
    finished: "finished",
    error: "error",
    warning: "warning",
});
const UNIT_TAGS = (exports.UNIT_TAGS = {
    hasConvergenceParam: "hasConvergenceParam",
    hasConvergenceResult: "hasConvergenceResult",
});
const WORKFLOW_STATUSES = (exports.WORKFLOW_STATUSES = {
    "up-to-date": "up-to-date",
    outdated: "outdated",
});
const TAB_NAVIGATION_CONFIG = (exports.TAB_NAVIGATION_CONFIG = {
    overview: {
        itemName: "Overview",
        className: "",
        href: "sw-overview",
    },
    importantSettings: {
        itemName: "Important settings",
        className: "",
        href: "sw-important-settings",
    },
    detailedView: {
        itemName: "Detailed view",
        className: "",
        href: "sw-detailed-view",
    },
    compute: {
        itemName: "Compute",
        className: "",
        href: "sw-compute",
    },
});
const UNIT_NAME_INVALID_CHARS = (exports.UNIT_NAME_INVALID_CHARS = "/");
