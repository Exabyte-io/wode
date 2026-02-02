import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { CollinearMagnetizationContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import type { JSONSchema7 } from "json-schema";
import { type MaterialContextMixin, type MaterialExternalContext } from "../mixins/MaterialContextMixin";
import type { ContextItem } from "./base/ContextProvider";
import JSONSchemaDataProvider, { type JinjaExternalContext } from "./base/JSONSchemaDataProvider";
type Name = "collinearMagnetization";
type Data = CollinearMagnetizationContextProviderSchema;
export type CollinearMagnetizationDataManagerContextItem = ContextItem<Data>;
export type CollinearMagnetizationDataManagerExternalContext = JinjaExternalContext & MaterialExternalContext;
type ExternalContext = CollinearMagnetizationDataManagerExternalContext;
type Base = typeof JSONSchemaDataProvider<Name, Data, object, ExternalContext> & Constructor<MaterialContextMixin>;
declare const CollinearMagnetizationDataManager_base: Base;
export default class CollinearMagnetizationDataManager extends CollinearMagnetizationDataManager_base {
    readonly name: "collinearMagnetization";
    readonly domain: "important";
    readonly jsonSchema: JSONSchema7 | undefined;
    private readonly isTotalMagnetization;
    private readonly firstElement;
    private readonly uniqueElementsWithLabels;
    constructor(contextItem: ContextItem<Data>, externalContext: ExternalContext);
    getDefaultData(): Data;
    setData(data: Data): void;
    get uiSchemaStyled(): {
        startingMagnetization: {
            items: {
                atomicSpecies: {
                    "ui:classNames": string;
                };
                value: {
                    "ui:classNames": string;
                };
            };
            "ui:readonly": boolean;
        };
        isTotalMagnetization: {};
        totalMagnetization: {
            "ui:classNames": string;
            "ui:readonly": boolean;
        };
    };
}
export {};
