import { IconButtonProps } from './icon-button.types';
import { Icon, Button } from '@/components';
import { getUtilityIconSize } from '@/utils';

/**
 * Button with a leading icon and optional text label.
 *
 * @example
 * <IconButton name="Plus" color="primary" size="md" onClick={handleAdd}>
 *   Add Item
 * </IconButton>
 */
export const IconButton = ({
	children,
	fullWidth,
	color = 'primary',
	size = 'md',
	onClick,
	type = 'button',
	margin,
	disabled = false,
	name,
}: IconButtonProps) => {
	return (
		<Button
			fullWidth={fullWidth}
			color={color}
			onClick={onClick}
			type={type}
			margin={margin}
			disabled={disabled}
			size={size}
		>
			<Icon name={name} size={getUtilityIconSize(size)} />
			{children}
		</Button>
	);
};
