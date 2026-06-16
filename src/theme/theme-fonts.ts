import { FontFamilyOptions } from '@/types';

type ThemeFonts = Record<FontFamilyOptions, `--${string}`>;

export const ThreadThemeFontOverrides: ThemeFonts = {
	heading: '--font-heading',
	body: '--font-body',
	mono: '--font-mono',
};
