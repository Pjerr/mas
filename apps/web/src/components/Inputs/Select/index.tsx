import ReactSelect from 'react-select';
import { selectStyles } from './styles';
import React from 'react';
import SelectType from 'react-select/dist/declarations/src/Select';

export interface OptionProps {
    value: string;
    label: string;
}

export interface SelectProps {
    options: OptionProps[];
    selectedOptions?: OptionProps | OptionProps[];
    onChange: (value: string | undefined) => void;
    classNamePrefix?: string;
}

const Select = React.forwardRef<
    SelectType<OptionProps, false, any> | null,
    SelectProps
>(({ options, onChange, selectedOptions, classNamePrefix, ...props }, ref) => {
    return (
        <ReactSelect<OptionProps, false, any>
            {...props}
            ref={ref}
            options={options}
            styles={selectStyles}
            isSearchable={false}
            instanceId={options[0].label}
            value={selectedOptions}
            onChange={(e) => onChange(e?.value)}
            menuPlacement={'auto'}
            classNamePrefix={classNamePrefix}
        />
    );
});

export default Select;
