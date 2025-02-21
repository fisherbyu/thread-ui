'use client';
import { CSSProperties, useState } from 'react';
import { getUtilityColorValue, useTheme } from '../../utils';
import { ButtonProps } from './button.types';
import { BaseButton } from './base-button/base-button';

export const Button = ({
	children,
	fullWidth,
	color = 'primary',
	onClick,
	type = 'button',
	margin,
	disabled = false,
}: ButtonProps) => {
	return (
		<BaseButton fullWidth={fullWidth} color={color} onClick={onClick} type={type} margin={margin} disabled={disabled}>
			{children}
		</BaseButton>
	);
};
