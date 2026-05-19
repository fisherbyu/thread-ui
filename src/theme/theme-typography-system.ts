import {
	CompleteFontSizeOptions,
	FontFamilyOptions,
	FontWeightOptions,
	LetterSpacingOptions,
	LineHeightOptions,
	SpacingScaleOptions,
	TypographyRoleOptions,
} from '@/types';

export type TypographyRole = {
	fontFamily: FontFamilyOptions;
	fontSize: CompleteFontSizeOptions;
	fontWeight: FontWeightOptions;
	lineHeight: LineHeightOptions;
	letterSpacing: LetterSpacingOptions;
	marginBottom: SpacingScaleOptions;
};

export const TypographyRoles: Record<TypographyRoleOptions, TypographyRole> = {
	title: {
		fontFamily: 'heading',
		fontSize: 'heading.xl',
		fontWeight: 'bold',
		lineHeight: 'tight',
		letterSpacing: 'tight',
		marginBottom: 'xxl',
	},
	h1: {
		fontFamily: 'heading',
		fontSize: 'heading.lg',
		fontWeight: 'bold',
		lineHeight: 'tight',
		letterSpacing: 'normal',
		marginBottom: 'xl',
	},
	h2: {
		fontFamily: 'heading',
		fontSize: 'heading.md',
		fontWeight: 'bold',
		lineHeight: 'tight',
		letterSpacing: 'normal',
		marginBottom: 'lg',
	},
	h3: {
		fontFamily: 'heading',
		fontSize: 'heading.sm',
		fontWeight: 'bold',
		lineHeight: 'tight',
		letterSpacing: 'normal',
		marginBottom: 'md',
	},
	body: {
		fontFamily: 'body',
		fontSize: 'body.md',
		fontWeight: 'regular',
		lineHeight: 'normal',
		letterSpacing: 'normal',
		marginBottom: 'sm',
	},
	code: {
		fontFamily: 'mono',
		fontSize: 'body.sm',
		fontWeight: 'regular',
		lineHeight: 'normal',
		letterSpacing: 'normal',
		marginBottom: 'none',
	},
};
