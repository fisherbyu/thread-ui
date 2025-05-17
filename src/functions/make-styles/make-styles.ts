import { css } from '@emotion/css';
import { CSSProperties } from 'react';

const translateCSSProperties = (styles: CSSProperties): string => {
	return Object.entries(styles)
		.map(([key, value]) => {
			// Convert camelCase to kebab-case
			const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
			return `${cssKey}: ${value};`;
		})
		.join('\n');
};

interface MakeStylesProps extends CSSProperties {
	hover?: CSSProperties;
}

export const makeStyles = (styles: MakeStylesProps) => {
	const { hover, ...baseProps } = styles;
	const baseStyles = translateCSSProperties(baseProps);

	return css`
		${baseStyles}
		${hover ? `&:hover { ${translateCSSProperties(hover)} }` : ''}
	`;
};
