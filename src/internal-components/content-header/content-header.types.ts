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

type SubtitleElement = ReactElement<SubtitleProps, typeof Subtitle>;

type TitleType = string | HeadingElement;
type SubtitleType = string | SubtitleElement;

export type ContentTitle = {
	/** Optional Title */
	title?: TitleType;
	/** Optional Subtitle, requires `title` to be set as string */
	subtitle?: SubtitleType;
};

export type ContentHeaderProps = Prettify<ContentTitle & { secondaryContent?: ReactNode }>;
