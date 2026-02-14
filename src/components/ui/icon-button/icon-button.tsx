import { Icon, Button } from '@/components';
import { IconButtonProps } from './icon-button.types';
import { getUtilityFontSize, getUtilityIconSize, getUtilitySizeValue } from '@/utils';
import { CSSProperties } from 'react';

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
	const styles: CSSProperties = {
		marginLeft: `${getUtilitySizeValue(size) - 2}px`,
		fontSize: getUtilityFontSize(size),
	};
	return (
		<Button
			fullWidth={fullWidth}
			color={color}
			onClick={onClick}
			type={type}
			margin={margin}
			disabled={disabled}
		>
			<Icon name={name} size={getUtilityIconSize(size)} />
			{children && <div style={styles}>{children}</div>}
		</Button>
	);
};
