import { NavItemProps } from './nav-item.types';
import { BaseItem } from '../base-item';

export const NavItem = ({ href, title }: NavItemProps) => {
	return <BaseItem href={href}>{title}</BaseItem>;
};
