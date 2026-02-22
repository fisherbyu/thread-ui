import { NavDropdownItemProps } from './items/nav-drop-down-item/nav-drop-down-item.types';
import { NavIconItemProps } from './items/nav-icon-item';
import { NavItemProps } from './items/nav-item';

export type NavMenuProps = {
	/** Logo rendered as a linked icon on the left side of the nav */
	logo?: NavIconItemProps;
	/** Navigation items. Accepts standard links or dropdown menus */
	items: (NavItemProps | NavDropdownItemProps)[];
};
