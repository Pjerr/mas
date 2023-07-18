import ProductVariants from '@/components/PartVariants';
import { SidebarLayout } from '@/layouts/SidebarLayout';
import { NextPageWithLayout } from '@/pages/_app';
import { selectPartEditorValue } from '@/store/editors/part';
import { useSelector } from 'react-redux';

const Variants: NextPageWithLayout = () => {
    const part = useSelector(selectPartEditorValue);
    if (!part) return <>Loading...</>;
    return <ProductVariants part={part} />;
};

Variants.getLayout = SidebarLayout;
export default Variants;
