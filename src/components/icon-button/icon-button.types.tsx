import { ReactNode } from 'react';
import { RootButtonProps } from '../button/base-button/base-button.types';
import { IconNames } from '../icon/icon.types';
import { UtilitySizes } from '../../types';

export type IconButtonProps = RootButtonProps & {
	name: IconNames;
	size: UtilitySizes;
	children?: ReactNode;
};
