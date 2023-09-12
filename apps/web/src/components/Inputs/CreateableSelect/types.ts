import { GroupBase, PropsValue } from 'react-select';
import { SelectComponents } from 'react-select/dist/declarations/src/components';
import { OptionProps } from '../Select';

export interface CreatableSelectProps {
    options: OptionProps[];
    onChange: (value: string | undefined) => void;
    disabled?: boolean;
    onCreateOption?: (value: string) => void;
    noOptionsMessage?: (obj: { inputValue: string }) => React.ReactNode;
    defaultValue?: PropsValue<OptionProps>;
    value?: PropsValue<OptionProps>;
    components?:
        | Partial<SelectComponents<OptionProps, false, GroupBase<OptionProps>>>
        | undefined;
}
