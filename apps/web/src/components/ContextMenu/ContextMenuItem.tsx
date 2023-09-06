import Button from '@/components/Button';
import { forwardRef } from 'react';
import styles from './styles.module.css';

interface MenuItemProps {
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}

export const ContextMenuItem = forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & MenuItemProps
>(({ label, disabled, icon, ...props }, ref) => {
    return (
        <Button
            {...props}
            ref={ref}
            className={styles['menu__item']}
            role="menuitem"
            disabled={disabled}
            icon={icon}
        >
            {label}
        </Button>
    );
});
