import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import React, { useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { selectActivePartId, selectPartForm } from '@/store/editors/part';
import Searchbar from './Searchbar';
import { GroupChips } from './GroupChips';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

export default function Header() {
    const activeForm = useSelector(selectPartForm);
    const activePartId = useSelector(selectActivePartId);
    const [searchParam, setSearchParam] = useState<string | null>(null);
    const [displaySearch, setDisplaySearch] = useState<boolean>(false);

    const onClickOutsideRef = useRef<HTMLDivElement | null>(null);

    const hasVariants = activeForm?.value?.configsCount! > 0;

    const onClickOutside = () => {
        setDisplaySearch(false);
    };

    const router = useRouter();

    useClickOutside(onClickOutsideRef, onClickOutside);

    const onShowVariants = () => {
        router.basePath = 'Editor';
        router.push(
            {
                pathname: `variants/${activePartId}`,
                query: { value: 'Editor' },
            },
            `variants/${activePartId}`
        );
    };

    return (
        <React.Fragment>
            {activeForm && (
                <>
                    <h1 className={styles['edit__header']}>
                        Product Configuration
                    </h1>
                    <div className={styles['edit__subheader']}>
                        {hasVariants && (
                            <div className={styles['variants__link']}>
                                <Button
                                    variant="secondary"
                                    className={styles['link']}
                                    onClick={onShowVariants}
                                >
                                    Show variants
                                </Button>
                            </div>
                        )}
                        <GroupChips activeForm={activeForm} />
                        <Searchbar
                            ref={onClickOutsideRef}
                            activeForm={activeForm}
                            searchParam={searchParam}
                            displaySearch={displaySearch}
                            setSearchParam={setSearchParam}
                            setDisplaySearch={setDisplaySearch}
                        />
                    </div>
                </>
            )}
        </React.Fragment>
    );
}
