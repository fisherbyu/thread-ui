import { ReactElement } from 'react';
import { IconNames } from '@/components/ui';
import { ImageProps, UtilitySizeOptions } from '@/types';

type MediaLink =
	| {
			iconName: IconNames;
			url: string;
	  }
	| ReactElement;

export type MediaCardProps = {
	description: string[];
	details?: {
		title: string;
		details: string;
	}[];
	detailsPosition?: 'left' | 'right';
	image: ImageProps;
	imagePosition?: 'left' | 'right';
	links: MediaLink[];
	size?: UtilitySizeOptions;
	title: string;
};
