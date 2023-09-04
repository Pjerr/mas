import Skeleton from '@/components/Skeleton';
import styles from './styles.module.css';

export function ResultAttributeSkeleton() {
    return (
        <div className={styles['attribute-result__skeleton']}>
            <Skeleton variant="rounded" />
            <Skeleton variant="rounded" />
            <Skeleton variant="rounded" />
        </div>
    );
}
