'use client';
import { CSSProperties, useState } from 'react';
import { useTheme } from '../../utils';
import { ButtonProps } from './button.types';

export const Button = ({ children, fullWidth, color = 'primary', onClick, type = 'button', margin }: ButtonProps) => {
	const theme = useTheme();
	const [isHovered, setIsHovered] = useState(false);

	const getColorValue = (colorType: ButtonProps['color']): { dark: string; light: string } => {
		switch (colorType) {
			case 'primary':
				return {
					dark: theme.colors.primary.medium,
					light: theme.colors.primary.light,
				};
			case 'secondary':
				return {
					dark: theme.colors.secondary.medium,
					light: theme.colors.secondary.light,
				};
			case 'tertiary':
				return {
					dark: theme.colors.tertiary.medium,
					light: theme.colors.tertiary.light,
				};
			case 'black':
				return {
					dark: theme.colors.black,
					light: theme.colors.white,
				};
			case 'grey':
				return {
					dark: theme.colors.gray.medium,
					light: theme.colors.gray.light,
				};
			case 'success':
				return {
					dark: theme.colors.success.medium,
					light: theme.colors.success.light,
				};
			case 'error':
				return {
					dark: theme.colors.error.medium,
					light: theme.colors.error.light,
				};
			case 'info':
				return {
					dark: theme.colors.info.medium,
					light: theme.colors.primary.light,
				};
			default:
				return {
					dark: theme.colors.primary.medium,
					light: theme.colors.primary.medium,
				};
		}
	};

	const colors = getColorValue(color);

	const buttonStyles: CSSProperties = {
		padding: `${theme.space * 3}px`,
		width: fullWidth ? '100%' : 'fit-content',
		transition: 'background-color 0.2s ease',
		border: `${theme.borders.size.md}px ${colors.dark} solid`,
		borderRadius: `${theme.borders.radius.md}px`,
		color: theme.colors.white,
		backgroundColor: colors.dark,
		margin: margin ? margin : 'auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		userSelect: 'none',
	};

	const hoverButton: CSSProperties = {
		...buttonStyles,
		backgroundColor: theme.colors.white,
		color: colors.dark,
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
