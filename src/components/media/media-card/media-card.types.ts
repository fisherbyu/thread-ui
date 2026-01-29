import { IconNames } from '@/components/ui';
import { ImageProps, UtilitySizeOptions } from '@/types';

export type MediaCardProps = {
	description: string[];
	details?: {
		title: string;
		details: string;
	}[];
	detailsPosition?: 'left' | 'right';
	image: ImageProps;
	imagePosition: 'left' | 'right';
	links: {
		icon: IconNames;
		url: string;
	};
	size: UtilitySizeOptions;
	title: string;
};
