import { NavLink } from './nav-link';
import { NavigationLogoProps } from './navigation-logo.types';

export const NavigationLogo = ({ href, logo }: NavigationLogoProps) => {
	return (
		<NavLink href={href} halfPadding>
			{logo}
		</NavLink>
	);
};
