import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import styles from './styles.module.css';
import { useAppDispatch } from '@/store';
import { SidebarLayout } from '@/layouts/SidebarLayout';
import { PartEditor } from '@/components/PartEditor';
import { resetForm } from '@/store/editors/part';
import { createPartForm } from '@/store/editors/part/thunks';
import { AttributeOption, useFindPartQuery } from '@/store/api/endpoints';
import { useSelector } from 'react-redux';
import { initTable, loadData, selectTable } from '@/store/table';

export default function EditPart() {
    const router = useRouter();
    const query = router.query;

    const dispatch = useAppDispatch();

    const table = useSelector(selectTable);

    const partId = query.id as string;

    console.log(partId);

    const {
        data: response,
        isError,
        isLoading,
    } = useFindPartQuery(
        {
            query: {
                filters: [
                    {
                        field: 'id',
                        operator: '$in',
                        value: [partId],
                    },
                ],
                include: ['attributes.group', 'attributes.options.configs'],
            },
        },
        { skip: !partId }
    );

    console.log(response?.data[0]);

    useEffect(() => {
        if (!response) return;
        dispatch(resetForm());
        dispatch(createPartForm({ part: response.data[0] }));
        if (!response.data[0]) return;
        response.data[0].attributes.map((attribute) => {
            const instanceId = `${partId}-${attribute.id}`;
            if (!table[instanceId] || table[instanceId].data.length === 0) {
                dispatch(initTable(instanceId));
                dispatch(
                    loadData({
                        data: attribute.options as AttributeOption[],
                        isError,
                        isLoading,
                        instanceId,
                    })
                );
            }
        });
    }, [response, response?.data]);

    if (!response || (!response.data[0] && partId?.length))
        return (
            <div className={styles['spinner__container']}>
                Spinner goes here!
            </div>
        );

    return (
        <div className={styles['edit__container']}>
            <PartEditor />
        </div>
    );
}

EditPart.getLayout = SidebarLayout;
