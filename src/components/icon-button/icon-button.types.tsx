import { ReactNode } from 'react';
import { ButtonProps } from '../button';
import { IconNames } from '../icon/icon.types';
import { UtilitySizes } from '../../types';

export type IconButtonProps = ButtonProps & {
	name: IconNames;
	children?: ReactNode;
};
