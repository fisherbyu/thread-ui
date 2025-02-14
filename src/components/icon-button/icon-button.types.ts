import { ReactNode } from 'react';

export type IconButtonProps = {
	size: 'sm' | 'md' | 'lg';
	children: ReactNode;
	fullWidth?: boolean;
	color?: 'primary' | 'secondary' | 'tertiary' | 'black' | 'grey' | 'success' | 'error' | 'info';
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	margin?: string;
};
