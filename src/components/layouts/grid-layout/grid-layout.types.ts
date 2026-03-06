import { ReactNode } from 'react';
import { LayoutComponentProps, ResponsiveValue } from '../layout-component.types';
import type { UtilitySizeOptions } from '@/types';

type ColCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type SimpleAlignItems = 'start' | 'end' | 'center' | 'stretch';

export type GridLayoutProps = LayoutComponentProps & {
	/** Number of columns. Accepts a static count or a responsive object @example `3` or `{ base: 1, md: 2, lg: 3 }` */
	cols: ResponsiveValue<ColCount>;
	/** Row count, rarely needed but supported */
	rows?: ResponsiveValue<number>;
	/** Gap between cells. Accepts a size token or a numeric multiplier (multiplied by 4px) @default `'md'` */
	gap?: number | UtilitySizeOptions;
	/** Reduces the gap to a tighter variant of the current size token */
	tighten?: boolean;
	/** Vertical alignment of grid items @default `'center'` */
	align?: SimpleAlignItems;
	/** Horizontal justification of grid items @default `'center'` */
	justify?: SimpleAlignItems;
	/** Grid Content */
	children?: ReactNode;
};
