import { CSSProperties, useEffect, useState } from 'react';
import { NavMenuProps } from './nav-menu.types';
import { useResponsiveStyles, useTheme } from '../../utils';
import { NavIconItem } from './items/nav-icon-item';
import { NavItem, NavItemProps } from './items/nav-item';
import { NavDropdownItemProps } from './items/nav-drop-down-item/nav-drop-down-item.types';
import { NavDropdownItem } from './items/nav-drop-down-item';

export const NavMenu = ({ logo, items }: NavMenuProps) => {
	// Navmenu Controls
	const [navIsOpened, setNavIsOpened] = useState(false);
	const closeNavbar = () => {
		setNavIsOpened(false);
	};
	const toggleNavbar = () => {
		setNavIsOpened((navIsOpened) => !navIsOpened);
	};

	// Dropdown Control
	const [isDropdownHovered, setIsDropdownHovered] = useState(false);
	const handleMusicHover = (hovered: boolean) => {
		setIsDropdownHovered(hovered);
	};

	useEffect(() => {
		const onResize = () => {
			closeNavbar();
		};

		window.addEventListener('resize', onResize);
	}, []);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			// Check if the click is outside of the menu
			const menu = document.getElementById('site-menu');
			const isClickInsideMenu = menu && menu.contains(event.target as Node);

			if (!isClickInsideMenu) {
				console.log('out');
				console.log('Close Here');
				closeNavbar();
			}
		};

		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, []);

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

		menuItemBlock: {
			position: useResponsiveStyles({ base: 'absolute', lg: 'relative' }) as React.CSSProperties['position'],
			top: useResponsiveStyles({ base: '100%', lg: '0px' }),
			left: '0px',
			borderBottomWidth: '1px',
			backgroundColor: useResponsiveStyles({ base: 'rgb(255 255 255 / 1)', lg: 'transparent' }),
			borderColor: '#e5e7eb',
			paddingTop: useResponsiveStyles({ base: '32px', lg: '0px' }),
			paddingBottom: useResponsiveStyles({ base: '32px', lg: '0px' }),
			paddingLeft: useResponsiveStyles({ base: '20px', sm: '40px', md: '48px', lg: '0px' }),
			paddingRight: useResponsiveStyles({ base: '20px', sm: '40px', md: '48px', lg: '0px' }),
			borderStyle: useResponsiveStyles({ base: 'solid', lg: 'none' }),
			width: useResponsiveStyles({ base: '100%', lg: 'max-content' }),
			display: useResponsiveStyles({ base: 'block', lg: 'flex' }),
			columnGap: '24px',
			transitionProperty: 'none',
		},

		menuOpenItemBlock: {
			transitionDuration: '300ms',
			transitionTimingFunction: 'linear',
			visibility: 'visible',
			opacity: 1,
			transform: 'translate(0px, 0px) rotate(0deg) skewX(0deg) skewY(0deg) scaleX(1) scaleY(1)',
		},

		menuCloseItemBlock: {
			transitionDuration: '300ms',
			transitionTimingFunction: 'linear',
			transform: useResponsiveStyles({
				base: 'translate(0px, 2.5rem) rotate(0deg) skewX(0deg) skewY(0deg) scaleX(1) scaleY(1)',
				lg: 'translate(0px, 0px) rotate(0deg) skewX(0deg) skewY(0deg) scaleX(1) scaleY(1)',
			}),
			opacity: useResponsiveStyles({ base: '0', lg: '1' }),
			visibility: useResponsiveStyles({ base: 'hidden', lg: 'visible' }) as React.CSSProperties['visibility'],
		},

		itemList: {
			display: 'flex',
			flexDirection: useResponsiveStyles({ base: 'column', lg: 'row' }) as React.CSSProperties['flexDirection'],
			gap: '24px',
			alignItems: useResponsiveStyles({ base: 'stretch', lg: 'center' }),
			width: useResponsiveStyles({ base: 'auto', lg: '100%' }),
			justifyContent: useResponsiveStyles({ base: 'flex-center', lg: 'center' }),
		},

		menuControl: {
			display: useResponsiveStyles({ base: 'flex', lg: 'none' }),
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
					<div
						style={{
							...style.menuItemBlock,
							...(navIsOpened ? style.menuOpenItemBlock : style.menuCloseItemBlock),
						}}
					>
						<ul style={style.itemList}>{items.map((item) => _renderItem(item))}</ul>
					</div>
					<div style={style.menuControl}></div>
				</nav>
			</header>
		</>
	);
};
