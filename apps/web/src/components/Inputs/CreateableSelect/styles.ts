import { StylesConfig } from 'react-select';
import { OptionProps } from '../Select';

export const selectStyles: StylesConfig<OptionProps, false, any> = {
    container: (styles) => ({
        ...styles,
        minWidth: 'var(--size-64)',
    }),
    control: (styles, { isFocused }) => ({
        ...styles,
        backgroundColor: 'var(--layer-1-color)',
        borderColor: isFocused ? 'var(--color-primary)' : 'var(--border-color)',
        boxShadow: 'none',
        color: 'var(--text-primary)',
        '&:hover': {
            borderColor: 'var(--color-primary)',
        },
    }),
    option: (styles, { isDisabled, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isSelected
                ? 'var(--color-primary)'
                : 'var(--layer-2-color)',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            '&:hover': {
                filter: 'brightness(0.9)',
            },
            '&:active': {
                filter: 'brightness(0.9)',
            },
            color: 'var(--text-primary)',
        };
    },
    singleValue: (styles, {}) => ({
        ...styles,
        color: 'var(--text-primary)',
    }),
    placeholder: (styles, {}) => ({
        ...styles,
        color: 'var(--text-primary)',
    }),
    menu: (styles) => ({
        ...styles,
        backgroundColor: 'var(--layer-2-color)',
        color: 'var(--text-primary)',
    }),
    input: (styles) => ({
        ...styles,
        color: 'var(--text-primary)',
    }),
};
