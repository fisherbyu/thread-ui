import { IconNames } from '@/components';
import { NavItemActiveColor, NavItemCollapse } from '@/internal';

export type SideNavItemProps = {
	title: string;
	path: string;
	icon: IconNames;
	onClick?: () => void;
	basePath?: string;
	activeColor?: NavItemActiveColor;
	collapse?: NavItemCollapse;
};
