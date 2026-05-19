import {
	BodyFontSizeOptions,
	FontWeightOptions,
	LetterSpacingOptions,
	LineHeightOptions,
	Prettify,
	SpacingScaleOptions,
} from '@/types';
import { TypographyProps } from '../typography.types';
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
		/** Bottom margin override @default role default (`'0.5em'`) */
		marginBottom?: SpacingScaleOptions;
	}
>;

/** Text Component Props */
export type TextProps = Prettify<
	TypographyBodyTypes & {
		indent?: boolean;
	}
>;

/** List Component Props */
export type ListProps = Prettify<
	Omit<TypographyBodyTypes, 'children' | 'inline' | 'truncate' | 'marginBottom'> & {
		/** Items to render in the list */
		items: Array<string | ReactNode>;
		/** List marker style @default `'disc'` */
		decoration?: 'disc' | 'circle' | 'square' | 'blank' | 'none';
	}
>;

/** Ordered List Component Props */
export type OrderedListProps = Prettify<Omit<ListProps, 'decoration'>>;
