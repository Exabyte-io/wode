export default class ExecutableContextProvider extends ContextProvider {
    constructor(config: any);
    jsonSchemaId: string;
    get jsonSchema(): import("json-schema").JSONSchema7 | undefined;
}
import { ContextProvider } from "@mat3ra/ade";
