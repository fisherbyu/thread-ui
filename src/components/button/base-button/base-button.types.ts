import { ReactNode } from 'react';
import { ButtonProps } from '../button.types';

// Generic Button Requirements
export type RootButtonProps = {
	fullWidth?: boolean;
	color?: 'primary' | 'secondary' | 'tertiary' | 'black' | 'grey' | 'success' | 'error' | 'info';
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	margin?: string;
	disabled?: boolean;
};

// Root Props with Optional Children and HoverHandle
export type BaseButtonProps = RootButtonProps & {
	children?: ReactNode;
	onHoverStateChange?: (isHovered: boolean) => void;
};
