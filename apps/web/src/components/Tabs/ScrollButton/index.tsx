import Button from '@/components/Button';
import styles from './styles.module.css';

export default function ScrollButton({
    visible,
    icon,
    handleScroll,
}: {
    visible: boolean;
    icon: React.ReactNode;
    handleScroll: () => void;
}) {
    if (!visible) return <></>;

    return (
        <Button
            icon={icon}
            onClick={handleScroll}
            className={styles['scroll-button']}
        ></Button>
    );
}
