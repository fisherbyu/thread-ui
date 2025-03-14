'use client';
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
				closeNavbar();
			}
		};

		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, []);

	const { theme } = useTheme();
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
			borderBottomColor: theme.colors.structure,
			zIndex: '40',
			backgroundColor: theme.colors.background,
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
			justifyContent: useResponsiveStyles({ sm: 'space-between ', lg: 'flex-start' }),
			alignItems: 'center',
		},

		menuItemBlock: {
			animationDuration: '300ms',
			animationTimingFunction: 'linear',
			position: useResponsiveStyles({ sm: 'absolute', lg: 'relative' }) as React.CSSProperties['position'],
			top: useResponsiveStyles({ sm: '100%', lg: '0px' }),
			left: '0px',
			borderBottomWidth: '1px',
			backgroundColor: useResponsiveStyles({ sm: 'rgb(255 255 255 / 1)', lg: 'transparent' }),
			borderColor: '#e5e7eb',
			paddingTop: useResponsiveStyles({ sm: '32px', lg: '0px' }),
			paddingBottom: useResponsiveStyles({ sm: '32px', lg: '0px' }),
			paddingLeft: useResponsiveStyles({ sm: '20px', md: '48px', lg: '0px' }),
			paddingRight: useResponsiveStyles({ sm: '20px', md: '48px', lg: '0px' }),
			borderStyle: useResponsiveStyles({ sm: 'solid', lg: 'none' }),
			width: useResponsiveStyles({ sm: '100%', lg: 'max-content' }),
			display: useResponsiveStyles({ sm: 'block', lg: 'flex' }),
			columnGap: '24px',
			transitionProperty: useResponsiveStyles({ sm: '', md: 'none' }),
		},

		menuOpenItemBlock: {
			transitionDuration: '300ms',
			transitionTimingFunction: 'linear',
			visibility: 'visible',
			opacity: 1,
			transform: 'translateY(0)',
		},

		menuCloseItemBlock: {
			transitionDuration: '300ms',
			transitionTimingFunction: 'linear',
			transform: useResponsiveStyles({
				sm: 'translateY(2.5rem)', // translate-y-10 (10 * 0.25rem = 2.5rem)
				lg: 'translateY(0)',
			}),
			opacity: useResponsiveStyles({ sm: '0', lg: '1' }),
			visibility: useResponsiveStyles({ sm: 'hidden', lg: 'visible' }) as React.CSSProperties['visibility'],
		},

		itemList: {
			display: 'flex',
			flexDirection: useResponsiveStyles({ sm: 'column', lg: 'row' }) as React.CSSProperties['flexDirection'],
			gap: '24px',
			alignItems: useResponsiveStyles({ sm: 'stretch', lg: 'center' }),
			width: useResponsiveStyles({ sm: 'auto', lg: '100%' }),
			justifyContent: useResponsiveStyles({ sm: 'flex-center', lg: 'center' }),
		},

		menuControl: {
			display: useResponsiveStyles({ sm: 'flex', lg: 'none' }),
			alignItems: 'center',
		},

		menuControlButton: {
			outline: '2px solid transparent',
			outlineOffset: '2px',
			borderLeftWidth: '1px',
			borderLeftColor: theme.colors.gray.main,
			paddingLeft: '12px',
			position: 'relative',
			paddingTop: '12px',
			paddingBottom: '12px',
		},

		menuCross: {
			animationDuration: '300ms',
			display: 'flex',
			height: '2px',
			width: '24px',
			borderRadius: theme.border.radius.sm,
			backgroundColor: theme.colors.gray.dark,
			transitionProperty:
				'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
			transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
			transitionDuration: '300ms',
		},

		// menuCrossTop: {
		// 	// margin-top: 0.5rem /* 8px */
		// },

		menuCrossBottom: {
			marginTop: '8px',
		},

		menuCrossTopOpen: {
			transform: 'translate(0, 0.324rem) rotate(45deg)',
		},

		menuCrossBottomOpen: {
			transform: 'translate(0, -0.324rem) rotate(-45deg)',
		},
	};

	const _renderNavItem = ({ href, title }: NavItemProps) => {
		return <NavItem key={title} href={href} title={title} />;
	};
	const _renderNavDropdown = ({ title, items }: NavDropdownItemProps) => {
		return <NavDropdownItem key={title} title={title} items={items} />;
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
					<div style={style.menuControl}>
						<button
							onClick={() => {
								toggleNavbar();
							}}
							aria-label="toggle navbar"
						>
							<span
								aria-hidden={true}
								style={{
									...style.menuCross,
									...(navIsOpened ? style.menuCrossTopOpen : {}),
								}}
							/>
							<span
								aria-hidden={true}
								style={{
									...style.menuCross,
									...style.menuCrossBottom,
									...(navIsOpened ? style.menuCrossBottomOpen : {}),
								}}
							/>
						</button>
					</div>
				</nav>
			</header>
		</>
	);
};
