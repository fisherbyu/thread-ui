import { ReactNode } from 'react';
import { LayoutComponentProps, ResponsiveValue } from '../layout-component.types';
import type { SystemStyleObject } from '@pandacss/dev';
import type { UtilitySizeOptions } from '@/types';
import { ConditionalValue } from '@/styled-system/types';
import { Property } from '@/styled-system/types/csstype';

type ColCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type SimpleAlignItems = 'start' | 'end' | 'center' | 'stretch';

export type GridLayoutProps = LayoutComponentProps & {
	/** Number of columns, responsive-aware. e.g. 3 or { base: 1, md: 2, lg: 3 } */
	cols: ResponsiveValue<ColCount>;
	/** Row count, rarely needed but supported */
	rows?: ResponsiveValue<number>;
	/** Gap shorthand, or use colGap/rowGap for separate control */
	gap?:
		| ResponsiveValue<UtilitySizeOptions>
		| {
				colGap: ResponsiveValue<string | number>;
				rowGap: ResponsiveValue<string | number>;
		  };

	/** Alignment */
	align?: SimpleAlignItems;
	justify?: SimpleAlignItems;

	children?: ReactNode;
};
