import { cva } from '@/styled-system/css';
import {
	horizontalListSortingStrategy,
	rectSortingStrategy,
	verticalListSortingStrategy,
	type SortingStrategy,
} from '@dnd-kit/sortable';
import type { ReorderableLayout } from '../types/reorderable.types';

// dnd-kit sorting strategy for each layout
export const layoutStrategies: Record<ReorderableLayout, SortingStrategy> = {
	vertical: verticalListSortingStrategy,
	horizontal: horizontalListSortingStrategy,
	grid: rectSortingStrategy,
};

// Default arrangement when no wrapper is passed
export const layoutRecipe = cva({
	base: {
		display: 'flex',
		width: '100%',
		minWidth: '0',
	},
	variants: {
		layout: {
			vertical: { flexDirection: 'column' },
			horizontal: { flexDirection: 'row', overflowX: 'auto' },
			grid: { flexDirection: 'row', flexWrap: 'wrap' },
		},
	},
	defaultVariants: {
		layout: 'vertical',
	},
});
