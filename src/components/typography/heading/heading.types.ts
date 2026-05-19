import { ReactNode } from 'react';
import { TypographyProps } from '../typography.types';
import { FontFamilyOptions, Prettify } from '@/types';

/** Shared Heading Props */
export type TypographyHeadingProps = Prettify<
	TypographyProps & {
		/** Optional subtitle rendered beneath the heading */
		subtitle?: ReactNode;
	}
>;

/** Subtitle Component Props */
export type SubtitleProps = Prettify<
	TypographyProps & {
		fontFamily?: Extract<FontFamilyOptions, 'body' | 'heading'>;
		indent?: boolean;
	}
>;
