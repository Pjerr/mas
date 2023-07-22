import styles from './styles.module.css';
import PartForm from '../Form';
import { useSelector } from 'react-redux';
import { selectPartForm } from '@/store/editors/part';

export default function Body() {
    const form = useSelector(selectPartForm);

    return (
        <div className={styles['editor__body']}>
            {form && <PartForm key={`product-form`} />}
        </div>
    );
}
