import { ColoredTextOptions, Prettify, SpacingScaleOptions } from '@/types';
import { ReactNode } from 'react';

/** Bottom margin option — `true` for the component's default, `false` for none, or a spacing token */
export type MarginBottomOption = boolean | SpacingScaleOptions;

/** Test Display Options */
type TypographyDisplayOptions = 'block' | 'inline-block';

export type BaseTypographyPresentationProps = {
	/** Text alignment @default `'left'` */
	align?: 'left' | 'center';
	/** Truncates text to a single line with ellipsis @default `false` */
	truncate?: boolean;
};

export type ExpandedTypographyPresentationProps = Prettify<
	BaseTypographyPresentationProps & {
		/** Optionally indent text */
		indent?: boolean;
		/** Optionally underline text */
		underline?: boolean;
		/** Display override set internally by components, not exposed as a prop */
		display?: TypographyDisplayOptions;
	}
>;

/** Shared Typography Props */
export type TypographyProps = Prettify<
	BaseTypographyPresentationProps & {
		/** Content */
		children: ReactNode;
		/** Text color variant @default `'standard'` */
		color?: ColoredTextOptions;
	}
>;
