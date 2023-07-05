import styles from './styles.module.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import classNames from 'classnames';
import { useAppDispatch } from '@/store';
import Button from '@/components/Button';
import { EditorMode } from '@/store/editors/enums';
import ConfirmModal from '../Modal/ConfirmModal';
import { setManufacturerEditorState } from '@/store/editors/manufacturer';

export default function FormButtons({}: {}) {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setManufacturerEditorState({ mode: EditorMode.None }));
    };

    return (
        <div className={classNames(styles['form__buttons'])}>
            <ConfirmModal
                control={
                    <Button variant={'secondary'} icon={<FaTimes />}>
                        Cancel
                    </Button>
                }
                modalTitle={'Discard form'}
                onConfirm={handleClose}
                text="Are you sure you want to discard this form?"
            />
            <Button type="submit" variant={'primary'} icon={<FaCheck />}>
                Save
            </Button>
        </div>
    );
}
