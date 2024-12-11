import { ReactNode } from 'react';

export type ColumnLayoutProps = {
	title?: string;
	caption?: string;
	mdcol: number;
	lgcol: number;
	items: ColumnItem[];
};

export type ColumnItem = {
	title?: string;
	description?: string;
	image: { src: string; alt: string } | ReactNode;
};
