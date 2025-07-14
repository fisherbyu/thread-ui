import { ReactNode } from 'react';

export type BaseItemProps = {
	children: ReactNode;
	href: string;
	onMouseEnter?: (event: React.MouseEvent<HTMLLIElement>) => void;
	onMouseLeave?: (event: React.MouseEvent<HTMLLIElement>) => void;
	halfPadding: boolean;
	isDropdownItem?: boolean;
};
