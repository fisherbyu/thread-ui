import { ImageProps } from '../../types';

export type PhotoCardProps = {
	image: ImageProps;
	title?: string;
	caption?: string;
	photographer?: string;
	camera?: string;
	lense?: string;
	location?: string;
};
