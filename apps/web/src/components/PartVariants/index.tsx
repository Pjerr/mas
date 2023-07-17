import styles from './styles.module.css';
import Button from '@/components/Button';
import { FaTimes } from 'react-icons/fa';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { ProductVariantsProps } from './types';

export default function PartVariants({ part }: ProductVariantsProps) {
    if (!part || !part.variants[0]) throw new Error('Response is empty');
    const columnHeaders: string[] = part.attributes.map(
        (attribute) => attribute.displayName
    );

    const removeVariant = (index: number) => {
        console.log(part.variants[index]);
    };

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
                {part.variants.map((variant, index) => {
                    if (!variant.options) return <tr></tr>;
                    return (
                        <tr key={index} className={styles['table__data-row']}>
                            {variant.options.map(({ value }) => (
                                <td className={styles['table__data']}>
                                    {value}
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
