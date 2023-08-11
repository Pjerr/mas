import { useState } from 'react';
import styles from './styles.module.css';
import { BsEyeSlashFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';
import { LS_PREVIOUS_PAGE } from '@/utils/constants';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useTableSelector } from '@/hooks/useTable';
import Button from '@/components/Button';
import SearchInput from '@/components/Inputs/SearchInput';
import { selectSelectedRows } from '@/store/table';

export interface VariantHeaderProps {
    instanceId: string;
}
export const VariantHeader = ({ instanceId }: VariantHeaderProps) => {
    const [searchParam, setSearchParam] = useState('');
    const router = useRouter();
    const [value] = useLocalStorage(LS_PREVIOUS_PAGE, router.query.value);

    const table = useTableSelector(instanceId);
    const selected = useSelector(
        (state: RootState) => selectSelectedRows(state, instanceId) as string[]
    );

    if (!table) {
        return <></>;
    }

    //TODO: full-text search
    const onSearch = () => {
        console.log(searchParam);
    };

    const onHide = () => {
        console.log(router);
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
                        tooltipText={`Hide variants`}
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
                        onClick={onHide}
                        disabled={!selected?.length}
                        tooltipText={`Hide variants`}
                    />
                </div>
                <SearchInput
                    placeholder="Search..."
                    value={searchParam}
                    onChange={setSearchParam}
                    onClick={onSearch}
                    className={styles['toolbar__search']}
                />
            </div>
        </>
    );
};
