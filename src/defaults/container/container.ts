import { CSSProperties } from 'react';
import { useResponsiveStyles } from '../../utils';

export const CONTAINER_STYLES: CSSProperties = {
	width: '100%',
	marginRight: 'auto',
	marginLeft: 'auto',
	maxWidth: useResponsiveStyles({ sm: 'none', md: '1400px' }),
	paddingRight: '2rem',
	paddingLeft: '2rem',
};
