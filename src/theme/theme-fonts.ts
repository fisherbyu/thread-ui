import { FontFamilyOptions } from '@/types';

type ThemeFonts = Record<FontFamilyOptions, `--${string}`>;

export const ThemeFontOverrides: ThemeFonts = {
	heading: '--font-heading',
	body: '--font-body',
	mono: '--font-mono',
};
