import { NavLink } from '../nav-link';
import { NavigationLogoProps } from './nav-icon-item.types';

export const NavigationLogo = ({ href, logo }: NavigationLogoProps) => {
	return (
		<>
			<NavLink href={href} halfPadding>
				{logo}
			</NavLink>
		</>
	);
};
