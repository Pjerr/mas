import styles from './styles.module.css';
import { BsEyeSlashFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import { useRouter } from 'next/router';
import { LS_PREVIOUS_PAGE } from '@/utils/constants';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useTableSelector } from '@/hooks/useTable';
import Button from '@/components/Button';
import { selectSelectedRows, updateEntity } from '@/store/table';
import { useToggleVariantsPartMutation } from '@/store/api/endpoints';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export interface VariantHeaderProps {
    instanceId: string;
}
export const VariantHeader = ({ instanceId }: VariantHeaderProps) => {
    const router = useRouter();
    const [value, setValue] = useLocalStorage(
        LS_PREVIOUS_PAGE,
        router.query.value
    );

    const dispatch = useAppDispatch();

    const [toggleVariants] = useToggleVariantsPartMutation();

    const table = useTableSelector(instanceId);

    const selected = useSelector(
        (state: RootState) => selectSelectedRows(state, instanceId) as string[]
    );

    useEffect(() => {
        setValue(router.query.value);
    }, [router.query.value]);

    if (!table) {
        return <></>;
    }

    const onDisable = async () => {
        const response = await toggleVariants({
            toggleVariant: {
                ids: selected,
            },
        });

        if ('error' in response) {
            toast('Something went wrong!', { type: 'error' });
            return;
        }

        toast('Variants toggled', { type: 'success' });
        response.data.data.forEach((variant) => {
            dispatch(updateEntity({ instanceId, entity: variant }));
        });
    };

    return (
        <>
            <div className={styles['header']}>
                <div className={styles['header__action']}>
                    <Button
                        icon={
                            <IoIosArrowBack className={styles['action-icon']} />
                        }
                        variant={'borderless'}
                        onClick={() => router.back()}
                    >
                        {`Back to ${value}`}
                    </Button>
                </div>
            </div>
            <div className={styles['toolbar']}>
                <div className={styles['toolbar__action']}>
                    <Button
                        icon={
                            <BsEyeSlashFill className={styles['action-icon']} />
                        }
                        variant={'borderless'}
                        onClick={onDisable}
                        disabled={!selected?.length}
                        tooltipText={`Toggle variant status`}
                    />
                </div>
            </div>
        </>
    );
};
