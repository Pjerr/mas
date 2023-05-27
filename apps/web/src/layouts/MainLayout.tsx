import React from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { Header } from '@/components/Header';
import SidebarProvider from '@/components/Sidebar/SidebarProvider';

function MainLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <React.Fragment>
            <Header />
            <SidebarProvider key={router.pathname}>
                <main className={styles['main-container']}>{children}</main>
            </SidebarProvider>
        </React.Fragment>
    );
}

export { MainLayout };
