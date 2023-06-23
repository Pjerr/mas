import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import React, { useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { selectPartForm } from '@/store/editors/part';
import Searchbar from './Searchbar';
import { GroupChips } from './GroupChips';

export default function Header() {
    const activeForm = useSelector(selectPartForm);

    const [searchParam, setSearchParam] = useState<string | null>(null);
    const [displaySearch, setDisplaySearch] = useState<boolean>(false);

    const onClickOutsideRef = useRef<HTMLDivElement | null>(null);

    const onClickOutside = () => {
        setDisplaySearch(false);
    };

    useClickOutside(onClickOutsideRef, onClickOutside);

    return (
        <React.Fragment>
            {activeForm && (
                <div className={styles['edit__subheader']}>
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
            )}
        </React.Fragment>
    );
}
