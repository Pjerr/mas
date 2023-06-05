import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import styles from './styles.module.css';
import { useAppDispatch } from '@/store';
import { SidebarLayout } from '@/layouts/SidebarLayout';
import { PartEditor } from '@/components/PartEditor';
import { resetForm } from '@/store/editors/part';
import { createPartForm } from '@/store/editors/part/thunks';
import { useFindOnePartQuery } from '@/store/api/endpoints';

export default function Edit() {
    const router = useRouter();
    const query = router.query;

    const dispatch = useAppDispatch();

    const queryIds = query['productId'];

    const partIds = useMemo(() => {
        return Array.isArray(queryIds) ? queryIds : [queryIds];
    }, [queryIds]);

    const { data: response } = useFindOnePartQuery(
        {
            id: partIds[0] ?? '',
        },
        { skip: !queryIds }
    );

    useEffect(() => {
        if (!response) return;
        dispatch(resetForm());
        dispatch(createPartForm({ part: response.data }));
    }, [response]);

    if (!response && queryIds?.length)
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

Edit.getLayout = SidebarLayout;
