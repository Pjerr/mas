import React, { useState } from 'react';
import { HTMLProps } from 'react';
import styles from './styles.module.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import TextInput from '../TextInput';
import Button from '@/components/Button';

interface NumberInputProps {
    icon?: React.ReactNode;
    variant?: 'underline' | 'border' | 'background';
    label?: string;
    iconPosition?: 'left' | 'right';
    value?: number;
    onChange?: (value: number) => void;
}

const NumberInput = React.forwardRef<
    HTMLInputElement,
    HTMLProps<HTMLInputElement> & NumberInputProps
>(({ value: propValue, onChange: propOnChange, ...props }, ref) => {
    const [value, setValue] = useState(propValue || 0);

    const handleChange = (newValue: number) => {
        setValue(newValue);
        propOnChange?.(newValue);
    };

    const handleButtonClick = (delta: number) => {
        const newValue = value + delta;
        handleChange(newValue);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (newValue === '' && value != 0) handleChange(0);
        if (newValue.match('^[0-9]+$')) handleChange(Number(newValue));
    };

    return (
        <div className={styles['number-input__container']}>
            <TextInput
                {...props}
                ref={ref}
                className={styles['number-input']}
                value={value}
                onChange={handleInputChange}
            />
            <div className={styles['number-input__buttons']}>
                <Button
                    onClick={() => handleButtonClick(1)}
                    variant="outline"
                    icon={<FaAngleUp />}
                    className={styles['number-input__button']}
                />
                <Button
                    onClick={() => handleButtonClick(-1)}
                    variant="outline"
                    icon={<FaAngleDown />}
                    className={styles['number-input__button']}
                />
            </div>
        </div>
    );
});

NumberInput.displayName = 'NumberInput';

export default NumberInput;
