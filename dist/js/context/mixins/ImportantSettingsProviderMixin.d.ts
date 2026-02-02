import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
export type ImportantSettingsProvider = {
    important: object;
    setImportant(key: string, value: unknown): void;
    isImportantEdited: boolean | undefined;
};
export type ImportantSettingsProviderInMemoryEntityConstructor = Constructor<ImportantSettingsProvider>;
export declare function importantSettingsProviderMixin<T extends InMemoryEntity & AbstractBase>(item: T): asserts item is T & ImportantSettingsProvider;
