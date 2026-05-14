import { ReactNode } from 'react';

export type NavLinkProps = {
	children: ReactNode;
	href: string;
	halfPadding?: boolean;
	isDropdownItem?: boolean;
};
