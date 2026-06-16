import { FontFamilyOptions } from '@/types';
import { ThreadTheme } from './thread-theme';

type ThemeFonts = Record<FontFamilyOptions, `--${string}`>;

export const ThreadThemeFontOverrides: ThemeFonts = {
	heading: '--thread-font-family-heading-override',
	body: '--thread-font-family-body-override',
	mono: '--thread-font-family-mono-override',
};
