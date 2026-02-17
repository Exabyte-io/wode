import type { Application } from "@mat3ra/ade";

import type ContextProvider from "../providers/base/ContextProvider";

export type ApplicationContextMixin = {
    application: Application;
    initApplicationContextMixin(externalContext: ApplicationExternalContext): void;
};

export type ApplicationExternalContext = { application: Application };

export default function applicationContextMixin(item: ContextProvider) {
    // @ts-expect-error
    const properties: ContextProvider & ApplicationContextMixin = {
        initApplicationContextMixin(externalContext: ApplicationExternalContext) {
            this.application = externalContext.application;
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
