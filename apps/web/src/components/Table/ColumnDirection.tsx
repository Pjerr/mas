import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { SortDirection } from '@tanstack/react-table';

export default function ColumDirection({
    dir,
}: {
    dir: SortDirection | false;
}) {
    if (dir === false) return <FaSort />;
    else if (dir === 'asc') return <FaSortDown />;
    else return <FaSortUp />;
}
