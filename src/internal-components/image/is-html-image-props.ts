import { HtmlImageProps } from '../../types';

export const isHtmlImageProps = (value: any): value is HtmlImageProps => {
	return (
		typeof value === 'object' &&
		value !== null &&
		'src' in value &&
		'alt' in value &&
		typeof value.src === 'string' &&
		typeof value.alt === 'string'
	);
};
