import { Group } from '@/core/entities';
import { EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import MeiliSearch from 'meilisearch';
export declare class GroupSubscriber implements EventSubscriber<Group> {
    private readonly em;
    private readonly meiliSearchClient;
    constructor(em: EntityManager, meiliSearchClient: MeiliSearch);
    private index;
    initializeIndex(): Promise<void>;
    getSubscribedEntities(): EntityName<Group>[];
    afterCreate({ entity: group }: EventArgs<Group>): Promise<void>;
    afterUpdate({ entity: group }: EventArgs<Group>): Promise<void>;
    afterDelete(args: EventArgs<Group>): Promise<void>;
}
//# sourceMappingURL=group.subscriber.d.ts.map