'use client';
import { CSSProperties, useState } from 'react';
import { getUtilityColorValue, useTheme } from '../../../utils';
import { BaseButtonProps } from './base-button.types';
export const BaseButton = ({
	children,
	fullWidth,
	color = 'primary',
	onClick,
	type = 'button',
	margin,
	disabled = false,
	onHoverStateChange,
}: BaseButtonProps) => {
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
		opacity: disabled ? 0.6 : 1,
	};

	const hoverButton: CSSProperties = {
		...buttonStyles,
		backgroundColor: disabled ? colorValue : theme.colors.white,
		color: disabled ? theme.colors.white : colorValue,
	};

	const handleHover = (hovered: boolean) => {
		if (!disabled) {
			setIsHovered(hovered);
			onHoverStateChange?.(hovered);
		}
	};

	return (
		<button
			type={type}
			style={isHovered ? hoverButton : buttonStyles}
			onMouseEnter={() => handleHover(true)}
			onMouseLeave={() => handleHover(false)}
			onClick={disabled ? undefined : onClick}
		>
			{children}
		</button>
	);
};
