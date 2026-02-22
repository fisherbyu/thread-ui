import * as PhosphorIcons from '@phosphor-icons/react';
import { UtilityColorOptions } from '../../../types';

export type IconNames = keyof typeof PhosphorIcons;
export type IconSizes = 8 | 12 | 16 | 24 | 32 | 48 | 64;

export type IconProps = {
	/** Phosphor icon name */
	name: IconNames;
	/** Icon size in pixels @default `24` */
	size: IconSizes;
	/** Icon color mapped to utility color tokens */
	color?: UtilityColorOptions;
	/** Icon stroke weight @default `'regular'` */
	weight?: 'light' | 'regular' | 'bold';
	/** Renders the filled variant of the icon @default `false` */
	filled?: boolean;
};
