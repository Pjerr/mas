import { FaSearch } from 'react-icons/fa';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './styles.module.css';
import Tooltip from '@/components/Tooltip';
import TooltipContent from '@/components/Tooltip/TooltipContent';
import TooltipTrigger from '@/components/Tooltip/TooltipTrigger';
import useDebounce from '@/hooks/useDebounce';
import TextInput from '../TextInput';
import classNames from 'classnames';

interface SearchProps {
    onChange: (value: string) => void;
    debounce?: number;
    tooltipText?: string;
}

const SearchInput = React.forwardRef<
    HTMLInputElement,
    SearchProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>
>(({ value: initialValue, onChange, debounce, tooltipText, ...props }, ref) => {
    const [value, setValue] = useState<string>(initialValue as string);
    const debouncedValue = useDebounce<string>(value, debounce ?? 500);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        onChange(debouncedValue);
    }, [debouncedValue]);

    return (
        <TextInput
            ref={ref}
            {...props}
            value={value}
            variant={'underline'}
            icon={<FaSearch cursor={'pointer'} />}
            onChange={handleChange}
            className={classNames(styles['search-input'], props.className)}
        />
    );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
