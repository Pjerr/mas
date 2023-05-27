import {
    arrow,
    autoUpdate,
    flip,
    offset,
    shift,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import React, { useRef } from 'react';

export interface TooltipOptions {
    initalOpen?: boolean;
    placement?: Placement;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function useTooltip({
    initalOpen = false,
    placement = 'top',
    open: controlledOpen,
    onOpenChange: setContolledOpen,
}: TooltipOptions = {}) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initalOpen);

    const arrowRef = useRef(null);

    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = setContolledOpen ?? setUncontrolledOpen;

    const data = useFloating({
        placement,
        open,
        onOpenChange: setOpen,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(5),
            flip({ fallbackAxisSideDirection: 'start' }),
            shift({ padding: 5 }),
            arrow({
                element: arrowRef,
            }),
        ],
    });

    const context = data.context;
    const hover = useHover(context, {
        move: false,
        enabled: controlledOpen == null,
        delay: {
            open: 250,
            close: 0,
        },
    });

    const focus = useFocus(context, { enabled: controlledOpen == null });
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'tooltip' });
    const interactions = useInteractions([hover, focus, dismiss, role]);

    return React.useMemo(
        () => ({
            open,
            setOpen,
            arrowRef,
            ...interactions,
            ...data,
        }),
        [open, setOpen, interactions, data, arrowRef]
    );
}

type ContextType = ReturnType<typeof useTooltip> | null;

export const TooltipContext = React.createContext<ContextType>(null);

export const useTooltipContext = () => {
    const context = React.useContext(TooltipContext);

    if (context === null)
        throw new Error('Tooltip components must be wrapped in <Tooltip />');

    return context;
};
