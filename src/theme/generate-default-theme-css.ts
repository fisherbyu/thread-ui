import { ThemeConfigFull } from '@/types/theme/theme.types';
import { DefaultThreadThemeConfig } from './default-thread-theme-config';

export const generateDefaultThemeCss = <T>(defaultTheme: T) => {};

const css = generateDefaultThemeCss<ThemeConfigFull>(DefaultThreadThemeConfig);
