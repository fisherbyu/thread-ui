import { button } from '@/styled-system/recipes';
import { ButtonProps } from './button.types';

export const Button = ({
	children,
	fullWidth = false,
	color = 'primary',
	size = 'md',
	onClick,
	type = 'button',
	margin,
	disabled = false,
}: ButtonProps) => {
	const buttonClasses = button({
		color,
		size,
		fullWidth,
		disabled,
	});

	return (
		<button type={type} className={buttonClasses} onClick={disabled ? undefined : onClick} style={margin ? { margin } : undefined}>
			{children}
		</button>
	);
};
