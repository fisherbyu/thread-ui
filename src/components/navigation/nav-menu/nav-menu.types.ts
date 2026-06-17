import { ReactNode } from 'react';
import { Prettify } from '@/types';
import { NavigationItem } from '../navigation.types';

export type NavMenuProps = {
	/** Logo rendered as a linked icon on the left side of the nav */
	logo?: NavigationLogoProps;
	/** Navigation items. Accepts standard links or dropdown menus */
	items: (NavigationItem | NavigationDropdownItem)[];
};

export type NavigationLogoProps = {
	/** The URL or path the navigation item links to. */
	href: NavigationItem['href'];
	/** Site Logo */
	logo: ReactNode;
};

export type NavigationDropdownItem = Prettify<
	NavigationItem & {
		/** Items within dropdown */
		items: NavigationItem[];
	}
>;
