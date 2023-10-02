import {
    FloatingFocusManager,
    FloatingOverlay,
    FloatingPortal,
    autoUpdate,
    flip,
    offset,
    shift,
    useDismiss,
    useFloating,
    useInteractions,
    useListNavigation,
    useRole,
    useTypeahead,
} from '@floating-ui/react';
import {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    useEffect,
    useRef,
    useState,
} from 'react';
import styles from './styles.module.css';

interface MenuProps {
    label?: string;
    targetRef: React.RefObject<HTMLElement>;
}

export const ContextMenu = forwardRef<
    HTMLButtonElement,
    React.HTMLProps<HTMLButtonElement> & MenuProps
>(({ children, targetRef, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const listItemsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const listContentRef = useRef(
        Children.map(children, (child) =>
            isValidElement(child) ? child.props.label : null
        ) as Array<string | null>
    );
    const allowMouseUpCloseRef = useRef(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [
            offset({ mainAxis: 4, alignmentAxis: 4 }),
            flip({
                fallbackPlacements: ['left-start'],
            }),
            shift({ padding: 10 }),
        ],
        placement: 'right-start',
        strategy: 'fixed',
        whileElementsMounted: autoUpdate,
    });

    const role = useRole(context, { role: 'menu' });

    const dismiss = useDismiss(context);

    const listNavigation = useListNavigation(context, {
        listRef: listItemsRef,
        onNavigate: setActiveIndex,
        activeIndex,
    });

    const typeahead = useTypeahead(context, {
        enabled: isOpen,
        listRef: listContentRef,
        onMatch: setActiveIndex,
        activeIndex,
    });

    const { getFloatingProps, getItemProps } = useInteractions([
        role,
        dismiss,
        listNavigation,
        typeahead,
    ]);

    useEffect(() => {
        if (!targetRef.current) return;

        let timeout: number;

        function onContextMenu(e: MouseEvent) {
            e.preventDefault();

            refs.setPositionReference({
                getBoundingClientRect() {
                    {
                        return {
                            width: 0,
                            height: 0,
                            x: e.clientX,
                            y: e.clientY,
                            top: e.clientY,
                            right: e.clientX,
                            bottom: e.clientY,
                            left: e.clientX,
                        };
                    }
                },
            });

            setIsOpen(true);
            clearTimeout(timeout);

            allowMouseUpCloseRef.current = false;
            timeout = window.setTimeout(() => {
                allowMouseUpCloseRef.current = true;
            }, 300);
        }

        function onMouseUp() {
            if (allowMouseUpCloseRef.current) setIsOpen(false);
        }

        targetRef.current.addEventListener('contextmenu', onContextMenu);
        targetRef.current.addEventListener('mouseup', onMouseUp);
        return () => {
            if (!targetRef.current) return;
            targetRef.current.removeEventListener('contextmenu', onContextMenu);
            targetRef.current.removeEventListener('mouseup', onMouseUp);
            clearTimeout(timeout);
        };
    }, [refs]);

    return (
        <FloatingPortal>
            {isOpen && (
                <FloatingOverlay lockScroll>
                    <FloatingFocusManager
                        context={context}
                        initialFocus={refs.floating}
                    >
                        <div
                            className={styles['context-menu']}
                            ref={refs.setFloating}
                            style={floatingStyles}
                            {...getFloatingProps()}
                        >
                            {Children.map(
                                children,
                                (child, index) =>
                                    isValidElement(child) &&
                                    cloneElement(
                                        child,
                                        getItemProps({
                                            tabIndex:
                                                activeIndex === index ? 0 : -1,
                                            ref(node: HTMLButtonElement) {
                                                listItemsRef.current[index] =
                                                    node;
                                            },
                                            onClick() {
                                                child.props.onClick?.();
                                                setIsOpen(false);
                                            },
                                            onMouseUp() {
                                                child.props.onClick?.();
                                                setIsOpen(false);
                                            },
                                        })
                                    )
                            )}
                        </div>
                    </FloatingFocusManager>
                </FloatingOverlay>
            )}
        </FloatingPortal>
    );
});