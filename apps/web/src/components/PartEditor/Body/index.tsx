import styles from './styles.module.css';
import { useAppDispatch } from '@/store';
import PartForm from '../Form';
import { useSelector } from 'react-redux';
import { selectPartForm } from '@/store/editors/part';

export default function Body() {
    const dispatch = useAppDispatch();

    const form = useSelector(selectPartForm);

    return (
        <div className={styles['editor__body']} data-cy="product-editor__body">
            {form && <PartForm key={`product-form`} />}
        </div>
    );
}
