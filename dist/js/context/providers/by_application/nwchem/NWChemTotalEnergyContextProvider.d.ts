export default class NWChemTotalEnergyContextProvider extends ExecutableContextProvider {
    static symbolToAtomicSpecies(symbol: any, pseudo: any): string | undefined;
    _material: undefined;
    get atomicPositionsWithoutConstraints(): any;
    get atomicPositions(): any;
    get atomSymbols(): any;
    get cartesianAtomicPositions(): boolean;
    get ATOMIC_SPECIES(): string;
    getData(): {
        CHARGE: number;
        MULT: number;
        BASIS: string;
        NAT: any;
        NTYP: any;
        ATOMIC_POSITIONS: any;
        ATOMIC_POSITIONS_WITHOUT_CONSTRAINTS: any;
        ATOMIC_SPECIES: string;
        FUNCTIONAL: string;
        CARTESIAN: boolean;
    };
}
import ExecutableContextProvider from "../ExecutableContextProvider";
