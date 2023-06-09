import { useEffect, RefObject } from 'react';

const useClickOutside = <T extends HTMLElement>(
    ref: RefObject<T>,
    callback: () => void
): void => {
    const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);
};

export default useClickOutside;
