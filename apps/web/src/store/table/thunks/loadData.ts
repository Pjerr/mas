import { createAsyncThunk } from '@reduxjs/toolkit';
import { EntityType, includeArgMap } from '../types';
import { AppDispatch, RootState } from '@/store';
import { instanceIds } from '@/types/entity';
import { Filter, Sort } from '@/store/api/endpoints';
import { MasApi as Api } from '@/store/api/endpoints';
import { findNotation } from '@/store/api/types';
import { loadData } from '..';
interface LoadDataProps {
    sourceId?: string;
    type: EntityType;
    instanceId: string;
}

const createIncludeArg = (type: EntityType) => {
    return includeArgMap[type];
};

const createFilterArg = (
    sourceId: string,
    type: Exclude<EntityType, 'Part'>
) => {
    const filterArgMap: Record<Exclude<EntityType, 'Part'>, Filter> = {
        [EntityType.Attribute]: {
            field: 'group',
            operator: '$eq',
            value: sourceId as any,
        },
        [EntityType.Option]: {
            field: 'attribute',
            operator: '$eq',
            value: sourceId as any,
        },
    };

    return filterArgMap[type];
};

export const orderMap = (isDesc: boolean) => (isDesc ? 'DESC' : 'ASC');

const loadTableDataThunk = createAsyncThunk<
    void,
    LoadDataProps,
    { dispatch: AppDispatch; state: RootState }
>(
    'table/loadData',
    async ({ type, instanceId, sourceId }, { dispatch, getState }) => {
        const { table } = getState();

        const sort: Sort | undefined =
            table[instanceId].sorting.length > 0
                ? {
                      field: table[instanceId].sorting[0].id,
                      order: orderMap(table[instanceId].sorting[0].desc),
                  }
                : undefined;

        const filters = table.columnFilters
            ? table[instanceId].columnFilters.map((filter) => {
                  const parsed: Filter = {
                      field: filter.id,
                      operator: '$like',
                      value: [`%${filter.value}`],
                  };
                  return parsed;
              })
            : [];

        if (sourceId && type !== EntityType.Part) {
            filters.push(createFilterArg(sourceId, type));
        }
        const {
            data: response,
            isError,
            isLoading,
        } = await dispatch(
            Api.endpoints[findNotation[type]].initiate({
                query: {
                    filters,
                    sort,
                    include: createIncludeArg(type),
                },
            }) as any
        );

        dispatch(
            loadData({
                data: response ? response.data : [],
                isError,
                isLoading,
                instanceId,
            })
        );
    }
);

export default loadTableDataThunk;
