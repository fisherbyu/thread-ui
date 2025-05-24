'use client';
import { CSSProperties, useState } from 'react';
import { getUtilityColorValue } from '../../../utils';
import { ButtonProps } from './button.types';
import { useTheme } from '../../../functions/theme/old';
import { makeStyles } from '../../../functions';

export const Button = ({
	children,
	fullWidth,
	color = 'primary',
	onClick,
	type = 'button',
	margin,
	disabled = false,
}: ButtonProps) => {
	const { theme } = useTheme();
	const colorValue = getUtilityColorValue(color);

	const buttonClasses = makeStyles({
		padding: `${theme.space * 2}px`,
		width: fullWidth ? '100%' : 'fit-content',
		transition: 'background-color 0.2s ease',
		border: `${theme.border.size.md}px ${colorValue} solid`,
		borderRadius: `${theme.border.radius.md}px`,
		color: theme.colors.white,
		backgroundColor: colorValue,
		margin: margin ?? 'auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		userSelect: 'none',
		opacity: disabled ? 0.6 : 1,
		hover: {
			backgroundColor: disabled ? colorValue : theme.colors.white,
			color: disabled ? theme.colors.white : colorValue,
		},
	});

	return (
		<button type={type} className={buttonClasses} onClick={disabled ? undefined : onClick}>
			{children}
		</button>
	);
};
