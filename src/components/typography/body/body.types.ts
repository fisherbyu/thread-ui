import {
	BodyFontSizeOptions,
	FontFamilyOptions,
	FontWeightOptions,
	LetterSpacingOptions,
	LineHeightOptions,
	Prettify,
} from '@/types';
import { MarginBottomOption, TypographyProps } from '../typography.types';
import { ReactNode } from 'react';

/** Shared Body Text Props */
export type TypographyBodyTypes = Prettify<
	TypographyProps & {
		/** Font size — body scale only @default `'md'` */
		size?: BodyFontSizeOptions;
		/** Font weight override @default role default (`'regular'`) */
		weight?: FontWeightOptions;
		/** Line height override @default role default (`'normal'`) */
		lineHeight?: LineHeightOptions;
		/** Letter spacing override @default role default (`'normal'`) */
		letterSpacing?: LetterSpacingOptions;
		/** Bottom margin — `true` derives a spacing token from `size`, or pass a spacing token. No effect when `as` is `'span'` @default `false` */
		marginBottom?: MarginBottomOption;
	}
>;

/** Text Component Props */
export type TextProps = Prettify<
	TypographyBodyTypes & {
		/** Element to render. `'span'` flows inline, and ignores `align`, `indent`, and `marginBottom` outside a flex or grid parent @default `'p'` */
		as?: 'p' | 'span';
		/** Indents the first line. No effect when `as` is `'span'` outside a flex or grid parent */
		indent?: boolean;
		fontFamily?: Exclude<FontFamilyOptions, 'heading'>;
		underline?: boolean;
	}
>;

/** List Component Props */
export type ListProps = Prettify<
	Omit<TypographyBodyTypes, 'children' | 'truncate' | 'marginBottom'> & {
		/** Items to render in the list */
		items: Array<string | ReactNode>;
		/** List marker style @default `'disc'` */
		decoration?: 'disc' | 'circle' | 'square' | 'blank' | 'none';
	}
>;

/** Ordered List Component Props */
export type OrderedListProps = Prettify<Omit<ListProps, 'decoration'>>;
