export default class QENEBContextProvider extends ExecutableContextProvider {
    _material: undefined;
    _materials: any[];
    _materialsSet: undefined;
    getData(): {
        FIRST_IMAGE: any;
        LAST_IMAGE: any;
        INTERMEDIATE_IMAGES: any;
    };
}
import ExecutableContextProvider from "../ExecutableContextProvider";
