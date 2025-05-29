import { TextColorOptions } from '../theme';

export type UtilityColorOptions = 'primary' | 'secondary' | 'tertiary' | 'black' | 'gray' | 'success' | 'error' | 'info' | 'text';
export type ColoredTextOptions = Exclude<UtilityColorOptions, 'text'> | 'standard' | 'disabled' | 'accent' | 'text-secondary';
