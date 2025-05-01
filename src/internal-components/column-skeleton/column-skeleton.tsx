'use client';
import { CSSProperties } from 'react';
import { ColumnSkeletonProps } from './column-skeleton.types';
import { useResponsiveStyles } from '../../utils';

export const ColumnSkeleton = ({ mdcol, lgcol, children }: ColumnSkeletonProps) => {
	const getColumnCSS = (colNum: number) => {
		return `repeat(${colNum}, minmax(0, 1fr))`;
	};

	const styles: CSSProperties = {
		display: 'grid',
		gridTemplateColumns: useResponsiveStyles({ sm: getColumnCSS(1), md: getColumnCSS(mdcol), lg: getColumnCSS(lgcol) }),
		gap: useResponsiveStyles({ sm: '3rem', lg: '1.5rem' }),
	};
	return <div style={styles}>{children}</div>;
};
