'use client';
import { CSSProperties, useState } from 'react';
import { getUtilityColorValue } from '../../../utils';
import { ButtonProps } from './button.types';
import { makeStyles } from '../../../functions';
import { getThemeValue } from '../../../functions';

export const Button = ({
	children,
	fullWidth,
	color = 'primary',
	onClick,
	type = 'button',
	margin,
	disabled = false,
}: ButtonProps) => {
	const colorValue = getUtilityColorValue(color);

	const buttonClasses = makeStyles({
		padding: '8px',
		width: fullWidth ? '100%' : 'fit-content',
		transition: 'background-color 0.2s ease',
		border: `${getThemeValue().borderSize.md}px ${colorValue} solid`,
		borderRadius: `${getThemeValue().borderRadius.md}px`,
		color: getThemeValue().white,
		backgroundColor: colorValue,
		margin: margin ?? 'auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		userSelect: 'none',
		opacity: disabled ? 0.6 : 1,
		hover: {
			backgroundColor: disabled ? colorValue : getThemeValue().white,
			color: disabled ? getThemeValue().white : colorValue,
		},
	});

	return (
		<button type={type} className={buttonClasses} onClick={disabled ? undefined : onClick}>
			{children}
		</button>
	);
};
