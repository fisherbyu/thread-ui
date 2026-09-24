import { button } from '@/styled-system/recipes';
import { cx } from '@/styled-system/css';
import { ButtonProps } from './button.types';

/**
 * Button with color, size, and full-width variants.
 * Forwards native button props, including `ref`, `id`, `aria-*`, and event handlers.
 *
 * @example
 * <Button color="primary" size="md" onClick={handleSubmit}>
 *   Save Changes
 * </Button>
 *
 * @example
 * <Button ref={browseRef} text aria-describedby={errorId} onClick={openPicker}>
 *   Select Files
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
	className,
	style,
	...rest
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
			{...rest}
			type={type}
			className={cx(buttonClasses, className)}
			onClick={onClick}
			disabled={disabled}
			style={margin ? { margin, ...style } : style}
		>
			{children}
		</button>
	);
};
