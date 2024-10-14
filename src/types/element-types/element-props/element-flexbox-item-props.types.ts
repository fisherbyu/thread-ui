/**
 * Props related to Flexbox Element Items (children of Flexbox container)
 */
export type ElementFlexboxItemProps = {
	order?: number;
	flexGrow?: number;
	flexShrink?: number;
	flexBasis?: string | number;
	alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
};
