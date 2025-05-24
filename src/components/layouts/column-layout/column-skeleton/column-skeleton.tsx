'use client';
import { ColumnSkeletonProps } from './column-skeleton.types';
import { useThreadStyles } from '@/functions';

/** Internal Column Skeleton Component */
export const ColumnSkeleton = ({ mdcol, lgcol, children }: ColumnSkeletonProps) => {
	const getColumnCSS = (colNum: number) => {
		return `repeat(${colNum}, minmax(0, 1fr))`;
	};

	const styles = useThreadStyles({
		display: 'grid',
		gridTemplateColumns: { sm: getColumnCSS(1), md: getColumnCSS(mdcol), lg: getColumnCSS(lgcol) },
		gap: { sm: '3rem', lg: '1.5rem' },
	});
	return <div className={styles}>{children}</div>;
};
