import { ContextProvider } from "@mat3ra/ade";

export default class ExecutableContextProvider extends ContextProvider {
    constructor(config) {
        super({
            ...config,
            domain: "executable",
        });
    }
}
