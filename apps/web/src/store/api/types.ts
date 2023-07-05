import { EntityType } from '../table/types';
import { MasApi as Api } from './endpoints';

type Endpoints = keyof typeof Api.endpoints;

type findEndpoints = Extract<
    Endpoints,
    'findAttribute' | 'findPart' | 'findOption' | 'findManufacturer'
>;

type removeManyEndpoints = Extract<
    Endpoints,
    | 'removeManyPart'
    | 'removeManyAttribute'
    | 'removeManyOption'
    | 'removeManyManufacturer'
>;

export const findNotation: Record<EntityType, findEndpoints> = {
    [EntityType.Attribute]: 'findAttribute',
    [EntityType.Part]: 'findPart',
    [EntityType.Option]: 'findOption',
    [EntityType.Manufacturer]: 'findManufacturer',
};

export const removeManyNotation: Record<EntityType, removeManyEndpoints> = {
    [EntityType.Attribute]: 'removeManyAttribute',
    [EntityType.Part]: 'removeManyPart',
    [EntityType.Option]: 'removeManyOption',
    [EntityType.Manufacturer]: 'removeManyManufacturer',
};
