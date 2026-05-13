import { NavLink } from '../nav-link';
import { NavIconItemProps } from './nav-icon-item.types';

export const NavIconItem = ({ href, logo }: NavIconItemProps) => {
	return (
		<>
			<NavLink href={href} halfPadding>
				{logo}
			</NavLink>
		</>
	);
};
