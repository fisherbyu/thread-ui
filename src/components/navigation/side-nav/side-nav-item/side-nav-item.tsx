'use client';
import { NavItem } from '@/internal';
import { usePathname } from '@/hooks';
import { SideNavItemProps } from './side-nav-item.types';

export const SideNavItem = ({
	title,
	path,
	icon,
	onClick,
	basePath = '',
	activeColor,
	collapse,
}: SideNavItemProps) => {
	const currentPath = usePathname();
	const fullPath = path === '/' && basePath ? basePath : `${basePath}${path}`;
	const active = path === '/' ? currentPath === fullPath : currentPath.startsWith(fullPath);

	return (
		<NavItem
			href={fullPath}
			icon={icon}
			onClick={onClick}
			active={active}
			activeColor={activeColor}
			collapse={collapse}
		>
			{title}
		</NavItem>
	);
};
