import { ReactNode } from 'react';
import { LargeColumnOptions, MediumColumnOptions } from '../column-layout.types';

export type ColumnSkeletonProps = {
	mdcol: MediumColumnOptions;
	lgcol?: LargeColumnOptions;
	children: ReactNode;
};
