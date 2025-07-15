import { getUtilityColorValue, getUtilityFontSize, getUtilitySizeValue } from '@/utils';
import { ButtonProps } from './button.types';
import { ThreadTheme, generateStyles } from '@/functions';
import { css } from '@/styled-system/css';
import { CSSProperties } from 'react';

export const Button = ({
	children,
	fullWidth,
	color = 'primary',
	size = 'md',
	onClick,
	type = 'button',
	margin,
	disabled = false,
}: ButtonProps) => {
	const colorValue = getUtilityColorValue(color);

	const styles = {
		button: css({
			borderRadius: 'md',
			borderStyle: 'solid',
			borderWidth: 'md',
			transition: 'background-color 0.2s ease',
			color: 'white',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			cursor: 'pointer',
			userSelect: 'none',
		}),
	};

	const staticStyles: CSSProperties = {
		backgroundColor: colorValue,
		borderColor: color == 'black' ? ThreadTheme.white : colorValue,
		fontSize: getUtilityFontSize(size),
		opacity: disabled ? 0.6 : 1,
		padding: `${getUtilitySizeValue(size)}px`,
		width: fullWidth ? '100%' : 'fit-content',
	};

	const buttonClasses = generateStyles({
		hover: {
			backgroundColor: disabled ? colorValue : color == 'black' ? ThreadTheme.white : ThreadTheme.background,
			color: disabled ? ThreadTheme.background : colorValue,
			borderColor: color == 'black' ? ThreadTheme.black : colorValue,
		},
	});

	return (
		<button type={type} className={buttonClasses} onClick={disabled ? undefined : onClick}>
			{children}
		</button>
	);
};
