import { NavItemProps } from './nav-item.types';
import { NavLink } from '../nav-link';

export const NavItem = ({ href, title }: NavItemProps) => {
	return <NavLink href={href}>{title}</NavLink>;
};
