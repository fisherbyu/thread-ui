import { ReactNode } from 'react';
import { UtilityColorOptions } from '../../../types';

// ButtonProps with required children
export type ButtonProps = {
	fullWidth?: boolean;
	color?: UtilityColorOptions;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	margin?: string;
	disabled?: boolean;
	children: ReactNode;
};
