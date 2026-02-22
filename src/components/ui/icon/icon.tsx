'use client';
import React from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';
import { IconProps } from './icon.types';
import { IconWeight } from '@phosphor-icons/react';
import { getUtilityColorValue } from '../../../utils';

/**
 * Standard Icon component with utility color and size support.
 * (Based on PhosphorIcons)
 *
 * @example
 * <Icon name="Star" size={24} color="primary" filled />
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
