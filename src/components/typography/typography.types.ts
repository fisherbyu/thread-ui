import { ColoredTextOptions, Prettify } from '@/types';
import { ReactNode } from 'react';

export type BaseTypographyPresentationProps = {
	/** Text alignment @default `'left'` */
	align?: 'left' | 'center';
	/** Removes bottom margin when true @default `false` */
	inline?: boolean;
	/** Truncates text to a single line with ellipsis @default `false` */
	truncate?: boolean;
};

export type ExpandedTypographyPresentationProps = Prettify<
	BaseTypographyPresentationProps & {
		/** Optionally indent text */
		indent?: boolean;
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
