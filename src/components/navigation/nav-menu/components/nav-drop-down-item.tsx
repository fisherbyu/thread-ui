'use client';
import { CSSProperties, useState } from 'react';
import { NavLink } from './nav-link';
import { NavItem } from './nav-item';
import { css, cva } from '@/styled-system/css';
import { NavigationDropdownItem } from '../nav-menu.types';
import { Text } from '@/components/typography';
import { Icon } from '@/components/ui';
import { ThreadTheme } from '@/theme';

const styles = {
	parentBlock: css({
		position: 'relative',
	}),
	textBlock: css({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	targetArea: css({
		position: 'absolute',
		width: `calc(100% + 32px)`,
		height: { base: '0px', lg: '30px' },
		left: '50%',
		transform: 'translateX(-50%)',
		bottom: { base: '-0px', lg: '-30px' },
	}),
	dropdownContent: cva({
		base: {
			position: { base: 'relative', lg: 'absolute' },
			width: { base: '100vw', lg: 'fit-content' },
			borderRadius: 'md',
			padding: { base: '8px 0 8px 0', lg: '16px' },
			zIndex: 'overlay',
			top: { lg: 'calc(100% + 30px)' },
			left: '50%',
			transform: 'translateX(-50%)',
			backgroundColor: { lg: 'overlay' },
			boxShadow: { lg: 'lg' },
			justifyContent: 'center',
			gap: '8px 24px',
			gridTemplateColumns: {
				base: 'repeat(var(--thread-nav-menu-cols-sm), auto)',
				lg: 'repeat(var(--thread-nav-menu-cols-lg), auto)',
			},
		},
		variants: {
			open: {
				true: {
					display: 'grid',
				},
				false: {
					display: 'none',
				},
			},
		},
		defaultVariants: {
			open: false,
		},
	}),
};

export const NavDropdownItem = ({ title, items, icon }: NavigationDropdownItem) => {
	const [isHovered, setIsHovered] = useState(false);

	const mobileCols = items.length === 4 ? 2 : Math.min(items.length, 3);
	const desktopCols = items.length <= 3 ? 1 : 2;

	const arrow: CSSProperties = {
		color: ThreadTheme.text.standard,
		marginTop: '1px',
		height: '12px',
		width: '12px',
		transition: 'all 200ms',
		transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)',
	};

	return (
		<div
			className={styles.parentBlock}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => setIsHovered(false)}
		>
			<NavLink href="#">
				{icon && <Icon size={16} color="text" name={icon} />}
				<Text size="sm" inline>
					{title}
				</Text>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					style={arrow}
				>
					<path d="m6 9 6 6 6-6"></path>
				</svg>
			</NavLink>
			{isHovered && <div className={styles.targetArea} />}
			<div
				className={styles.dropdownContent({ open: isHovered })}
				style={
					{
						'--thread-nav-menu-cols-sm': mobileCols,
						'--thread-nav-menu-cols-lg': desktopCols,
					} as CSSProperties
				}
			>
				{items.map((item) => (
					<NavItem key={item.title} {...item} isDropdownItem />
				))}
			</div>
		</div>
	);
};
