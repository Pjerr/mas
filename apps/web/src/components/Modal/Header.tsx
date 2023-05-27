import { FaTimes } from 'react-icons/fa';
import styles from './styles.module.css';

function ModalHeader({ title, close }: { title: string; close: () => void }) {
    return (
        <div className={styles['modal__header']}>
            <h3 className={styles['header__title']}>{title}</h3>
            <button
                className={styles['header__close']}
                onClick={close}
                tabIndex={1}
                data-cy="modal__close-button"
            >
                <FaTimes className={styles['modal__close-button']} />
            </button>
        </div>
    );
}

export default ModalHeader;
