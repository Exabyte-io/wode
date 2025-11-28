import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { RuntimeItemsNameObject } from "@mat3ra/code/dist/js/entity/mixins/RuntimeItemsNameObjectMixin";
import type { NameResultSchema } from "@mat3ra/code/dist/js/utils/object";
type ItemKey = "results" | "monitors" | "preProcessors" | "postProcessors";
export type RuntimeItemsUILogic = {
    setRuntimeItemsToDefaultValues(): void;
    _initRuntimeItems(): void;
    toggleRuntimeItem(key: ItemKey, data: NameResultSchema, isAdding: boolean): void;
    toggleResult(data: NameResultSchema, isAdding: boolean): void;
    toggleMonitor(data: NameResultSchema, isAdding: boolean): void;
    togglePreProcessor(data: NameResultSchema, isAdding: boolean): void;
    togglePostProcessor(data: NameResultSchema, isAdding: boolean): void;
    getResultByName(name: string): NameResultSchema | undefined;
    get resultNames(): string[];
    get monitorNames(): string[];
    get postProcessorNames(): string[];
    get preProcessorNames(): string[];
};
type Base = InMemoryEntity & RuntimeItemsNameObject & {
    defaultResults: NameResultSchema[];
    defaultMonitors: NameResultSchema[];
    defaultPreProcessors: NameResultSchema[];
    defaultPostProcessors: NameResultSchema[];
};
export declare function runtimeItemsUILogicMixin<T extends Base>(item: T): void;
export {};
