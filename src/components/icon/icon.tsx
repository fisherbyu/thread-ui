import React from 'react';
import * as TablerIcons from '@tabler/icons-react';
import { IconProps } from './icon.types';
import { useTheme } from '../../utils/styling/coloring/theme-provider';

export const Icon: React.FC<IconProps> = ({ name, color, size = 24, filled = false }) => {
	const theme = useTheme();
	const IconComponent = TablerIcons[name] as React.ComponentType<{ color?: string; size?: number; style?: React.CSSProperties }>;

	return <IconComponent color={theme[color]} size={size} style={{ fill: filled ? color : 'none' }} />;
};
