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
    selectedOptions: OptionProps[] | undefined;
    onChange: (values: string[]) => void;
    classNamePrefix?: string;
}

const MultipleSelect = React.forwardRef<
    SelectType<OptionProps, true, any>,
    SelectProps
>(({ options, onChange, selectedOptions, classNamePrefix, ...props }, ref) => {
    return (
        <ReactSelect<OptionProps, true, any>
            {...props}
            ref={ref}
            isMulti
            options={options}
            styles={selectStyles}
            isSearchable={false}
            instanceId={options[0].label}
            value={selectedOptions}
            onChange={(e) => onChange(e.map((option) => option.value))}
            menuPlacement={'auto'}
            classNamePrefix={classNamePrefix}
        />
    );
});

MultipleSelect.displayName = 'MultipleSelect';

export default MultipleSelect;
