import { CSSProperties } from 'react';
import { NavMenuProps } from './nav-menu.types';
import { useResponsiveStyles, useTheme } from '../../utils';
import { NavIconItem } from './items/nav-icon-item';

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

	const _renderNavItem = () => {};
	const _renderNavDropdown = () => {};

	return (
		<>
			<header id="site-menu" style={style.header}>
				<nav style={style.nav}>
					{logo && <NavIconItem href={logo.href} logo={logo.logo} />}
					<span>x</span>
				</nav>
			</header>
		</>
	);
};

// className=" dark:bg-gray-950/80 backdrop-filter backdrop-blur-xl"
