'use client';
import { useRef, useState } from 'react';
import { useClickOutside, useResize } from '@/hooks';
import { css, cx } from '@/styled-system/css';
import { NavigationDropdownItem, NavMenuProps } from './nav-menu.types';
import { NavigationLogo } from './components/navigation-logo';
import { NavItem } from './components/nav-item';
import { NavDropdownItem } from './components/nav-drop-down-item';
import { NavigationItem } from '../navigation.types';

const style = {
	header: css({
		position: 'sticky',
		top: '0px',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		height: '80px',
		backgroundColor: 'elevated',
		borderBottomWidth: 'md',
		borderBottomColor: 'structure.subtle',
		boxShadow: 'md',
		zIndex: 'sticky',
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
		borderBottomWidth: { base: 'md', lg: '0' },
		backgroundColor: { base: 'elevated', lg: 'transparent' },
		borderColor: 'structure.subtle',
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
		justifyContent: 'center',
	}),

	menuControl: css({
		display: { base: 'flex', lg: 'none' },
		alignItems: 'center',
	}),

	menuCross: css({
		animationDuration: '300ms',
		display: 'flex',
		height: '2px',
		width: '24px',
		borderRadius: 'sm',
		backgroundColor: 'text.standard',
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

/**
 * Sticky site navigation with a logo, nav links, dropdown menus, and a mobile hamburger toggle.
 * Closes on outside click and on viewport resize.
 *
 * @example
 * <NavMenu
 *   logo={{ href: '/', logo: <Logo /> }}
 *   items={[
 *     { href: '/about', title: 'About' },
 *     { title: 'Work', items: [{ href: '/work/web', title: 'Web' }] },
 *   ]}
 * />
 */
export const NavMenu = ({ logo, items }: NavMenuProps) => {
	const headerRef = useRef<HTMLElement>(null);
	const [navIsOpened, setNavIsOpened] = useState(false);

	const closeNavbar = () => setNavIsOpened(false);
	const toggleNavbar = () => setNavIsOpened((prev) => !prev);

	useResize({ onResize: closeNavbar });
	useClickOutside({
		elementRef: headerRef,
		isOpen: navIsOpened,
		onClose: closeNavbar,
	});

	const renderItem = (item: NavigationItem | NavigationDropdownItem) => {
		return 'href' in item ? (
			<NavItem key={item.title} href={item.href} title={item.title} />
		) : (
			<NavDropdownItem key={item.title} title={item.title} items={item.items} />
		);
	};

	return (
		<header ref={headerRef} className={style.header}>
			<nav className={style.nav}>
				{logo && <NavigationLogo href={logo.href} logo={logo.logo} />}
				<div
					className={cx(
						style.menuItemBlock,
						navIsOpened ? style.menuOpenItemBlock : style.menuCloseItemBlock
					)}
				>
					<ul className={style.itemList}>{items.map(renderItem)}</ul>
				</div>
				<div className={style.menuControl}>
					<button onClick={toggleNavbar} aria-label="toggle navbar">
						<span
							aria-hidden={true}
							className={cx(style.menuCross, navIsOpened && style.menuCrossTopOpen)}
						/>
						<span
							aria-hidden={true}
							className={cx(
								style.menuCross,
								style.menuCrossBottom,
								navIsOpened && style.menuCrossBottomOpen
							)}
						/>
					</button>
				</div>
			</nav>
		</header>
	);
};
