import Skeleton from '@/components/Skeleton';
import styles from './styles.module.css';

export function ResultGroupSkeleton() {
    return (
        <div className={styles['group-result__skeleton']}>
            <Skeleton variant="rectangular" />
            <Skeleton variant="rectangular" />
            <Skeleton variant="rectangular" />
            <Skeleton variant="rectangular" />
        </div>
    );
}
