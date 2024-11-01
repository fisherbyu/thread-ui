import { ImgHTMLAttributes } from 'react';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	alt: string;
	layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive'; // Next.js specific
	priority?: boolean; // Next.js specific
}
