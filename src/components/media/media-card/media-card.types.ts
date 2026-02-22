import { ReactElement } from 'react';
import { IconNames } from '@/components/ui';
import { ImageProps, UtilitySizeOptions } from '@/types';

/** An icon link or a custom React element rendered in the links row */
type MediaLink =
	| {
			/** Named icon to display */
			iconName: IconNames;
			/** URL the icon links to */
			url: string;
	  }
	| ReactElement;

export type MediaCardProps = {
	/** Body text paragraphs rendered in the description column */
	description: string[];
	/** Key/value pairs displayed as labeled details */
	details?: {
		/** Detail label */
		title: string;
		/** Detail value */
		details: string;
	}[];
	/** Whether details render in the image column or the text column @default `'text'` */
	detailsPosition?: 'text' | 'image';
	/** Card image */
	image: ImageProps;
	/** Side the image appears on at large viewports @default `'left'` */
	imagePosition?: 'left' | 'right';
	/** Links rendered below the image as icons or custom elements */
	links: MediaLink[];
	/** Controls the max width of the card @default `'md'` */
	size?: UtilitySizeOptions;
	/** Card heading */
	title: string;
};
