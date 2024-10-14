import { ReactNode } from 'react';
import { StandardElementProps } from '../../types';

export type LayoutBoxProps = StandardElementProps & {
	children: ReactNode;
};
