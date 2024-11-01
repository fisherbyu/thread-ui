import { NavIconItemProps } from './items/nav-icon-item';
import { NavItemProps } from './items/nav-item';

type NavLogo = NavIconItemProps;
type NavItem = NavItemProps;

export type NavMenuProps = {
	logo?: NavLogo;
	items: [NavItem];
};
