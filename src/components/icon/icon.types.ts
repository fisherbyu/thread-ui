import * as PhosphorIcons from '@phosphor-icons/react';
import { UtilityColorOptions } from '../../types/colors/utility-color-options.types';

export type IconNames = keyof typeof PhosphorIcons;
export type IconSizes = 8 | 12 | 16 | 24 | 32 | 48 | 64;

export type IconProps = {
	name: IconNames;
	size: IconSizes;
	color: UtilityColorOptions;
	weight?: 'light' | 'regular' | 'bold';
	square?: boolean;
	filled?: boolean;
};
