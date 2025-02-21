'use client';
import { useState } from 'react';
import { getUtilitySizeValue } from '../../utils';
import { BaseButton } from '../button/base-button/base-button';
import { Icon } from '../icon/icon';
import { IconButtonProps } from './icon-button.types';

export const IconButton = ({
	children,
	fullWidth,
	color = 'primary',
	onClick,
	type = 'button',
	margin,
	disabled = false,
	size,
	name,
}: IconButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<BaseButton
			fullWidth={fullWidth}
			color={color}
			onClick={onClick}
			type={type}
			margin={margin}
			disabled={disabled}
			onHoverStateChange={setIsHovered}
		>
			<Icon color={isHovered ? color : 'text'} name={name} size={getUtilitySizeValue(size)} />
			{children}
		</BaseButton>
	);
};
