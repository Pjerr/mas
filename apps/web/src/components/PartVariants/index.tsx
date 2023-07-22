import styles from './styles.module.css';
import Button from '@/components/Button';
import { FaTimes } from 'react-icons/fa';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { Part, Variant } from '@/store/api/endpoints';

interface VariantsProps {
    part: Part;
}
export default function ProductVariants({ part }: VariantsProps) {
    const columnHeaders: string[] = part.attributes.map(
        (attribute) => attribute.displayName
    );

    const removeVariant = (index: number) => {
        console.log('We should remove this variant from the response');
        console.log(part.variants[index]);
    };

    const variants = part.variants;

    return (
        <table className={styles['variant__table']}>
            <thead>
                <tr className={styles['table__header-row']}>
                    {columnHeaders.map((header, index) => (
                        <th
                            key={`${header}_${index}`}
                            className={styles['table__header']}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {variants.map((variant, index) => {
                    if (!variant) return <tr></tr>;
                    return (
                        <tr key={index} className={styles['table__data-row']}>
                            {variant.optionsConfigs.map((config) => (
                                <td className={styles['table__data']}>
                                    {config.option.displayName}
                                </td>
                            ))}
                            <td className={styles['table__data']}>
                                <div className={styles['data__button']}>
                                    <ConfirmModal
                                        modalTitle="Remove variant"
                                        onConfirm={() => removeVariant(index)}
                                        control={
                                            <Button
                                                icon={<FaTimes />}
                                                tooltipText="Remove"
                                                variant={'outline'}
                                            />
                                        }
                                    />
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
