import { ColumnLayoutProps } from '@/components/layouts';
import { SkeletonProps } from '../skeleton/skeleton.types';

export type SkeletonLayoutProps = Omit<ColumnLayoutProps, 'title' | 'caption' | 'items'> & {
	/** Configuration passed to each individual Skeleton item */
	itemConfig: SkeletonProps;
	/** Number of rows to render. Total items = `lgcol * rows` @default 3 */
	rows?: number;
};
