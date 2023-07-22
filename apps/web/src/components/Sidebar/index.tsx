import { useSidebarContext } from '@/hooks/useSidebar';
import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.css';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { animation } from '@/components/Sidebar/animation';

export function Sidebar() {
    const { activeIndex, tabs, toggleSidebar } = useSidebarContext();

    function handleToggleSidebar(index: number) {
        toggleSidebar(index);
    }

    if (!tabs.length) return <></>;

    return (
        <>
            <div className={styles['sidebar-container']}>
                <nav className={classNames(styles['nav-container'])}>
                    {tabs.map((tab, index) => (
                        <div
                            className={classNames(styles['tabs-tab'], {
                                [styles['tab--active']]: activeIndex === index,
                            })}
                            key={`${tab.title}`}
                            onClick={() => handleToggleSidebar(index)}
                        >
                            {tab.title}
                        </div>
                    ))}
                </nav>
            </div>
            <LazyMotion features={domAnimation} strict>
                <AnimatePresence initial={false} mode={'wait'}>
                    {activeIndex !== null && (
                        <m.div
                            key={`sidebar-${activeIndex}`}
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={animation.variants}
                            transition={animation.transition}
                            className={styles['expandable-container']}
                        >
                            {tabs[activeIndex].component()}
                        </m.div>
                    )}
                </AnimatePresence>
            </LazyMotion>
        </>
    );
}
