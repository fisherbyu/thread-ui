import {
	CompleteFontSizeOptions,
	FontFamilyOptions,
	FontWeightOptions,
	LetterSpacingOptions,
	LineHeightOptions,
	TypographyMarginOptions,
	TypographyRoleOptions,
} from '@/types';

export type TypographyRole = {
	fontFamily: FontFamilyOptions;
	fontSize: CompleteFontSizeOptions;
	fontWeight: FontWeightOptions;
	lineHeight: LineHeightOptions;
	letterSpacing: LetterSpacingOptions;
	marginBottom: TypographyMarginOptions;
};

export const TypographyRoles: Record<TypographyRoleOptions, TypographyRole> = {
	title: {
		fontFamily: 'heading',
		fontSize: 'heading.xl',
		fontWeight: 'bold',
		lineHeight: 'tight',
		letterSpacing: 'tight',
		marginBottom: '0.75em',
	},
	h1: {
		fontFamily: 'heading',
		fontSize: 'heading.lg',
		fontWeight: 'semibold',
		lineHeight: 'tight',
		letterSpacing: 'normal',
		marginBottom: '0.75em',
	},
	h2: {
		fontFamily: 'heading',
		fontSize: 'heading.md',
		fontWeight: 'semibold',
		lineHeight: 'tight',
		letterSpacing: 'normal',
		marginBottom: '0.75em',
	},
	h3: {
		fontFamily: 'heading',
		fontSize: 'heading.sm',
		fontWeight: 'semibold',
		lineHeight: 'tight',
		letterSpacing: 'normal',
		marginBottom: '0.75em',
	},
	body: {
		fontFamily: 'body',
		fontSize: 'body.md',
		fontWeight: 'regular',
		lineHeight: 'normal',
		letterSpacing: 'normal',
		marginBottom: '0.75em',
	},
	code: {
		fontFamily: 'mono',
		fontSize: 'body.sm',
		fontWeight: 'regular',
		lineHeight: 'normal',
		letterSpacing: 'normal',
		marginBottom: '0',
	},
};
