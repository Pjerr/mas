import { AccordionProvider } from '@/components/Accordion/Provider';
import { Children, cloneElement, HTMLProps, isValidElement } from 'react';

interface AccordionProps {
    children?: React.ReactNode;
    onExpand: (index: number) => void;
}

function Accordion({
    children,
    onExpand,
    ...rest
}: AccordionProps & HTMLProps<HTMLDivElement>) {
    const indexedChildren = Children.map(children, (child, i) => {
        if (isValidElement(child)) {
            return cloneElement(child, {
                ...child.props,
                index: i,
            });
        }
    });

    return (
        <AccordionProvider onExpand={onExpand}>
            <section aria-label="Accordion Container" {...rest}>
                {indexedChildren}
            </section>
        </AccordionProvider>
    );
}

export { Accordion };
