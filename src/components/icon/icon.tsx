import React from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';
import { IconProps } from './icon.types';
import { getUtilityColorValue, useTheme } from '../../utils';
export const Icon: React.FC<IconProps> = ({ name, color, size = 24, filled = false }) => {
	const theme = useTheme();

	const IconComponent = PhosphorIcons[name] as React.ComponentType<{ color?: string; size?: number; style?: React.CSSProperties }>;
	const colorValue = getUtilityColorValue(color);
	return <IconComponent color={colorValue} size={size} style={{ fill: filled ? color : 'none' }} />;
};
