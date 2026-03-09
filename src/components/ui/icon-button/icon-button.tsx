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
export const IconButton = (props: IconButtonProps) => {
	const { name, size = 'md', children, ...buttonProps } = props;
	return (
		<Button size={size} {...buttonProps}>
			<Icon name={name} size={getUtilityIconSize(size)} />
			{children}
		</Button>
	);
};
