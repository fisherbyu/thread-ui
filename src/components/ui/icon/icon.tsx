'use client';
import React from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';
import { IconProps } from './icon.types';
import { IconWeight } from '@phosphor-icons/react';
import { getUtilityColorValue, useTheme } from '../../utils';

/**
 * Standard Icon Component from Phosphor
 * @param name Icon Name from Phosphor Icons
 * @param color Icon Color
 * @param size Icon Size [8 | 12 | 16 | 24 | 32 | 48 | 64]
 * @param weight Icon Weight ['light' | 'regular' | 'bold']
 * @param filled Icon Fill
 * @returns ReactNode Icon
 */
export const Icon = ({ name, color, size = 24, weight = 'regular', filled = false }: IconProps) => {
	const IconComponent = PhosphorIcons[name] as React.ComponentType<{
		color?: string;
		size?: number;
		weight?: IconWeight;
	}>;

	const colorValue = color ? getUtilityColorValue(color) : undefined;

	return <IconComponent color={colorValue} size={size} weight={filled ? 'fill' : weight} />;
};
