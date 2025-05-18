import { ReactNode } from 'react';

export type BaseItemProps = {
	children: ReactNode;
	href: string;
	padding?: string;
	onMouseEnter?: (event: React.MouseEvent<HTMLLIElement>) => void;
	onMouseLeave?: (event: React.MouseEvent<HTMLLIElement>) => void;
	isDropdownItem?: boolean;
};
