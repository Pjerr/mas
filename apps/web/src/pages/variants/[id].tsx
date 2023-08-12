import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../_app';
import { useTable } from '@/hooks/useTable';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useEffect } from 'react';
import PartVariants from '@/components/PartVariants';
import { SidebarLayout } from '@/layouts/SidebarLayout';
import { LS_PART_VARIANT_ID } from '@/utils/constants';

const Variants: NextPageWithLayout = () => {
    const router = useRouter();
    const { loadVariantData } = useTable();
    const [partId] = useLocalStorage<string | undefined>(
        LS_PART_VARIANT_ID,
        router.query.id as string
    );

    useEffect(() => {
        loadVariantData(partId!);
    }, [partId]);

    return <PartVariants partId={partId} />;
};

Variants.getLayout = SidebarLayout;
export default Variants;
