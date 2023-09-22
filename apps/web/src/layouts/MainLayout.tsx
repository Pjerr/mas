import React, { useContext, useEffect } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import SidebarProvider from '@/components/Sidebar/SidebarProvider';
import { useAppDispatch } from '@/store';
import { SessionContext } from 'supertokens-auth-react/recipe/session';
import { useSelector } from 'react-redux';
import { resetUser, selectUser, setUser } from '@/store/user';

function MainLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const dispatch = useAppDispatch();

    const sessionContext = useContext(SessionContext);

    const user = useSelector(selectUser);

    useEffect(() => {
        if (sessionContext.loading) return;
        if (!sessionContext.doesSessionExist) {
            dispatch(resetUser());
            return;
        }
        if (!user && sessionContext.doesSessionExist) {
            dispatch(
                setUser({
                    user: {
                        id: sessionContext.userId,
                        role: sessionContext.accessTokenPayload['st-role'].v[0],
                    },
                })
            );
        }
    }, [user, sessionContext]);
    return (
        <SidebarProvider key={router.pathname}>
            <main className={styles['main-container']}>{children}</main>
        </SidebarProvider>
    );
}

export { MainLayout };
