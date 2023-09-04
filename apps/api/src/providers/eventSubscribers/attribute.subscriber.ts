import { Attribute, GroupDocument } from '@/core/entities';
import { index_key_group } from '@/providers/eventSubscribers/index.config';
import { InjectMeiliSearch } from '@/providers/meilisearch/inject-meilisearch.decorator';
import {
  EventSubscriber,
  EntityManager,
  EntityName,
  EventArgs,
} from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import MeiliSearch from 'meilisearch';

@Injectable()
export class AttributeSubscriber implements EventSubscriber<Attribute> {
  constructor(
    private readonly em: EntityManager,
    @InjectMeiliSearch() private readonly meiliSearchClient: MeiliSearch,
  ) {
    this.em.getEventManager().registerSubscriber(this);
  }

  getSubscribedEntities(): EntityName<Attribute>[] {
    return [Attribute];
  }

  async afterCreate({ entity: attribute }: EventArgs<Attribute>) {
    attribute.populate(['group']);

    const groupDocument = await this.em.findOne(GroupDocument, {
      id: attribute.group.id,
    });

    await this.meiliSearchClient
      .index(index_key_group)
      .updateDocuments([groupDocument]);
  }

  async afterUpdate({ entity: attribute }: EventArgs<Attribute>) {
    attribute.populate(['group']);

    const groupDocument = await this.em.findOne(GroupDocument, {
      id: attribute.group.id,
    });

    await this.meiliSearchClient
      .index(index_key_group)
      .updateDocuments([groupDocument]);
  }

  async afterDelete({ entity: attribute }: EventArgs<Attribute>) {
    attribute.populate(['group']);

    const groupDocument = await this.em.findOne(GroupDocument, {
      id: attribute.group.id,
    });

    await this.meiliSearchClient
      .index(index_key_group)
      .updateDocuments([groupDocument]);
  }
}
