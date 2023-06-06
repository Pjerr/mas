import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import styles from './styles.module.css';
import { useAppDispatch } from '@/store';
import { SidebarLayout } from '@/layouts/SidebarLayout';
import { PartEditor } from '@/components/PartEditor';
import { resetForm } from '@/store/editors/part';
import { createPartForm } from '@/store/editors/part/thunks';
import { useFindOnePartQuery } from '@/store/api/endpoints';

export default function EditPart() {
    const router = useRouter();
    const query = router.query;

    const dispatch = useAppDispatch();

    const partId = query.id as string;

    const { data: response } = useFindOnePartQuery(
        {
            id: partId,
        },
        { skip: !partId }
    );

    useEffect(() => {
        if (!response) return;
        dispatch(resetForm());
        dispatch(createPartForm({ part: response.data }));
    }, [response]);

    if (!response && partId?.length)
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
