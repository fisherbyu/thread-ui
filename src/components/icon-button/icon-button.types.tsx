import { ReactNode } from 'react';
import { RootButtonProps } from '../button/base-button/base-button.types';
import { IconNames } from '../icon/icon.types';

export type IconButtonProps = RootButtonProps & {
	name: IconNames;
	size: 'sm' | 'md' | 'lg';
	children?: ReactNode;
};
