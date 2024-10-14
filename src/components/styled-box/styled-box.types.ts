import { ReactNode } from 'react';
import { StandardElementProps } from '../../types';
import { StyledElementProps } from '../../types';

export type StyledBoxProps = StandardElementProps &
	StyledElementProps & {
		children: ReactNode;
	};
