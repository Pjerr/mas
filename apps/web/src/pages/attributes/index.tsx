import { useSidebarContext } from '@/hooks/useSidebar';
import { NextPageWithLayout } from '@/pages/_app';
import { AppDispatch, RootState } from '@/store';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import { SidebarLayout } from '@/layouts/SidebarLayout';

const Attributes: NextPageWithLayout = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className={styles['attribute__content']}>
            I am attributes page!
        </div>
    );
};

Attributes.getLayout = SidebarLayout;

export default Attributes;
