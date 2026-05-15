import {
	CompleteFontSizeOptions,
	FontFamilyOptions,
	FontWeightOptions,
	LetterSpacingOptions,
	LineHeightOptions,
	TypographyRoleOptions,
} from '@/types';

export type TypographyRole = {
	fontFamily: FontFamilyOptions;
	fontSize: CompleteFontSizeOptions;
	fontWeight: FontWeightOptions;
	lineHeight: LineHeightOptions;
	letterSpacing: LetterSpacingOptions;
};

export const TypographyRoles: Record<TypographyRoleOptions, TypographyRole> = {
	title: {
		fontFamily: 'heading',
		fontSize: 'heading.xl',
		fontWeight: 'bold',
		lineHeight: 'tight',
		letterSpacing: 'tight',
	},
	h1: {
		fontFamily: 'heading',
		fontSize: 'heading.lg',
		fontWeight: 'semibold',
		lineHeight: 'tight',
		letterSpacing: 'normal',
	},
	h2: {
		fontFamily: 'heading',
		fontSize: 'heading.md',
		fontWeight: 'semibold',
		lineHeight: 'tight',
		letterSpacing: 'normal',
	},
	h3: {
		fontFamily: 'heading',
		fontSize: 'heading.sm',
		fontWeight: 'semibold',
		lineHeight: 'tight',
		letterSpacing: 'normal',
	},
	body: {
		fontFamily: 'body',
		fontSize: 'body.md',
		fontWeight: 'regular',
		lineHeight: 'normal',
		letterSpacing: 'normal',
	},
	code: {
		fontFamily: 'mono',
		fontSize: 'body.sm',
		fontWeight: 'regular',
		lineHeight: 'normal',
		letterSpacing: 'normal',
	},
};
