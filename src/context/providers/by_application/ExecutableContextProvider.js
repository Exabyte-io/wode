import ContextProvider from "@mat3ra/ade/dist/js/context/ContextProvider";

export default class ExecutableContextProvider extends ContextProvider {
    constructor(config) {
        super({
            ...config,
            domain: "executable",
        });
    }
}
