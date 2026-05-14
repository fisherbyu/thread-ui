import type { SkeletonLayoutLoaderProps } from './skeleton-layout.types';
import { SkeletonLoader } from '../skeleton/skeleton';
import { ColumnItem, ColumnLayout } from '@/components/layouts';

/**
 * Renders a grid of SkeletonLoader placeholders using ColumnLayout.
 * Total items rendered = `lgcol * rows`.
 *
 * @example
 * <SkeletonLayoutLoader
 *   lgcol={3}
 *   mdcol={2}
 *   rows={4}
 *   itemConfig={{ w: '100%', h: '120px' }}
 * />
 */
export const SkeletonLayoutLoader = ({
	itemConfig,
	mdcol,
	lgcol = mdcol,
	rows = 3,
}: SkeletonLayoutLoaderProps) => {
	const itemCount = lgcol * rows;

	const items: ColumnItem[] = [...Array(itemCount)].map((_, i) => ({
		content: <SkeletonLoader key={i} {...itemConfig} />,
	}));

	return <ColumnLayout mdcol={mdcol} lgcol={lgcol} items={items} />;
};
