import { ReactElement, ReactNode } from 'react';
import { Title, H1, H2, H3, Subtitle } from '@/components/typography/';
import {
	TypographyHeadingProps,
	SubtitleProps,
} from '@/components/typography/heading/heading.types';
import { Prettify } from '@/types';

type HeadingElement = ReactElement<
	TypographyHeadingProps,
	typeof Title | typeof H1 | typeof H2 | typeof H3
>;

/** Accepted title values: a plain string or a Thread UI heading element */
type TitleType = string | HeadingElement;

/**
 * Title/subtitle pair used by content and layout components.
 *
 * When `title` is a string, the component renders it as an `H2` and
 * applies the `subtitle` prop automatically. When `title` is a heading
 * element, the consumer owns subtitle rendering and the `subtitle` prop
 * is ignored.
 */
export type ContentTitle = {
	/** Optional title displayed above the content */
	title?: TitleType;
	/** Optional subtitle, requires `title` to be set as a string */
	subtitle?: string;
};

export type ContentHeaderProps = Prettify<
	ContentTitle & {
		/** Optional content rendered on the trailing end of the header */
		secondaryContent?: ReactNode;
		/** Optional Override styles, applied on outer container */
		className?: string;
	}
>;
