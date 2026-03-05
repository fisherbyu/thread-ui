import { GridLayoutProps } from './grid-layout.types';
import { gridLayoutStyles } from './grid-layout-styles';

export const GridLayout = ({
	cols,
	gap = 'md',
	align,
	justify,
	tighten,
	children,
}: GridLayoutProps) => {
	const baseCols = typeof cols === 'number' ? cols : cols.base;
	const mdCols = typeof cols === 'number' ? undefined : cols.md;
	const lgCols = typeof cols === 'number' ? undefined : cols.lg;

	const isNumericGap = typeof gap === 'number';

	return (
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
	);
};
