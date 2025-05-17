import { css } from '@emotion/css';
import { CSSProperties } from 'react';

export const makeStyles = (styles: CSSProperties) => {
	return css`
		${Object.entries(styles)
			.map(([key, value]) => {
				// Convert camelCase to kebab-case
				const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
				return `${cssKey}: ${value};`;
			})
			.join('\n')}
	`;
};
