import { GridLayoutProps } from './grid-layout.types';
import { gridLayoutStyles } from './grid-layout-styles';

export const GridLayout = ({ cols, gap, align, justify, children }: GridLayoutProps) => {
	const baseCols = typeof cols === 'number' ? cols : cols.base;
	const mdCols = typeof cols === 'number' ? undefined : cols.md;
	const lgCols = typeof cols === 'number' ? undefined : cols.lg;

	return (
		<div className={gridLayoutStyles({ cols: baseCols, mdCols, lgCols, align, justify })}>
			{children}
		</div>
	);
};
