export class PlanewaveCutoffsContextProvider extends ContextProvider {
    constructor(config: any);
    jsonSchemaId: string;
    get uiSchema(): {
        wavefunction: {};
        density: {};
    };
    get defaultData(): {
        wavefunction: any;
        density: any;
    };
    get jsonSchemaPatchConfig(): {
        wavefunction: {
            default: any;
        };
        density: {
            default: any;
        };
    };
    get _cutoffConfigPerApplication(): any;
    get defaultECUTWFC(): any;
    get defaultECUTRHO(): any;
    get jsonSchema(): import("json-schema").JSONSchema7 | undefined;
}
import { ContextProvider } from "@mat3ra/ade";
