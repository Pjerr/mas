import { createContext, useEffect, useState } from 'react';

interface AccordionContextData {
    activeItem: number | null;
    setActiveItem: (id: number | null) => void;
}

const AccordionContext = createContext<AccordionContextData>({
    activeItem: null,
    setActiveItem: () => {},
});

const AccordionProvider = ({
    children,
    onExpand,
}: {
    children: React.ReactNode;
    onExpand: (index: number) => void;
}) => {
    const [activeItem, setActiveItem] = useState<number | null>(null);

    useEffect(() => {
        if (activeItem !== null) {
            onExpand(activeItem);
        }
    }, [activeItem]);

    return (
        <AccordionContext.Provider
            value={{
                activeItem,
                setActiveItem,
            }}
        >
            {children}
        </AccordionContext.Provider>
    );
};

export { AccordionProvider, AccordionContext };
