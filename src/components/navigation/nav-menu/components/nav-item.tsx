import { NavLink } from './nav-link';
import { NavigationItem } from '../../navigation.types';

export const NavItem = ({ href, title }: NavigationItem) => {
	return <NavLink href={href}>{title}</NavLink>;
};
