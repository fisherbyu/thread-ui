import type { SkeletonLayoutProps } from './skeleton-layout.types';
import { Skeleton } from '../skeleton/skeleton';
import { ColumnItem, ColumnLayout } from '@/components/layouts';

/**
 * Renders a grid of Skeleton placeholders using ColumnLayout.
 * Total items rendered = `lgcol * rows`.
 *
 * @example
 * <SkeletonLayout
 *   lgcol={3}
 *   mdcol={2}
 *   rows={4}
 *   itemConfig={{ w: '100%', h: '120px' }}
 * />
 */
export const SkeletonLayout = ({ itemConfig, lgcol, mdcol, rows = 3 }: SkeletonLayoutProps) => {
	const itemCount = lgcol * rows;

	const items: ColumnItem[] = [...Array(itemCount)].map((_, i) => ({
		content: <Skeleton key={i} {...itemConfig} />,
	}));

	return <ColumnLayout mdcol={mdcol} lgcol={lgcol} items={items} />;
};
