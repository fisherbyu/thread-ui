import * as TablerIcons from '@tabler/icons-react';
import { BaseColors, StatusColors } from '../../types';
export type IconNames = keyof typeof TablerIcons;

export type IconSizes = 8 | 12 | 16 | 24 | 32 | 48 | 64;

export type IconProps = {
	name: IconNames;
	size: IconSizes;
	color: BaseColors | StatusColors;
	filled?: boolean;
};
