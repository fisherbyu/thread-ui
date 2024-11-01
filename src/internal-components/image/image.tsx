import React, { ImgHTMLAttributes, ReactNode } from 'react';
import { ImageProps } from './image.types';

// Check for Next.js Image at module level
let NextImage: any = null;
if (typeof window !== 'undefined') {
	try {
		NextImage = require('next/image').default;
	} catch {
		NextImage = null;
	}
}

// Create the Image component that defaults to 'img' if Next.js is unavailable
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(({ src, alt, layout, priority, ...props }, ref) => {
	// If Next.js Image is available
	if (NextImage) {
		return <NextImage src={src} alt={alt} layout={layout} priority={priority} {...props} />;
	}

	// Fallback to regular img for non-Next.js projects
	return <img src={src} alt={alt} ref={ref} {...props} />;
});

Image.displayName = 'Image';
