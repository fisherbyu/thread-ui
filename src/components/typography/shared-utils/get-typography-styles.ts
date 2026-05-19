import { cva } from '@/styled-system/css';
import { TypographyRole } from '@/theme/theme-typography-system';
import { ResolvedTypographyValuesProps } from '@/utils';

/** Typography CVA — map individual token keys to style declarations. */
const getTypographyStylesCva = cva({
	variants: {
		fontFamily: {
			body: { fontFamily: 'body' },
			heading: { fontFamily: 'heading' },
			mono: { fontFamily: 'mono' },
		},
		fontSize: {
			'heading.sm': { fontSize: 'heading.sm' },
			'heading.md': { fontSize: 'heading.md' },
			'heading.lg': { fontSize: 'heading.lg' },
			'heading.xl': { fontSize: 'heading.xl' },
			'body.xxs': { fontSize: 'body.xxs' },
			'body.xs': { fontSize: 'body.xs' },
			'body.sm': { fontSize: 'body.sm' },
			'body.md': { fontSize: 'body.md' },
			'body.lg': { fontSize: 'body.lg' },
			'body.xl': { fontSize: 'body.xl' },
		},
		fontWeight: {
			regular: { fontWeight: 'regular' },
			medium: { fontWeight: 'medium' },
			semibold: { fontWeight: 'semibold' },
			bold: { fontWeight: 'bold' },
		},
		lineHeight: {
			tighter: { lineHeight: 'tighter' },
			tight: { lineHeight: 'tight' },
			normal: { lineHeight: 'normal' },
			loose: { lineHeight: 'loose' },
			looser: { lineHeight: 'looser' },
		},
		letterSpacing: {
			tight: { letterSpacing: 'tight' },
			normal: { letterSpacing: 'normal' },
			wide: { letterSpacing: 'wide' },
		},
		marginBottom: {
			none: { marginBottom: 'none' },
			xxs: { marginBottom: 'xxs' },
			xs: { marginBottom: 'xs' },
			sm: { marginBottom: 'sm' },
			md: { marginBottom: 'md' },
			lg: { marginBottom: 'lg' },
			xl: { marginBottom: 'xl' },
			xxl: { marginBottom: 'xxl' },
		},
	},
});

export const getTypographyStyles = (props: TypographyRole) => {
	return getTypographyStylesCva(props);
};
