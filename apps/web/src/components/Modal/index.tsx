import ModalHeader from '@/components/Modal/Header';
import {
    FloatingFocusManager,
    FloatingOverlay,
    FloatingPortal,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
} from '@floating-ui/react';
import classNames from 'classnames';
import React, { cloneElement, useMemo, useState } from 'react';
import { ReactElement, ReactNode } from 'react';
import { mergeRefs } from 'react-merge-refs';
import styles from './styles.module.css';

export enum ModalSize {
    XXL = 'xxl',
    XL = 'xl',
    MD = 'md',
    SM = 'sm',
}

interface ModalProps {
    control: ReactElement;
    children: ReactNode;
    title: string;
    size?: ModalSize;
    isOpen?: boolean;
    setOpen?: (flag: boolean) => void;
}

function Modal({
    title,
    control,
    children,
    isOpen: controlledOpen,
    setOpen: setControlledOpen,
    size = ModalSize.MD,
}: ModalProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(false);

    const isOpen = controlledOpen ?? uncontrolledOpen;
    const setOpen = setControlledOpen ?? setUncontrolledOpen;

    const { refs, context } = useFloating({
        open: isOpen,
        onOpenChange: setOpen,
    });

    const { getFloatingProps, getReferenceProps } = useInteractions([
        useClick(context),
        useRole(context),
        useDismiss(context, { escapeKey: true }),
    ]);

    const ref = useMemo(
        () => mergeRefs([refs, (children as any).ref]),
        [refs, children]
    );

    return (
        <React.Fragment>
            {cloneElement(control, {
                ...getReferenceProps({
                    ref,
                    ...control.props,
                    onClick: () => setOpen(true),
                }),
            })}
            <FloatingPortal>
                {isOpen && (
                    <FloatingOverlay
                        lockScroll
                        className={styles['modal__background']}
                    >
                        <FloatingFocusManager
                            context={context}
                            order={['floating', 'reference', 'content']}
                        >
                            <div
                                {...getFloatingProps({
                                    ref,
                                    className: classNames(
                                        styles.modal,
                                        styles[`modal--${size}`]
                                    ),
                                })}
                            >
                                <ModalHeader
                                    title={title}
                                    close={() => setOpen(false)}
                                />
                                <div className={styles['modal__content']}>
                                    {children}
                                </div>
                            </div>
                        </FloatingFocusManager>
                    </FloatingOverlay>
                )}
            </FloatingPortal>
        </React.Fragment>
    );
}

export default Modal;
