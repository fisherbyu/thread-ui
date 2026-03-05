import { GridLayoutProps } from './grid-layout.types';
import { gridLayoutStyles } from './grid-layout-styles';
import { ConditionalWrapper } from '@/internal-components';
import { Container } from '../container';

/**
 * CSS grid layout with responsive column counts, configurable gap, and alignment controls.
 *
 * @example
 * <GridLayout cols={{ base: 1, md: 2, lg: 3 }} gap="md">
 *   <Card />
 *   <Card />
 *   <Card />
 * </GridLayout>
 */
export const GridLayout = ({
	cols,
	gap = 'md',
	align,
	justify,
	tighten,
	children,
	container = true,
}: GridLayoutProps) => {
	const baseCols = typeof cols === 'number' ? cols : cols.base;
	const mdCols = typeof cols === 'number' ? undefined : cols.md;
	const lgCols = typeof cols === 'number' ? undefined : cols.lg;

	const isNumericGap = typeof gap === 'number';

	const wrapper = container ? Container : 'fragment';
	const wrapperProps = typeof container === 'object' ? container : {};

	return (
		<ConditionalWrapper wrapper={wrapper} wrapperProps={wrapperProps}>
			<div
				className={gridLayoutStyles({
					cols: baseCols,
					mdCols,
					lgCols,
					align,
					justify,
					gap: isNumericGap || tighten ? undefined : gap,
					tightenedGap: !isNumericGap && tighten ? gap : undefined,
				})}
				style={isNumericGap ? { gap: `${gap * 4}px` } : undefined}
			>
				{children}
			</div>
		</ConditionalWrapper>
	);
};
