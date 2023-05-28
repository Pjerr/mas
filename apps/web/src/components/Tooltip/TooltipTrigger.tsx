import { useTooltipContext } from '@/hooks/useTooltip';
import { useMergeRefs } from '@floating-ui/react';
import styles from './styles.module.css';
import React from 'react';

const TooltipTrigger = React.forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(({ children, ...props }, propRef) => {
    const context = useTooltipContext();
    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    return (
        <div
            ref={ref}
            data-state={context.open ? 'open' : 'closed'}
            className={styles['tooltip__trigger']}
            {...context.getReferenceProps(props)}
        >
            {children}
        </div>
    );
});

TooltipTrigger.displayName = 'TooltipTrigger';

export default TooltipTrigger;
