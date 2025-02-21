import { ReactNode } from 'react';
import { RootButtonProps } from '../button/base-button/base-button.types';
import { IconNames } from '../icon/icon.types';
import { UtilityColorOptions } from '../../types';

export type IconButtonProps = RootButtonProps & {
	name: IconNames;
	size: UtilityColorOptions;
	children?: ReactNode;
};
