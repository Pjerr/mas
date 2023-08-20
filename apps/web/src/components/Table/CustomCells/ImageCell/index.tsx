import styles from './styles.module.css';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { CellContext } from '@tanstack/react-table';
import {
    Variant,
    useUpdateVariantImagePartMutation,
} from '@/store/api/endpoints';
import { MouseEvent } from 'react';
import Button from '@/components/Button';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/store';
import { updateEntity } from '@/store/table';
import { FaTimes } from 'react-icons/fa';

export function ImageCell({ row }: CellContext<Variant, any>) {
    const [updateImageUploaded] = useUpdateVariantImagePartMutation();

    const dispatch = useAppDispatch();

    const handleImageDelete = () => {
        console.log('i should delete the image with');
        console.log(row.original.id);
    };

    if (row.original.imageUploaded)
        return (
            <div className={styles['image__container']}>
                <CldImage
                    width={100}
                    height={100}
                    src={`variants/${row.original.id}`}
                    alt="variant"
                />
                <Button
                    icon={<FaTimes />}
                    onClick={handleImageDelete}
                    className={styles['image__delete-control']}
                />
            </div>
        );

    return (
        <div className={styles['image__container']}>
            <CldUploadWidget
                uploadPreset="dipl_unsigned"
                options={{
                    folder: 'variants',
                    singleUploadAutoClose: true,
                    resourceType: 'image',
                    publicId: row.original.id,
                }}
                onSuccess={async () => {
                    const response = await updateImageUploaded({
                        updateVariantImage: {
                            id: row.original.id,
                        },
                    });
                    if ('error' in response) {
                        toast('API error', { type: 'error' });
                        return;
                    }

                    dispatch(
                        updateEntity({
                            entity: response.data.data,
                            instanceId: `variants-table-${row.original.part}`,
                        })
                    );
                }}
            >
                {({ open }) => {
                    const handleOpen = (
                        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
                    ) => {
                        e.preventDefault();
                        open();
                    };

                    return (
                        <Button variant={'primary'} onClick={handleOpen}>
                            Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}
