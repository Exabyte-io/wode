export class PlanewaveCutoffsContextProvider extends ContextProvider {
    constructor(config: any);
    get uiSchema(): {
        wavefunction: {};
        density: {};
    };
    get defaultData(): {
        wavefunction: any;
        density: any;
    };
    get _cutoffConfigPerApplication(): any;
    get defaultECUTWFC(): any;
    get defaultECUTRHO(): any;
    get jsonSchema(): {
        $schema: string;
        title: string;
        description: string;
        type: string;
        properties: {
            wavefunction: {
                type: string;
                default: any;
            };
            density: {
                type: string;
                default: any;
            };
        };
    };
}
import { ContextProvider } from "@mat3ra/ade";
