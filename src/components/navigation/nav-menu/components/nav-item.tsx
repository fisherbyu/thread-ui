import { NavLink } from './nav-link';
import { NavigationItem } from '../../navigation.types';
import { Text } from '@/components/typography';
import { Icon } from '@/components/ui';

export const NavItem = ({ href, title, icon }: NavigationItem) => {
	return (
		<NavLink href={href}>
			{icon && <Icon color="text" name={icon} size={16} />}
			<Text size="sm" inline weight="medium">
				{title}
			</Text>
		</NavLink>
	);
};
