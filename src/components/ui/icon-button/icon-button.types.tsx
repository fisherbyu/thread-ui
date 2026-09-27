import { ReactNode } from 'react';
import { ButtonProps } from '../button';
import { IconNames, IconProps } from '../icon/icon.types';
import { Prettify } from '@/types';

export type IconButtonProps = Prettify<
	Omit<ButtonProps, 'children'> & {
		/** Phosphor icon rendered inside the button */
		name: IconNames;
		/** Button content rendered alongside the icon */
		children?: ReactNode;
	} & Pick<IconProps, 'filled'>
>;
