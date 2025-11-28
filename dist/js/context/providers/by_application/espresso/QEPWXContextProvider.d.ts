export default class QEPWXContextProvider extends ExecutableContextProvider {
    static atomSymbols(material: any): any;
    static uniqueElementsWithLabels(material: any): any[];
    /** Returns the input text block for atomic positions WITH constraints.
     */
    static atomicPositionsWithConstraints(material: any): any;
    /** Returns the input text block for atomic positions
     *  Note: does NOT include constraints
     */
    static atomicPositions(material: any): any;
    static NAT(material: any): any;
    static NTYP(material: any): any;
    static NTYP_WITH_LABELS(material: any): number;
    static CELL_PARAMETERS(material: any): any;
    static symbolToAtomicSpecie(symbol: any, pseudo: any): string;
    static elementAndPseudoToAtomicSpecieWithLabels(symbol: any, pseudo: any, label?: string): string;
    _material: undefined;
    _materials: any[];
    buildQEPWXContext(material: any): {
        IBRAV: number;
        RESTART_MODE: string;
        ATOMIC_SPECIES: any;
        ATOMIC_SPECIES_WITH_LABELS: string;
        NAT: any;
        NTYP: any;
        NTYP_WITH_LABELS: number;
        ATOMIC_POSITIONS: any;
        ATOMIC_POSITIONS_WITHOUT_CONSTRAINTS: any;
        CELL_PARAMETERS: any;
    };
    getDataPerMaterial(): {
        perMaterial?: undefined;
    } | {
        perMaterial: any;
    };
    getData(): {
        perMaterial?: undefined;
        IBRAV: number;
        RESTART_MODE: string;
        ATOMIC_SPECIES: any;
        ATOMIC_SPECIES_WITH_LABELS: string;
        NAT: any;
        NTYP: any;
        NTYP_WITH_LABELS: number;
        ATOMIC_POSITIONS: any;
        ATOMIC_POSITIONS_WITHOUT_CONSTRAINTS: any;
        CELL_PARAMETERS: any;
    } | {
        perMaterial: any;
        IBRAV: number;
        RESTART_MODE: string;
        ATOMIC_SPECIES: any;
        ATOMIC_SPECIES_WITH_LABELS: string;
        NAT: any;
        NTYP: any;
        NTYP_WITH_LABELS: number;
        ATOMIC_POSITIONS: any;
        ATOMIC_POSITIONS_WITHOUT_CONSTRAINTS: any;
        CELL_PARAMETERS: any;
    };
    get RESTART_MODE(): "restart" | "from_scratch";
    getPseudoBySymbol(symbol: any): any;
    /** Builds ATOMIC SPECIES block of pw.x input in the format
     *  X   Mass_X   PseudoPot_X
     *  where X            is the atom label
     *        Mass_X       is the mass of element X [amu]
     *        PseudoPot_X  is the pseudopotential filename associated with element X
     *
     *  Note: assumes this.methodData is defined
     */
    ATOMIC_SPECIES(material: any): any;
    ATOMIC_SPECIES_WITH_LABELS(material: any): string;
}
import ExecutableContextProvider from "../ExecutableContextProvider";
