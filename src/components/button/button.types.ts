import { ReactNode } from 'react';
import { RootButtonProps } from './base-button/base-button.types';

// ButtonProps with required children
export type ButtonProps = RootButtonProps & {
	children: ReactNode;
};
