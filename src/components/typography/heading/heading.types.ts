import { ReactNode } from 'react';
import { TypographyProps } from '../typography.types';
import { Prettify } from '@/types';

/** Shared Heading Props */
export type TypographyHeadingProps = Prettify<
	TypographyProps & {
		/** Optional subtitle rendered beneath the heading */
		subtitle?: ReactNode;
	}
>;
