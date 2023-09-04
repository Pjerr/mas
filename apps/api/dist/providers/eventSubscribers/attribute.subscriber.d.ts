import { Attribute } from '@/core/entities';
import { EventSubscriber, EntityManager, EntityName, EventArgs } from '@mikro-orm/core';
import MeiliSearch from 'meilisearch';
export declare class AttributeSubscriber implements EventSubscriber<Attribute> {
    private readonly em;
    private readonly meiliSearchClient;
    constructor(em: EntityManager, meiliSearchClient: MeiliSearch);
    getSubscribedEntities(): EntityName<Attribute>[];
    afterCreate({ entity: attribute }: EventArgs<Attribute>): Promise<void>;
    afterUpdate({ entity: attribute }: EventArgs<Attribute>): Promise<void>;
    afterDelete({ entity: attribute }: EventArgs<Attribute>): Promise<void>;
}
//# sourceMappingURL=attribute.subscriber.d.ts.map