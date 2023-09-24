import { useTooltipContext } from '@/hooks/useTooltip';
import {
    FloatingPortal,
    useMergeRefs,
    useTransitionStyles,
} from '@floating-ui/react';
import styles from './styles.module.css';
import React from 'react';

const TooltipContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>((props, propRef) => {
    const context = useTooltipContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);

    const { styles: transitionStyles } = useTransitionStyles(context.context);

    return (
        <FloatingPortal>
            {context.open && (
                <React.Fragment>
                    <div
                        ref={ref}
                        style={{
                            position: context.strategy,
                            top: context.y ?? 0,
                            left: context.x ?? 0,
                            visibility:
                                context.x === null ? 'hidden' : 'visible',
                            ...props.style,
                            ...transitionStyles,
                        }}
                        {...context.getFloatingProps(props)}
                    >
                        {props.children}
                    </div>
                </React.Fragment>
            )}
        </FloatingPortal>
    );
});

TooltipContent.displayName = 'TooltipContent';

export default TooltipContent;
