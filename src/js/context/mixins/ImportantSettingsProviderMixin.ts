import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { deepClone } from "@mat3ra/code/dist/js/utils/clone";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";

export type ImportantSettingsProvider = {
    important: object;
    setImportant(key: string, value: unknown): void;
    isImportantEdited: boolean | undefined;
};

export type ImportantSettingsProviderInMemoryEntityConstructor =
    Constructor<ImportantSettingsProvider>;

export function importantSettingsProviderMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & ImportantSettingsProvider {
    // @ts-expect-error
    const properties: InMemoryEntity & AbstractBase & ImportantSettingsProvider = {
        get important() {
            return deepClone(this._json.important || {});
        },

        setImportant(key: string, value: unknown) {
            this.setProp("important", { [key]: value });
        },

        get isImportantEdited() {
            return this.prop<boolean>("important.isEdited");
        },

        set isImportantEdited(bool) {
            this.setProp("important", Object.assign(this.important, { isEdited: bool }));
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
