import React from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';
import { IconProps } from './icon.types';
import { IconWeight } from '@phosphor-icons/react';
import { getUtilityColorValue, useTheme } from '../../utils';

export const Icon: React.FC<IconProps> = ({ name, color, size = 24, weight = 'regular', filled = false }) => {
	const theme = useTheme();
	const IconComponent = PhosphorIcons[name] as React.ComponentType<{
		color?: string;
		size?: number;
		weight?: IconWeight;
	}>;

	const colorValue = getUtilityColorValue(color);

	return <IconComponent color={colorValue} size={size} weight={filled ? 'fill' : weight} />;
};
