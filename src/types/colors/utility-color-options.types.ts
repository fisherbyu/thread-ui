import { TextColorOptions } from '../theme';

export type UtilityColorOptions = 'primary' | 'secondary' | 'tertiary' | 'black' | 'gray' | 'success' | 'error' | 'info' | 'text';
export type ColoredTextOptions = (Omit<UtilityColorOptions, 'text'> & Omit<TextColorOptions, 'secondary'>) | 'text-secondary';
