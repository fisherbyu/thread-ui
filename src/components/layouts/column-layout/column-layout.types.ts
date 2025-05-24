import { ImageProps } from '../../../types';
/**
 * Props for the ColumnLayout component
 *
 * @property {string} [title] - Optional title displayed at the top of the layout
 * @property {string} [caption] - Optional caption displayed below the title
 * @property {number} mdcol - Number of columns to display at medium viewport sizes
 * @property {number} lgcol - Number of columns to display at large viewport sizes
 * @property {ColumnItem[]} items - Array of items to display in the grid
 */
export type ColumnLayoutProps = {
	title?: string;
	caption?: string;
	mdcol: number;
	lgcol: number;
	items: ColumnItem[];
};

/**
 * Represents an item to be displayed in the column layout
 *
 * @property {string} [title] - Optional title for the item
 * @property {string} [description] - Optional description text for the item
 * @property {Object|ReactNode} content - Content to display for the item
 * @property {string} [content.src] - Source URL for image content (when content is an image)
 * @property {string} [content.alt] - Alt text for image content (when content is an image)
 */
export type ColumnItem = {
	title?: string;
	description?: string;
	content: ImageProps;
};
