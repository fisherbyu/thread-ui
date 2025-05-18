'use client';
import { Icon } from '../icon/icon';
import { IconButtonProps } from './icon-button.types';
import { Button } from '../button';

export const IconButton = ({
	children,
	fullWidth,
	color = 'primary',
	onClick,
	type = 'button',
	margin,
	disabled = false,
	name,
}: IconButtonProps) => {
	return (
		<Button fullWidth={fullWidth} color={color} onClick={onClick} type={type} margin={margin} disabled={disabled}>
			<Icon name={name} size={24} />
			{children}
		</Button>
	);
};
