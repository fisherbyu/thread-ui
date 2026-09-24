import { button } from '@/styled-system/recipes';
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
			// Before `rest` so an explicit native `aria-label` takes precedence over `ariaLabel`
			aria-label={ariaLabel}
			{...rest}
			type={type}
			className={buttonClasses}
			onClick={onClick}
			disabled={disabled}
			style={margin ? { margin } : undefined}
		>
			{children}
		</button>
	);
};
