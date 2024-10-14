/**
 * Props related to Element Grid Display
 */
export type ElementGridProps = {
	display?: 'grid' | 'inline-grid' | 'none';
	gridTemplateColumns?: string;
	gridTemplateRows?: string;
	gridTemplateAreas?: string;
	gridColumnGap?: string | number;
	gridRowGap?: string | number;
	gridAutoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
	gridColumn?: string;
	gridRow?: string;
	gridArea?: string;
};
