import { Group, GroupDocument } from '@/core/entities';
import {
  generateGroupDocument,
  index_key_group,
  updateGroupSettings,
} from '@/providers/eventSubscribers/index.config';
import { InjectMeiliSearch } from '@/providers/meilisearch/inject-meilisearch.decorator';
import { EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import MeiliSearch, { EnqueuedTask } from 'meilisearch';

@Injectable()
export class GroupSubscriber implements EventSubscriber<Group> {
  constructor(
    private readonly em: EntityManager,
    @InjectMeiliSearch() private readonly meiliSearchClient: MeiliSearch,
  ) {
    em.getEventManager().registerSubscriber(this);
  }

  private index: EnqueuedTask;

  async initializeIndex() {
    this.index = await this.meiliSearchClient
      .index(index_key_group)
      .updateSettings(updateGroupSettings);
  }

  getSubscribedEntities(): EntityName<Group>[] {
    return [Group];
  }

  async afterCreate({ entity: group }: EventArgs<Group>) {
    group.populate(['attributes']);

    await this.meiliSearchClient
      .index(index_key_group)
      .addDocuments([generateGroupDocument(group)]);
  }

  async afterUpdate({ entity: group }: EventArgs<Group>) {
    const groupDocument = await this.em.findOne(GroupDocument, {
      id: group.id,
    });

    await this.meiliSearchClient
      .index(index_key_group)
      .updateDocuments([groupDocument]);
  }

  async afterDelete(args: EventArgs<Group>) {
    await this.meiliSearchClient
      .index(index_key_group)
      .deleteDocument(args.entity.id);
  }
}
