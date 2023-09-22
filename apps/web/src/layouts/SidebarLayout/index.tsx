import { Sidebar } from '@/components/Sidebar';
import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.css';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { Header } from '@/components/Header';

function SidebarLayout(page: React.ReactElement): React.ReactNode {
    return (
        <SessionAuth>
            <Header />
            <div className={classNames(styles['sidebar-layout'])}>
                <Sidebar />
                <div className={classNames(styles['main-content'])}>{page}</div>
            </div>
        </SessionAuth>
    );
}

export { SidebarLayout };
