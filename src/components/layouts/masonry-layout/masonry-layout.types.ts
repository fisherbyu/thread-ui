import { ReactNode } from 'react';
import { LayoutComponentProps } from '../layout-component.types';
import { Prettify } from '@/types';
import { ContentHeading } from '@/internal-components';

export type MasonryLayoutProps = Prettify<
	LayoutComponentProps &
		ContentHeading & {
			/** Items to render in the masonry grid */
			items: ReactNode[];
		}
>;
