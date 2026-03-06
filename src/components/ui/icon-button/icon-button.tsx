import { Icon, Button } from '@/components';
import { IconButtonProps } from './icon-button.types';
import { getUtilityFontSize, getUtilityIconSize, getUtilitySizeValue } from '@/utils';
import { CSSProperties } from 'react';
import { css, cva } from '@/styled-system/css';

const styles = {
	content: cva({
		base: {
			display: 'flex',
			flexDirection: 'row',
			whiteSpace: 'nowrap',
			alignItems: 'center',
		},
		variants: {
			size: {
				sm: {
					gap: '0.5',
				},
				md: {
					gap: '1',
				},
				lg: {
					gap: '1.5',
				},
			},
		},
	}),
};

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
	const computedStyles: CSSProperties = {
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
			{children && (
				<div className={styles.content({ size })} style={computedStyles}>
					{children}
				</div>
			)}
		</Button>
	);
};
