import { NavItemProps } from './nav-item.types';
import { BaseItem } from '../nav-link';

export const NavItem = ({ href, title }: NavItemProps) => {
	return <BaseItem href={href}>{title}</BaseItem>;
};
