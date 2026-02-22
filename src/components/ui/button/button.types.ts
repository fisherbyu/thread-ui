import { ReactNode } from 'react';
import { UtilityColorOptions, UtilitySizeOptions } from '@/types';

export type ButtonProps = {
	/** Stretches the button to fill its container @default `false` */
	fullWidth?: boolean;
	/** Color variant @default `'primary'` */
	color?: Exclude<UtilityColorOptions, 'text'>;
	/** HTML button type @default `'button'` */
	type?: 'button' | 'submit' | 'reset';
	/** Click handler. Not called when `disabled` is true */
	onClick?: () => void;
	/** Inline margin override */
	margin?: string;
	/** Size variant @default `'md'` */
	size?: UtilitySizeOptions;
	/** Disables the button and suppresses click events @default `false` */
	disabled?: boolean;
	children: ReactNode;
};
