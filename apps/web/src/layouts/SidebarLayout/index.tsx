import { Sidebar } from '@/components/Sidebar';
import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.css';

function SidebarLayout(page: React.ReactElement): React.ReactNode {
    return (
        <div className={classNames(styles['sidebar-layout'])}>
            <Sidebar />
            <div className={classNames(styles['main-content'])}>{page}</div>
        </div>
    );
}

export { SidebarLayout };
