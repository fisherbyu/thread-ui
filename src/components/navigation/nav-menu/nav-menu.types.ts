import { NavDropdownItemProps } from './components/nav-drop-down-item/nav-drop-down-item.types';
import { NavigationLogoProps } from './components/nav-icon-item';
import { NavItemProps } from './components/nav-item';

export type NavMenuProps = {
	/** Logo rendered as a linked icon on the left side of the nav */
	logo?: NavigationLogoProps;
	/** Navigation items. Accepts standard links or dropdown menus */
	items: (NavItemProps | NavDropdownItemProps)[];
};
