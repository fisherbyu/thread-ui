import { NavDropdownItemProps } from './items/nav-drop-down-item/nav-drop-down-item.types';
import { NavIconItemProps } from './items/nav-icon-item';
import { NavItemProps } from './items/nav-item';

export type NavMenuProps = {
	logo?: NavIconItemProps;
	items: (NavItemProps | NavDropdownItemProps)[];
};
