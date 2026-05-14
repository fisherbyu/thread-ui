import { ColumnLayoutProps } from '@/components/layouts';
import { SkeletonLoaderProps } from '../skeleton/skeleton.types';

export type SkeletonLayoutLoaderProps = Omit<ColumnLayoutProps, 'title' | 'caption' | 'items'> & {
	/** Configuration passed to each individual Skeleton item */
	itemConfig: SkeletonLoaderProps;
	/** Number of rows to render. Total items = `lgcol * rows` @default 3 */
	rows?: number;
};
