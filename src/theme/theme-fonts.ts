import { FontFamilyOptions } from '@/types';

type ThemeFonts = Record<FontFamilyOptions, `--${string}`>;

export const ThreadThemeFontOverrides: ThemeFonts = {
	heading: '--thread-font-family-heading-override',
	body: '--thread-font-family-body-override',
	mono: '--thread-font-family-mono-override',
};
