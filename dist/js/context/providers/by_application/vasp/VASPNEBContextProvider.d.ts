export default class VASPNEBContextProvider extends ExecutableContextProvider {
    _materials: any[];
    getData(): {
        FIRST_IMAGE: any;
        LAST_IMAGE: any;
        INTERMEDIATE_IMAGES: any;
    };
}
import ExecutableContextProvider from "../ExecutableContextProvider";
