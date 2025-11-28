/* eslint-disable class-methods-use-this */
import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type ContextAndRenderFields,
    contextAndRenderFieldsMixin,
} from "@mat3ra/code/dist/js/entity/mixins/ContextAndRenderFieldsMixin";
import {
    type Defaultable,
    defaultableEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import {
    HashedEntity,
    hashedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/HashedEntityMixin";
import {
    HasRepetition,
    hasRepetitionMixin,
} from "@mat3ra/code/dist/js/entity/mixins/HasRepetitionMixin";
import {
    type ContextProvider,
    ImportantSettingsProvider,
    importantSettingsProviderMixin,
} from "@mat3ra/code/dist/js/entity/mixins/ImportantSettingsProviderMixin";
import {
    type NamedEntity,
    namedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import {
    type RuntimeItems,
    runtimeItemsMixin,
} from "@mat3ra/code/dist/js/entity/mixins/RuntimeItemsMixin";
import { Taggable, taggableMixin } from "@mat3ra/code/dist/js/entity/mixins/TaggableMixin";
import type { NameResultSchema } from "@mat3ra/code/dist/js/utils/object";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { StatusSchema, WorkflowBaseUnitSchema } from "@mat3ra/esse/dist/js/types";
import { Utils } from "@mat3ra/utils";

import { UNIT_STATUSES } from "../enums";
import { type BaseUnitSchemaMixin, baseUnitSchemaMixin } from "../generated/BaseUnitSchemaMixin";
import { type StatusSchemaMixin, statusSchemaMixin } from "../generated/StatusSchemaMixin";
import { type RuntimeItemsUILogic, runtimeItemsUILogicMixin } from "../RuntimeItemsUILogicMixin";

type BaseEntity = typeof InMemoryEntity &
    Constructor<NamedEntity> &
    Constructor<Defaultable> &
    Constructor<HasRepetition> &
    Constructor<Taggable> &
    Constructor<HashedEntity> &
    Constructor<RuntimeItems> &
    Constructor<RuntimeItemsUILogic> &
    Constructor<BaseUnitSchemaMixin> &
    Constructor<StatusSchemaMixin> &
    Constructor<ImportantSettingsProvider> &
    Constructor<ContextAndRenderFields>;

type Schema = WorkflowBaseUnitSchema;

export abstract class BaseUnit extends (InMemoryEntity as BaseEntity) implements Schema {
    static usePredefinedIds = false;

    static generateFlowChartId(name: string) {
        if (this.usePredefinedIds) {
            return Utils.uuid.getUUIDFromNamespace(`flowchart-${name}`);
        }
        return Utils.uuid.getUUID();
    }

    constructor(config: Partial<Schema> & Pick<Schema, "name">) {
        super({
            ...config,
            context: config.context || {},
            status: config.status || UNIT_STATUSES.idle,
            statusTrack: config.statusTrack || [],
            flowchartId: config.flowchartId || BaseUnit.generateFlowChartId(config.name),
            tags: config.tags || [],
        });

        this._runtimeContext = config.runtimeContext || {};
        this._initRuntimeItems();
    }

    abstract readonly contextProviders: ContextProvider[];

    get defaultResults(): NameResultSchema[] {
        return [];
    }

    get defaultMonitors(): NameResultSchema[] {
        return [];
    }

    get defaultPreProcessors(): NameResultSchema[] {
        return [];
    }

    get defaultPostProcessors(): NameResultSchema[] {
        return [];
    }

    get allowedResults(): NameResultSchema[] {
        return [];
    }

    get allowedMonitors(): NameResultSchema[] {
        return [];
    }

    get allowedPostProcessors(): NameResultSchema[] {
        return [];
    }

    get lastStatusUpdate() {
        const statusTrack = (this.statusTrack || []).filter(
            (s) => (s.repetition || 0) === this.repetition,
        );
        const sortedStatusTrack = statusTrack.sort((a, b) => a.trackedAt - b.trackedAt); // lodash.sortBy(statusTrack, (x) => x.trackedAt);
        return sortedStatusTrack[sortedStatusTrack.length - 1];
    }

    getHashObject(): object {
        return { ...this.hashObjectFromRuntimeItems, type: this.type };
    }

    isInStatus(status: StatusSchema["status"]) {
        return this.status === status;
    }

    clone(extraContext: object) {
        const flowchartIDOverrideConfigAsExtraContext = {
            flowchartId: BaseUnit.generateFlowChartId(this.name),
            ...extraContext,
        };
        return super.clone(flowchartIDOverrideConfigAsExtraContext);
    }
}

taggableMixin(BaseUnit.prototype);
hashedEntityMixin(BaseUnit.prototype);
hasRepetitionMixin(BaseUnit.prototype);
runtimeItemsMixin(BaseUnit.prototype);
runtimeItemsUILogicMixin(BaseUnit.prototype);
baseUnitSchemaMixin(BaseUnit.prototype);
statusSchemaMixin(BaseUnit.prototype);
importantSettingsProviderMixin(BaseUnit.prototype);
contextAndRenderFieldsMixin(BaseUnit.prototype);
namedEntityMixin(BaseUnit.prototype);
defaultableEntityMixin(BaseUnit);
