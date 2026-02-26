import { ImageProps } from '../../../types';

export type ColumnLayoutProps = {
	/** Optional title displayed at the top of the layout */
	title?: string;
	/** Optional caption rendered alongside the title */
	caption?: string;
	/** Number of columns at medium viewport sizes @default `2` */
	mdcol: 1 | 2 | 3;
	/** Number of columns at large viewport sizes @default `4` */
	lgcol?: 1 | 2 | 3 | 4 | 5;
	/** Items to display in the grid */
	items: ColumnItem[];
};

export type ColumnItem = {
	/** Optional title rendered below the image */
	title?: string;
	/** Optional description rendered below the title */
	description?: string;
	/** Image to display in the column */
	content: ImageProps;
};
