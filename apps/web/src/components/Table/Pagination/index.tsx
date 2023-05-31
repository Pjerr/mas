import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import classNames from 'classnames';
import styles from './styles.module.css';
import { useTableSelector } from '@/hooks/useTable';

export interface OptionProps {
    value: number;
    label: string;
}

export function Pagination({ instanceId }: { instanceId: string }) {
    const table = useTableSelector(instanceId);

    if (!table) throw new Error(`Table ${instanceId} does not exist`);

    const currentPage = () =>
        `${table.getRowModel().rows.length} of 
        ${table.getFilteredRowModel().rows.length}`;

    return (
        <div className={styles['pagination']}>
            <strong>{currentPage()}</strong>
            <div className={styles['pagination__button-container']}>
                <button
                    className={classNames(
                        styles['button-container__page-button'],
                        {
                            [styles['button-container__page-button--disabled']]:
                                !table.getCanPreviousPage(),
                        }
                    )}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className={classNames(
                        styles['button-container__page-button'],
                        {
                            [styles['button-container__page-button--disabled']]:
                                !table.getCanNextPage(),
                        }
                    )}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <FaAngleRight />
                </button>
            </div>
        </div>
    );
}
