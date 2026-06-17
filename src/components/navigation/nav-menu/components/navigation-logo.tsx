import { NavLink } from './nav-link';
import { NavigationLogoProps } from '../nav-menu.types';

export const NavigationLogo = ({ href, logo }: NavigationLogoProps) => {
	return (
		<NavLink href={href} halfPadding>
			{logo}
		</NavLink>
	);
};
