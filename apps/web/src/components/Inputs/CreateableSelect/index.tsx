import ReactCreatable from 'react-select/creatable';
import { CreatableSelectProps } from './types';
import React, { useEffect, useRef } from 'react';
import { OptionProps } from '../Select';
import { selectStyles } from './styles';

const CreatableSelect = React.forwardRef<any, CreatableSelectProps>(
    ({ options: initialOptions, onCreateOption, onChange, ...props }, ref) => {
        const [options, setOptions] = React.useState<OptionProps[]>(
            initialOptions || []
        );

        useEffect(() => {
            setOptions(initialOptions);
        }, [initialOptions]);

        const createOption = (label: string) => ({
            label,
            value: label.toLowerCase().replace(/\W/g, ''),
            disabled: false,
        });

        const handleCreateOption = (inputValue: string) => {
            const newOptions = [...options];
            const createdOption = createOption(inputValue);
            newOptions.push(createdOption);
            setOptions(newOptions);
            if (!onCreateOption) return;
            onCreateOption(inputValue);
        };

        return (
            <ReactCreatable
                {...props}
                styles={selectStyles}
                options={options}
                onChange={(e) => onChange(e?.value)}
                onCreateOption={handleCreateOption}
                menuPlacement="auto"
                blurInputOnSelect={true}
            />
        );
    }
);

export default CreatableSelect;
