/**
 * Props related to Element Positioning
 */
export type ElementPositioningProps = {
	position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
	top?: number | string;
	right?: number | string;
	bottom?: number | string;
	left?: number | string;
	zIndex?: number;
};
