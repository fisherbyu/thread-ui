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
			flexDirection: { base: 'column' },
			alignItems: { base: 'center' },
		},
		variants: {
			open: {
				true: {
					display: { base: 'flex', lg: 'block' },
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
	dropdownGrid: css({
		display: { base: 'grid', lg: 'contents' },
		gridTemplateColumns: { base: 'repeat(var(--row-cols), auto)' },
		justifyContent: 'center',
		gap: { base: '8px 24px' },
	}),
};

export const NavDropdownItem = ({ title, items, icon }: NavigationDropdownItem) => {
	const [isHovered, setIsHovered] = useState(false);

	const remainder = items.length > 4 ? items.length % 3 : 0;
	const needsSplit = remainder !== 0;
	const columns = items.length === 4 ? 2 : Math.min(items.length, 3);

	const fullRowItems = needsSplit ? items.slice(0, items.length - remainder) : items;
	const remainderItems = needsSplit ? items.slice(items.length - remainder) : [];

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
			<div className={styles.dropdownContent({ open: isHovered })}>
				<div
					className={styles.dropdownGrid}
					style={{ '--row-cols': columns } as CSSProperties}
				>
					{fullRowItems.map((item) => (
						<NavItem key={item.title} {...item} isDropdownItem />
					))}
				</div>
				{remainderItems.length > 0 && (
					<div
						className={styles.dropdownGrid}
						style={{ '--row-cols': remainderItems.length } as CSSProperties}
					>
						{remainderItems.map((item) => (
							<NavItem key={item.title} {...item} isDropdownItem />
						))}
					</div>
				)}
			</div>
		</div>
	);
};
