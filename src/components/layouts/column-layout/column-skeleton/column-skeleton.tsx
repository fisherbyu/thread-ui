import { cva } from '@/styled-system/css';
import { ColumnSkeletonProps } from './column-skeleton.types';

const gridStyles = cva({
	base: {
		display: 'grid',
		gap: { base: '12', lg: '6' },
	},
	variants: {
		mdcol: {
			1: { gridTemplateColumns: { md: 'repeat(1, minmax(0, 1fr))' } },
			2: { gridTemplateColumns: { md: 'repeat(2, minmax(0, 1fr))' } },
			3: { gridTemplateColumns: { md: 'repeat(3, minmax(0, 1fr))' } },
		},
		lgcol: {
			1: { gridTemplateColumns: { lg: 'repeat(1, minmax(0, 1fr))' } },
			2: { gridTemplateColumns: { lg: 'repeat(2, minmax(0, 1fr))' } },
			3: { gridTemplateColumns: { lg: 'repeat(3, minmax(0, 1fr))' } },
			4: { gridTemplateColumns: { lg: 'repeat(4, minmax(0, 1fr))' } },
			5: { gridTemplateColumns: { lg: 'repeat(5, minmax(0, 1fr))' } },
			6: { gridTemplateColumns: { lg: 'repeat(6, minmax(0, 1fr))' } },
		},
	},
	defaultVariants: {
		mdcol: 2,
		lgcol: 3,
	},
});

/** Internal Column Skeleton Component */
export const ColumnSkeleton = ({ mdcol, lgcol = mdcol, children }: ColumnSkeletonProps) => {
	return <div className={gridStyles({ mdcol, lgcol })}>{children}</div>;
};
