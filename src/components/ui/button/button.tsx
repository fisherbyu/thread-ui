'use client';
import { getUtilityColorValue } from '../../../utils';
import { ButtonProps } from './button.types';
import { makeStyles } from '../../../functions';
import { ThreadTheme } from '@/functions';

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
		border: `${ThreadTheme.borderSize.md} ${colorValue} solid`,
		borderRadius: ThreadTheme.borderRadius.md,
		color: ThreadTheme.white,
		backgroundColor: colorValue,
		margin: margin ?? 'auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		userSelect: 'none',
		opacity: disabled ? 0.6 : 1,
		hover: {
			backgroundColor: disabled ? colorValue : ThreadTheme.white,
			color: disabled ? ThreadTheme.white : colorValue,
		},
	});

	return (
		<button type={type} className={buttonClasses} onClick={disabled ? undefined : onClick}>
			{children}
		</button>
	);
};
