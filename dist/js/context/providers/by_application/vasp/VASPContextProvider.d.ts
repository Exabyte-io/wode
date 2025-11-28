export default class VASPContextProvider extends ExecutableContextProvider {
    _material: undefined;
    _materials: any[];
    buildVASPContext(material: any): {
        POSCAR: any;
        POSCAR_WITH_CONSTRAINTS: any;
    };
    getDataPerMaterial(): {
        perMaterial?: undefined;
    } | {
        perMaterial: any;
    };
    getData(): {
        perMaterial?: undefined;
        POSCAR: any;
        POSCAR_WITH_CONSTRAINTS: any;
    } | {
        perMaterial: any;
        POSCAR: any;
        POSCAR_WITH_CONSTRAINTS: any;
    };
}
import ExecutableContextProvider from "../ExecutableContextProvider";
