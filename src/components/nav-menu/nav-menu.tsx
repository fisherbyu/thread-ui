import { CSSProperties } from 'react';
import { NavMenuProps } from './nav-menu.types';
import { useResponsiveStyles, useTheme } from '../../utils';
import { NavIconItem } from './items/nav-icon-item';
import { NavItem, NavItemProps } from './items/nav-item';
import { NavDropdownItemProps } from './items/nav-drop-down-item/nav-drop-down-item.types';
import { NavDropdownItem } from './items/nav-drop-down-item';

export const NavMenu = ({ logo, items }: NavMenuProps) => {
	const theme = useTheme();
	const style: Record<string, CSSProperties> = {
		header: {
			position: 'sticky',
			top: '0px',
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			height: '80px',
			backdropFilter: 'blur(24px)',
			borderBottomWidth: '1px',
			borderBottomColor: theme.colors.structure.light,
			zIndex: '40',
			backgroundColor: theme.colors.background.light,
		},

		nav: {
			width: '100%',
			marginRight: 'auto',
			marginLeft: 'auto',
			paddingRight: '32px',
			paddingLeft: '32px',
			position: 'relative',
			display: 'flex',
			columnGap: '20px',
			justifyContent: useResponsiveStyles({ base: 'space-between ', lg: 'flex-start' }),
			alignItems: 'center',
		},
	};

	const _renderNavItem = ({ href, title }: NavItemProps) => {
		return <NavItem href={href} title={title} />;
	};
	const _renderNavDropdown = ({ title, items }: NavDropdownItemProps) => {
		return <NavDropdownItem title={title} items={items} />;
	};

	const _renderItem = (item: NavItemProps | NavDropdownItemProps) => {
		if ('href' in item) {
			// item is of type NavItem
			return _renderNavItem(item);
		} else {
			// item is of type NavDropdownItem
			return _renderNavDropdown(item);
		}
	};

	return (
		<>
			<header id="site-menu" style={style.header}>
				<nav style={style.nav}>
					{logo && <NavIconItem href={logo.href} logo={logo.logo} />}
					{items.map((item) => _renderItem(item))}
				</nav>
			</header>
		</>
	);
};
