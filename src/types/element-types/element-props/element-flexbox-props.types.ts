/**
 * Props related to Element Flexbox display
 */
export type ElementFlexboxProps = {
	display?: 'flex' | 'inline-flex' | 'none';
	flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
	flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
	justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
	alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
	alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
};
