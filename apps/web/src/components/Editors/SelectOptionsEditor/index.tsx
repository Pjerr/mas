import Modal from '@/components/Modal';
import FormField from '@/components/FormField';
import Button from '@/components/Button';
import { EditorProps } from '@/types/editors';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import styles from '../styles.module.css';
import { EditorType, EditorValidation } from 'shared';
import { PropertyMetadata } from '@/lib/metadata';
import useDisclosure from '@/hooks/useDisclosure';

export default function SelectOptionsEditor({ metadata }: EditorProps) {
    const { control } = useFormContext();
    const { isOpen, setIsOpen } = useDisclosure();
    const { fields, append, remove } = useFieldArray({
        name: 'additionalMetadata.selectOptions',
        control,
    });

    const handleClick = () => {
        setIsOpen(true);
    };

    const createMetadata = (index: number) => {
        const metadata: PropertyMetadata = {
            displayName: '',
            isArray: false,
            propertyType: EditorType.Text,
            propertyKey: `additionalMetadata.selectOptions[${index}]`,
            propertyValidation: EditorValidation.Text,
        };
        return metadata;
    };

    return (
        <div className={styles['editor__container']}>
            <label className={styles['editor__label']}>
                {metadata.displayName}
            </label>
            <Modal
                isOpen={isOpen}
                title={'Add select options'}
                setOpen={setIsOpen}
                control={
                    <Button
                        type="button"
                        icon={
                            <FaPlusCircle className={styles['editor__icon']} />
                        }
                        onClick={handleClick}
                    />
                }
            >
                <div className={styles['editor__modal-child']}>
                    <ul className={styles['editor__list']}>
                        {fields.map((item, index) => {
                            return (
                                <li
                                    key={item.id}
                                    className={styles['editor__list-item']}
                                >
                                    <FormField
                                        key={`select-field__${index}`}
                                        metadata={createMetadata(index)}
                                        control={control}
                                    />
                                    <Button
                                        icon={<FaTimes />}
                                        onClick={() => remove(index)}
                                        variant="borderless"
                                        className={
                                            styles['editor__remove-button']
                                        }
                                    />
                                </li>
                            );
                        })}
                    </ul>
                    <div className={styles['editor__add-button']}>
                        <Button
                            variant="full-outline"
                            onClick={() => append('')}
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
