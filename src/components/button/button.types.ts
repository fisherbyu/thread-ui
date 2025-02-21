import { ReactNode } from 'react';

export type ButtonProps = {
	children: ReactNode;
	fullWidth?: boolean;
	color?: 'primary' | 'secondary' | 'tertiary' | 'black' | 'grey' | 'success' | 'error' | 'info';
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	margin?: string;
	disabled?: boolean;
};
