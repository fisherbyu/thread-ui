import { ReactNode } from 'react';
import { UtilityColorOptions, UtilitySizeOptions } from '@/types';

// ButtonProps with required children
export type ButtonProps = {
	fullWidth?: boolean;
	color?: Exclude<UtilityColorOptions, 'text'>;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	margin?: string;
	size?: UtilitySizeOptions;
	disabled?: boolean;
	children: ReactNode;
};
