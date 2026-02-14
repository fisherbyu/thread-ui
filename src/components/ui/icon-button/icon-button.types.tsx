import { ReactNode } from 'react';
import { ButtonProps } from '../button';
import { IconNames } from '../icon/icon.types';

export type IconButtonProps = Omit<ButtonProps, 'children'> & {
	name: IconNames;
	children?: ReactNode;
};
