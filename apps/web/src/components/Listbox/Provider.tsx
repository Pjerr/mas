import { createContext, useContext, useEffect, useState } from 'react';

interface ListboxContextProps {
    activeItem: number;
    setActiveItem: (id: number) => void;
}

const ListboxContext = createContext<ListboxContextProps | null>(null);

const useListboxContext = () => {
    const context = useContext(ListboxContext);
    if (!context) throw new Error('Listbox context is null');
    return context;
};

const ListboxProvider = ({
    children,
    onChange,
    controlledActiveListItem,
    setControlledActiveListItem,
}: {
    children: React.ReactNode;
    onChange: (index: number) => void;
    controlledActiveListItem?: number;
    setControlledActiveListItem?: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const [uncontrolledActiveListItem, setUncontrolledListItem] =
        useState<number>(0);

    const activeItem = controlledActiveListItem ?? uncontrolledActiveListItem;
    const setActiveItem =
        setControlledActiveListItem ?? setUncontrolledListItem;

    useEffect(() => {
        onChange(activeItem);
    }, [activeItem]);

    return (
        <ListboxContext.Provider value={{ activeItem, setActiveItem }}>
            {children}
        </ListboxContext.Provider>
    );
};

export { ListboxProvider, ListboxContext, useListboxContext };
