import { IconNames } from '@/components';
import { NavListItemActiveColor, NavListItemCollapse } from '@/internal';

export type SideNavItemProps = {
	title: string;
	path: string;
	icon: IconNames;
	onClick?: () => void;
	basePath?: string;
	activeColor?: NavListItemActiveColor;
	collapse?: NavListItemCollapse;
};
