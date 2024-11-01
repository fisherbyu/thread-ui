import { NavIconItemProps } from './items/nav-icon-item';
import { NavItemProps } from './items/nav-item';

type NavLogo = {
	href: string;
	logo: React.ReactNode;
};
type NavItem = {
	href: string;
	title: string;
};

export type NavMenuProps = {
	logo?: NavLogo;
	items: NavItem[];
};
