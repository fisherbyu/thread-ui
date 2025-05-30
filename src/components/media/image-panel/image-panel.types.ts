import { ImageProps, ColoredTextOptions } from '@/types';

export type ImagePanelProps = {
	title: string;
	subtitle?: string;
	contents?: string[];
	image: ImageProps;
	smImage?: ImageProps;
	contentBelow?: boolean;
	contentLeft?: boolean;
	titleColor?: ColoredTextOptions;
};
