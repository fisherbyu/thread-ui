import { NavLink } from './nav-link';
import { NavigationItem } from '../../navigation.types';
import { Text } from '@/components/typography';
import { Icon } from '@/components/ui';

type NavItemProps = NavigationItem & {
	isDropdownItem?: boolean;
};

export const NavItem = ({ href, title, icon, isDropdownItem = false }: NavItemProps) => {
	return (
		<NavLink href={href} isDropdownItem={isDropdownItem}>
			{icon && <Icon color="text" name={icon} size={isDropdownItem ? 12 : 16} />}
			<Text size="sm" inline weight="medium">
				{title}
			</Text>
		</NavLink>
	);
};
