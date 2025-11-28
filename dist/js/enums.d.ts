/**
 * THIS ENUMS ARE SHARED WITH TESTS.
 * DO NOT IMPORT ANYTHINGS IN THIS MODULE.
 */
export const IO_ID_COLUMN: "exabyteId";
export namespace UNIT_TYPES {
    let convergence: string;
    let exit: string;
    let execution: string;
    let map: string;
    let reduce: string;
    let assignment: string;
    let condition: string;
    let subworkflow: string;
    let processing: string;
    let io: string;
    let assertion: string;
}
export namespace UNIT_STATUSES {
    let idle: string;
    let active: string;
    let finished: string;
    let error: string;
    let warning: string;
}
export namespace UNIT_TAGS {
    let hasConvergenceParam: string;
    let hasConvergenceResult: string;
}
export const WORKFLOW_STATUSES: {
    "up-to-date": string;
    outdated: string;
};
export namespace TAB_NAVIGATION_CONFIG {
    namespace overview {
        let itemName: string;
        let className: string;
        let href: string;
    }
    namespace importantSettings {
        let itemName_1: string;
        export { itemName_1 as itemName };
        let className_1: string;
        export { className_1 as className };
        let href_1: string;
        export { href_1 as href };
    }
    namespace detailedView {
        let itemName_2: string;
        export { itemName_2 as itemName };
        let className_2: string;
        export { className_2 as className };
        let href_2: string;
        export { href_2 as href };
    }
    namespace compute {
        let itemName_3: string;
        export { itemName_3 as itemName };
        let className_3: string;
        export { className_3 as className };
        let href_3: string;
        export { href_3 as href };
    }
}
export const UNIT_NAME_INVALID_CHARS: "/";
