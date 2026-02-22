import { ReactNode } from 'react';

export type MasonryLayoutProps = {
	/** Optional title displayed above the grid */
	title?: string;
	/** Optional caption rendered alongside the title */
	caption?: string;
	/** Items to render in the masonry grid */
	components: ReactNode[];
};
