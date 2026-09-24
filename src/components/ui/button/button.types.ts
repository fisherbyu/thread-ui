import { ComponentPropsWithRef, MouseEventHandler, ReactNode } from 'react';
import { Prettify, UtilityColorOptions, UtilitySizeOptions } from '@/types';

export type ButtonProps = Prettify<
	{
		/** Stretches the button to fill its container @default `false` */
		fullWidth?: boolean;
		/** Color variant @default `'primary'` */
		color?: UtilityColorOptions | 'neutral';
		/** HTML button type @default `'button'` */
		type?: 'button' | 'submit' | 'reset';
		/** Click handler. Not called when `disabled` is true */
		onClick?: MouseEventHandler<HTMLButtonElement>;
		/** Inline margin override */
		margin?: string;
		/** Size variant @default `'md'` */
		size?: UtilitySizeOptions;
		/** Render as text variant @default `'false'` */
		text?: boolean;
		/** Disables the button natively: not focusable, no clicks, no form submission @default `false` */
		disabled?: boolean;
		/** Accessibility Label to be added to Button  */
		ariaLabel?: string;
		children: ReactNode;
		/** Highlight background on hover @default `false` */
		highlightOnHover?: boolean;
	} & Omit<
		ComponentPropsWithRef<'button'>,
		'color' | 'type' | 'onClick' | 'disabled' | 'children' | 'className' | 'style'
	>
>;
