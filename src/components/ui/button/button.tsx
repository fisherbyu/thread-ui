import { button } from '@/styled-system/recipes';
import { ButtonProps } from './button.types';

/**
 * Button with color, size, and full-width variants.
 *
 * @example
 * <Button color="primary" size="md" onClick={handleSubmit}>
 *   Save Changes
 * </Button>
 */
export const Button = ({
	ariaLabel,
	children,
	fullWidth = false,
	color = 'primary',
	size = 'md',
	onClick,
	type = 'button',
	margin,
	text = false,
	disabled = false,
	highlightOnHover = false,
}: ButtonProps) => {
	const buttonClasses = button({
		color,
		size,
		fullWidth,
		disabled,
		textVariant: text,
		highlightOnHover,
	});

	return (
		<button
			aria-label={ariaLabel}
			type={type}
			className={buttonClasses}
			onClick={disabled ? undefined : onClick}
			style={margin ? { margin } : undefined}
		>
			{children}
		</button>
	);
};
