import { ReactNode } from 'react';
import { MarginBottomOption, TypographyProps } from '../typography.types';
import { FontFamilyOptions, Prettify } from '@/types';

/** Shared Heading Props */
export type TypographyHeadingProps = Prettify<
	TypographyProps & {
		/** Optional subtitle rendered beneath the heading */
		subtitle?: ReactNode;
		/** Bottom margin — `true` uses the role default, `false` removes it, or pass a spacing token. Applies to the `hgroup` when `subtitle` is set @default `true` */
		marginBottom?: MarginBottomOption;
	}
>;

/** Subtitle Component Props */
export type SubtitleProps = Prettify<
	TypographyProps & {
		fontFamily?: Extract<FontFamilyOptions, 'body' | 'heading'>;
		indent?: boolean;
	}
>;
