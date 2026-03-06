import { ReactNode } from 'react';
import { LayoutComponentProps } from '../layout-component.types';

export type MasonryLayoutProps = LayoutComponentProps & {
	/** Optional title displayed above the grid */
	title?: string;
	/** Optional caption rendered alongside the title */
	caption?: string;
	/** Items to render in the masonry grid */
	items: ReactNode[];
};
