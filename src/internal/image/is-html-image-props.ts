import { HtmlImageProps } from '../../types';

export const isHtmlImageProps = (value: any): value is HtmlImageProps => {
	return (
		typeof value === 'object' &&
		value !== null &&
		'src' in value &&
		typeof value.src === 'string' &&
		(!('alt' in value) || typeof value.alt === 'string')
	);
};
