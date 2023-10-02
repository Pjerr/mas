import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../_app';
import { useTable } from '@/hooks/useTable';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useEffect } from 'react';
import PartVariants from '@/components/PartVariants';
import { SidebarLayout } from '@/layouts/SidebarLayout';
import { LS_PART_VARIANT_ID } from '@/utils/constants';
import styles from '../styles.module.css';

const Variants: NextPageWithLayout = () => {
    const router = useRouter();
    const { loadVariantData } = useTable();

    const partId = router.query.id as string;

    const [_, setLsPartId] = useLocalStorage<string | undefined>(
        LS_PART_VARIANT_ID,
        router.query.id as string
    );

    useEffect(() => {
        setLsPartId(partId);
        loadVariantData(partId!);
    }, [partId]);

    return (
        <div className={styles['products__container']}>
            <PartVariants partId={partId} />
        </div>
    );
};

Variants.getLayout = SidebarLayout;
export default Variants;
