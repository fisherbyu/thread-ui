'use client';
import { useEffect, useState } from 'react';
import { NavMenuProps } from './nav-menu.types';
import { NavIconItem, NavItem, NavItemProps, NavDropdownItemProps, NavDropdownItem } from './items';
import { css } from '@/styled-system/css';

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

	const style = {
		header: css({
			position: 'sticky',
			top: '0px',
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			height: '80px',
			backgroundColor: 'background',
			borderBottomWidth: '1px',
			borderBottomColor: 'structure',
			zIndex: '40',
		}),

		nav: css({
			width: '100%',
			marginRight: 'auto',
			marginLeft: 'auto',
			paddingRight: '32px',
			paddingLeft: '32px',
			position: 'relative',
			display: 'flex',
			columnGap: '20px',
			justifyContent: { base: 'space-between ', lg: 'flex-start' },
			alignItems: 'center',
		}),

		menuItemBlock: css({
			animationDuration: '300ms',
			animationTimingFunction: 'linear',
			position: { base: 'absolute', lg: 'relative' },
			top: { base: '100%', lg: '0px' },
			left: '0px',
			borderBottomWidth: '1px',
			backgroundColor: { base: 'background', lg: 'transparent' },
			borderColor: 'structure',
			paddingTop: { base: '32px', lg: '0px' },
			paddingBottom: { base: '32px', lg: '0px' },
			paddingLeft: { base: '20px', md: '48px', lg: '0px' },
			paddingRight: { base: '20px', md: '48px', lg: '0px' },
			borderStyle: { base: 'solid', lg: 'none' },
			width: { base: '100%', lg: 'max-content' },
			display: { base: 'block', lg: 'flex' },
			columnGap: '24px',
			transitionProperty: { base: '', md: 'none' },
		}),

		menuOpenItemBlock: css({
			transitionDuration: '300ms',
			transitionTimingFunction: 'linear',
			visibility: 'visible',
			opacity: 1,
			transform: 'translateY(0)',
		}),

		menuCloseItemBlock: css({
			transitionDuration: '300ms',
			transitionTimingFunction: 'linear',
			transform: {
				base: 'translateY(2.5rem)',
				lg: 'translateY(0)',
			},
			opacity: { base: '0', lg: '1' },
			visibility: { base: 'hidden', lg: 'visible' },
		}),

		itemList: css({
			display: 'flex',
			flexDirection: { base: 'column', lg: 'row' },
			gap: '24px',
			alignItems: { base: 'stretch', lg: 'center' },
			width: { base: 'auto', lg: '100%' },
			justifyContent: { base: 'flex-center', lg: 'center' },
		}),

		menuControl: css({
			display: { base: 'flex', lg: 'none' },
			alignItems: 'center',
		}),

		menuControlButton: css({
			outline: '2px solid transparent',
			outlineOffset: '2px',
			borderLeftWidth: '1px',
			borderLeftColor: 'gray.main',
			paddingLeft: '12px',
			position: 'relative',
			paddingTop: '12px',
			paddingBottom: '12px',
		}),

		menuCross: css({
			animationDuration: '300ms',
			display: 'flex',
			height: '2px',
			width: '24px',
			borderRadius: 'sm',
			backgroundColor: 'gray.dark',
			transitionProperty:
				'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
			transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
			transitionDuration: '300ms',
		}),

		menuCrossBottom: css({
			marginTop: '8px',
		}),

		menuCrossTopOpen: css({
			transform: 'translate(0, 0.324rem) rotate(45deg)',
		}),

		menuCrossBottomOpen: css({
			transform: 'translate(0, -0.324rem) rotate(-45deg)',
		}),
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
			<header id="site-menu" className={style.header}>
				<nav className={style.nav}>
					{logo && <NavIconItem href={logo.href} logo={logo.logo} />}
					<div className={`${style.menuItemBlock} ${navIsOpened ? style.menuOpenItemBlock : style.menuCloseItemBlock}`}>
						<ul className={style.itemList}>{items.map((item) => _renderItem(item))}</ul>
					</div>
					<div className={style.menuControl}>
						<button
							onClick={() => {
								toggleNavbar();
							}}
							aria-label="toggle navbar"
						>
							<span aria-hidden={true} className={`${style.menuCross} ${navIsOpened ? style.menuCrossTopOpen : ''}`} />
							<span
								aria-hidden={true}
								className={`${style.menuCross} ${style.menuCrossBottom} ${navIsOpened ? style.menuCrossBottomOpen : ''}`}
							/>
						</button>
					</div>
				</nav>
			</header>
		</>
	);
};
