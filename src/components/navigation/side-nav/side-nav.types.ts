import { ReactNode } from 'react';
import { SideNavItemProps } from './side-nav-item';

export type SideNavProps = {
	/** Logo or branding element rendered at the top of the nav */
	logo?: ReactNode;
	/** Navigation links */
	links: SideNavItemProps[];
	/** Optional controls rendered at the bottom of the nav */
	controls?: ReactNode;
	/** Base path prepended to all link hrefs @default `''` */
	basePath?: string;
};
