import React from 'react';
import styles from './styles.module.css';
import { SidebarLayout } from '@/layouts/SidebarLayout';
import { PartEditor } from '@/components/PartEditor';

export default function CreatePart() {
    return (
        <div className={styles['edit__container']}>
            <PartEditor />
        </div>
    );
}

CreatePart.getLayout = SidebarLayout;
