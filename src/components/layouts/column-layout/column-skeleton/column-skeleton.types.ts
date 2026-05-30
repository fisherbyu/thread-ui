import { ReactNode } from 'react';

export type MediumColumnOptions = 1 | 2 | 3;
export type LargeColumnOptions = 1 | 2 | 3 | 4 | 5;

export type ColumnSkeletonProps = {
	mdcol: MediumColumnOptions;
	lgcol?: LargeColumnOptions;
	children: ReactNode;
};
