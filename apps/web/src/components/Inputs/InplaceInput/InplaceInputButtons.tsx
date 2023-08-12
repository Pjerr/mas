import classNames from 'classnames';
import { FaRegCheckCircle, FaTimes } from 'react-icons/fa';
import Button from '../../Button';
import styles from './styles.module.css';

export function InplaceInputButtons({
    handleCancel,
}: {
    handleCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
    return (
        <div className={classNames(styles['inplace-buttons'])}>
            <Button
                type="submit"
                icon={<FaRegCheckCircle />}
                variant="borderless"
                className={styles['inplace-button']}
            />
            <Button
                type="button"
                icon={<FaTimes />}
                onClick={handleCancel}
                variant="borderless"
                className={styles['inplace-button']}
            />
        </div>
    );
}
