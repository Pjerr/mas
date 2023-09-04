import { Group, GroupDocument } from '@/core/entities';
import { Settings } from 'meilisearch';

export const index_key_group = 'groups';
export const updateGroupSettings: Settings = {
  displayedAttributes: [
    'name',
    'id',
    'attributes.displayName',
    'attributes.id',
  ],
  searchableAttributes: ['name', 'attributes.displayName'],
  typoTolerance: {
    enabled: true,
    minWordSizeForTypos: {
      oneTypo: 4,
      twoTypos: 5,
    },
  },
  pagination: {
    maxTotalHits: 5,
  },
};

export const generateGroupDocument = (group: Group): GroupDocument => {
  return {
    id: group.id,
    name: group.name,
    attributes: group.attributes.getItems().map((attribute) => {
      return {
        displayName: attribute.displayName,
        id: attribute.id,
      };
    }),
  };
};
