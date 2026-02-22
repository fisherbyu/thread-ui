import { IconNames } from '@/components';

export type SideNavItemProps = {
	title: string;
	path: string;
	icon: IconNames;
	onClick?: () => void;
	basePath?: string;
};
