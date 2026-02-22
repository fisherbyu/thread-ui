import { ReactNode } from 'react';
import { ButtonProps } from '../button';
import { IconNames } from '../icon/icon.types';

export type IconButtonProps = Omit<ButtonProps, 'children'> & {
	/** Phosphor icon rendered inside the button */
	name: IconNames;
	/** Button content rendered alongside the icon */
	children?: ReactNode;
};
