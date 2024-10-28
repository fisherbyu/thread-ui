import { Link } from '../../../../internal-components';
import { NavItemProps } from './nav-item.types';

export const NavItem = ({ title, href }: NavItemProps) => {
	const NavItemBasic: string =
		'inline-flex h-10 items-center justify-center rounded-md bg-background text-sm font-medium transition-colors';
	const NavItemHover: string = 'hover:bg-accent hover:text-accent-foreground';
	const LogoStyles: string = `${NavItemBasic} ${NavItemHover}    w-fit `;
	const NavItemSpacing: string = `px-4 py-2 w-full `;
	const NavItem: string = `${NavItemBasic} ${NavItemHover} ${NavItemSpacing}    `; //lg:w-fit
	const DropdownItem: string = `${NavItemBasic} ${NavItemHover} ${NavItemSpacing} `; //lg:w-8/12
	return (
		<li className="inline-flex h-10 items-center justify-center rounded-md bg-background text-sm font-medium transition-colors">
			<Link className={NavItem} href={href}>
				{title}
			</Link>
		</li>
	);
};
