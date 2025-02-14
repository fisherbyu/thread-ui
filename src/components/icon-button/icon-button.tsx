import { Button } from '../button';
import { Icon } from '../icon/icon';
import { IconButtonProps } from './icon-button.types';

export const IconButton = ({
	name,
	children,
	fullWidth,
	color = 'primary',
	onClick,
	type = 'button',
	margin,
	size = 'md',
}: IconButtonProps) => {
	const sizeValue = (size: 'sm' | 'md' | 'lg'): 16 | 24 | 32 => {
		switch (size) {
			case 'lg':
				return 16;
			case 'md':
				return 24;
			case 'sm':
				return 32;
			default:
				return 16;
		}
	};

	return (
		<Button fullWidth={fullWidth} color={color} onClick={onClick} type={type} margin={margin}>
			<Icon name={name} size={sizeValue(size)} color="primary" />
			{children}
		</Button>
	);
};
