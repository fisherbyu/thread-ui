import { ColumnSkeletonProps } from './column-skeleton.types';

export const ColumnSkeleton = ({ mdcol, lgcol, children }: ColumnSkeletonProps) => {
	const mdColMapping = {
		1: 'md:thread-grid-cols-1',
		2: 'md:thread-grid-cols-2',
		3: 'md:thread-grid-cols-3',
		4: 'md:thread-grid-cols-4',
		5: 'md:thread-grid-cols-5',
		6: 'md:thread-grid-cols-6',
	};
	const lgColMapping = {
		1: 'lg:thread-grid-cols-1',
		2: 'lg:thread-grid-cols-2',
		3: 'lg:thread-grid-cols-3',
		4: 'lg:thread-grid-cols-4',
		5: 'lg:thread-grid-cols-5',
		6: 'lg:thread-grid-cols-6',
		7: 'lg:thread-grid-cols-7',
		8: 'lg:thread-grid-cols-8',
		9: 'lg:thread-grid-cols-9',
		10: 'lg:thread-grid-cols-10',
		11: 'lg:thread-grid-cols-11',
		12: 'lg:thread-grid-cols-12',
	};
	return (
		<div
			className={`thread-grid thread-grid-cols-1 md:thread-grid-cols-${mdcol} lg:thread-grid-cols-${lgcol} thread-gap-12 lg:thread-gap-6`}
		>
			{children}
		</div>
	);
};
