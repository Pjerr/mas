import { useSidebarContext } from '@/hooks/useSidebar';
import classNames from 'classnames';
import React from 'react';
import SidebarContent from './SidebarContent';
import styles from './styles.module.css';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

export function Sidebar() {
    const { getActiveTab, tabs, toggleSidebar } = useSidebarContext();

    const activeTab = getActiveTab();

    function handleToggleSidebar(tabId: string) {
        toggleSidebar(tabId);
    }

    if (!tabs.length) return <></>;

    const animation = {
        variants: {
            open: { opacity: 1, height: '100%', translateX: '0%' },
            collapsed: { opacity: 1, height: '100%', translateX: '-100%' },
        },
        transition: { duration: 0.2 },
    };

    return (
        tabs && (
            <React.Fragment>
                <div
                    className={styles['sidebar-container']}
                    data-cy="cy__container"
                >
                    <nav className={classNames(styles['nav-container'])}>
                        {tabs.map((tab) => (
                            <div
                                className={classNames(styles['tabs-tab'], {
                                    [styles['tab--active']]:
                                        activeTab && activeTab === tab,
                                })}
                                key={`${tab.title}`}
                                onClick={() => handleToggleSidebar(tab.id)}
                                data-cy="cy__tab"
                            >
                                {tab.title}
                            </div>
                        ))}
                    </nav>
                </div>
                <LazyMotion features={domAnimation} strict>
                    <AnimatePresence initial={false}>
                        {activeTab && (
                            <m.div
                                key={`sidebar-${activeTab.id}`}
                                initial="collapsed"
                                animate="open"
                                exit="collapsed"
                                variants={animation.variants}
                                transition={animation.transition}
                                className={styles['expandable-container']}
                            >
                                <SidebarContent key={activeTab.id}>
                                    {activeTab.component()}
                                </SidebarContent>
                            </m.div>
                        )}
                    </AnimatePresence>
                </LazyMotion>
            </React.Fragment>
        )
    );
}
