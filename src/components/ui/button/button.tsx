import { getUtilityColorValue, getUtilityFontSize, getUtilitySizeValue } from '@/utils';
import { ButtonProps } from './button.types';
import { ThreadTheme, generateStyles } from '@/functions';
import { css } from '@/styled-system/css';

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
			transition: 'background-color 0.2s ease',
			color: 'white',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			cursor: 'pointer',
			userSelect: 'none',
		}),
	};

	const buttonClasses = generateStyles({
		padding: `${getUtilitySizeValue(size)}px`,
		fontSize: getUtilityFontSize(size),
		width: fullWidth ? '100%' : 'fit-content',
		border: `${ThreadTheme.borderSize.md} ${color == 'black' ? ThreadTheme.white : colorValue} solid`,
		borderRadius: ThreadTheme.borderRadius.md,
		backgroundColor: colorValue,
		margin: margin ?? 'auto',

		opacity: disabled ? 0.6 : 1,
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
