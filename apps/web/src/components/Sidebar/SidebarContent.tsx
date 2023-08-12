import styles from './styles.module.css';
import classNames from 'classnames';
import React from 'react';

export default function SidebarContent({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={classNames(styles['content-container'])}>
            {children}
        </div>
    );
}
