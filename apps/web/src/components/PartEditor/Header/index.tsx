import Button from '@/components/Button';
import styles from './styles.module.css';
import { FaPlusCircle } from 'react-icons/fa';
import { useAppDispatch } from '@/store';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { selectPartForm } from '@/store/editors/part';
import { createPartForm } from '@/store/editors/part/thunks';
import { Subheader } from './Subheader';
import SearchResult from './SearchResult';

export default function Header() {
    const dispatch = useAppDispatch();

    const form = useSelector(selectPartForm);

    const [searchParam, setSearchParam] = useState<string | null>(null);
    const [displaySearch, setDisplaySearch] = useState<boolean>(false);

    return (
        <React.Fragment>
            {form && (
                <div className={styles['edit__chips']}>
                    <Subheader
                        form={form}
                        setSearchParam={setSearchParam}
                        displaySearch={displaySearch}
                        setDisplaySearch={setDisplaySearch}
                    />
                    <SearchResult
                        activeForm={form}
                        searchParam={searchParam}
                        shouldDisplay={displaySearch}
                    />
                </div>
            )}
        </React.Fragment>
    );
}
