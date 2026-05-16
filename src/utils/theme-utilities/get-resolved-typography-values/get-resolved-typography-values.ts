import { TypographyRole, TypographyRoles } from '@/theme/theme-typography-system';
import {
	CompleteFontSizeOptions,
	FontFamilyOptions,
	FontWeightOptions,
	LetterSpacingOptions,
	LineHeightOptions,
	TypographyMarginOptions,
	TypographyRoleOptions,
} from '@/types';

type GetResolvedTypographyValuesProps = {
	role: TypographyRoleOptions;
	fontFamily?: FontFamilyOptions;
	fontSize?: CompleteFontSizeOptions;
	fontWeight?: FontWeightOptions;
	lineHeight?: LineHeightOptions;
	letterSpacing?: LetterSpacingOptions;
	marginBottomRatio?: TypographyMarginOptions;
};

export const getResolvedTypographyValues = ({
	role,
	fontFamily,
	fontSize,
	fontWeight,
	lineHeight,
	letterSpacing,
	marginBottomRatio,
}: GetResolvedTypographyValuesProps): TypographyRole => {
	const defaults = TypographyRoles[role];

	return {
		fontFamily: fontFamily ?? defaults.fontFamily,
		fontSize: fontSize ?? defaults.fontSize,
		fontWeight: fontWeight ?? defaults.fontWeight,
		lineHeight: lineHeight ?? defaults.lineHeight,
		letterSpacing: letterSpacing ?? defaults.letterSpacing,
		marginBottomRatio: marginBottomRatio ?? defaults.marginBottomRatio,
	};
};
