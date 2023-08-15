import classNames from 'classnames';
import React, { HTMLProps, useContext, useRef, useState } from 'react';
import styles from './styles.module.css';
import { ChipsContext } from './Provider';
import { FaCaretDown } from 'react-icons/fa';
import useClickOutside from '@/hooks/useClickOutside';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { mergeRefs } from 'react-merge-refs';

export interface ChipProps {
    title: string;
    rightChip?: React.ReactNode;
    variant: 'filled' | 'outlined';
    index?: number;
    isExpandable?: boolean;
}

const Chip = React.forwardRef<
    HTMLDivElement,
    Omit<HTMLProps<HTMLDivElement>, 'onClick'> & ChipProps
>(
    (
        {
            title,
            variant,
            index,
            rightChip,
            children,
            isExpandable = false,
            ...rest
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState<boolean>(false);

        const { onSelect } = useContext(ChipsContext);

        const handleChipSelect = () => {
            if (!index && index != 0) return;
            if (index < 0)
                throw new Error('Chips index is not defined (Chip component)');
            onSelect(index);
        };

        const handleToggleExpand = () => {
            setIsOpen(!isOpen);
        };

        const handleCloseExpand = () => {
            setIsOpen(false);
        };

        const clickOutsideRef = useRef<HTMLDivElement | null>(null);

        useClickOutside(clickOutsideRef, handleCloseExpand);

        return (
            <div
                className={classNames(
                    styles['chip__container'],
                    styles[`chip__${variant}`],
                    {
                        [styles['chip__container--expanded']]: isOpen,
                        [styles['chip__container--expandable']]: isExpandable,
                    }
                )}
                ref={mergeRefs([ref, clickOutsideRef])}
                {...rest}
            >
                {isExpandable && (
                    <div
                        className={styles['expand-button__container']}
                        onClick={handleToggleExpand}
                    >
                        <LazyMotion features={domAnimation} strict>
                            <m.button
                                animate={
                                    isOpen ? { rotate: 180 } : { rotate: 0 }
                                }
                                type="button"
                                aria-label="Close accordion"
                                data-cy="chip__expand"
                                className={styles['expand-button']}
                            >
                                <FaCaretDown data-cy="chip__expand-icon" />
                            </m.button>
                        </LazyMotion>
                    </div>
                )}
                <div
                    className={classNames(styles['chip__header'])}
                    onClick={handleChipSelect}
                >
                    <div
                        className={styles['chip__title']}
                        data-cy="chip__title"
                    >
                        {title}
                    </div>
                    {rightChip}
                </div>
                {isOpen && (
                    <div className={styles['chip__expandable-container']}>
                        {children}
                    </div>
                )}
            </div>
        );
    }
);

export default Chip;
