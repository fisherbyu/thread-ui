import { ReactNode } from 'react';

export type ColumnSkeletonProps = {
	mdcol: 1 | 2 | 3;
	lgcol?: 1 | 2 | 3 | 4 | 5;
	children: ReactNode;
};
