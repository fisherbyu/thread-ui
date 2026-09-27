import { ReactNode } from 'react';
import { NavItemActiveColor } from '@/internal';
import { SideNavItemProps } from './side-nav-item';

export type SideNavProps = {
	/** Logo or branding element rendered at the top of the nav */
	logo?: ReactNode;
	/** Navigation links */
	links: Omit<SideNavItemProps, 'activeColor' | 'collapse'>[];
	/** Optional controls rendered at the bottom of the nav */
	controls?: ReactNode;
	/** Base path prepended to all link hrefs @default `''` */
	basePath?: string;
	/** Active link fill. `neutral` uses the theme's `active` highlight @default `'primary'` */
	activeColor?: NavItemActiveColor;
	/** Icon-only rail when `true`, labeled when `false`, or by viewport (below `lg`) when unset */
	collapsed?: boolean;
};
