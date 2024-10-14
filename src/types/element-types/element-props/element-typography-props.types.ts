import { BaseColors } from '../../color-types/color-names.types';

/**
 * Props related to Element Typography and Font
 */
export type ElementTypographyProps = {
	fontColor: BaseColors;
	fontFamily?: string;
	fontSize?: number | string;
	fontStyle?: 'normal' | 'italic' | 'oblique';
	fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
	lineHeight?: number | string;
	letterSpacing?: number | string;
	textAlign?: 'left' | 'right' | 'center' | 'justify';
	textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
	textDecoration?: 'none' | 'underline' | 'overline' | 'line-through';
	textOverflow?: 'clip' | 'ellipsis';
	whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line';
	wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
	wordSpacing?: number | string;
};
