'use client';
import { CSSProperties, useState } from 'react';
import { getUtilityColorValue, useTheme } from '../../utils';
import { ButtonProps } from './button.types';

export const Button = ({ children, fullWidth, color = 'primary', onClick, type = 'button', margin, disabled }: ButtonProps) => {
	const { theme } = useTheme();
	const [isHovered, setIsHovered] = useState(false);

	const colorValue = getUtilityColorValue(color);

	const buttonStyles: CSSProperties = {
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
	};

	const hoverButton: CSSProperties = {
		...buttonStyles,
		backgroundColor: theme.colors.white,
		color: colorValue,
	};

	return (
		<button
			type={type}
			style={isHovered ? hoverButton : buttonStyles}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
