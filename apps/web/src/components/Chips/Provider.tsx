import { createContext, useEffect, useState } from 'react';

interface ChipsContextProps {
    onSelect: (index: number) => void;
}

const ChipsContext = createContext<ChipsContextProps>({
    onSelect: () => {},
});

const ChipsProvider = ({
    children,
    onSelect,
}: {
    children: React.ReactNode;
    onSelect: (index: number) => void;
}) => {
    return (
        <ChipsContext.Provider
            value={{
                onSelect,
            }}
        >
            {children}
        </ChipsContext.Provider>
    );
};

export { ChipsProvider, ChipsContext };
