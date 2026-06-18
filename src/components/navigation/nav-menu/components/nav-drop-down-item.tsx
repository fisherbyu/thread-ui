'use client';
import { CSSProperties, FocusEvent, useState } from 'react';
import { NavLink } from './nav-link';
import { NavItem } from './nav-item';
import { css, cva } from '@/styled-system/css';
import { NavigationDropdownItem } from '../nav-menu.types';
import { Text } from '@/components/typography';
import { Icon } from '@/components/ui';

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
	caretWrapper: cva({
		base: {
			display: 'flex',
			alignItems: 'center',
			transition: 'transform 200ms',
			marginTop: '1px',
		},
		variants: {
			open: {
				true: { transform: 'rotate(180deg)' },
				false: { transform: 'rotate(0deg)' },
			},
		},
		defaultVariants: {
			open: false,
		},
	}),
};

export const NavDropdownItem = ({ title, items, icon }: NavigationDropdownItem) => {
	const [isOpen, setIsOpen] = useState(false);

	const mobileCols = items.length === 4 ? 2 : Math.min(items.length, 3);
	const desktopCols = items.length <= 3 ? 1 : 2;

	const handleBlurCapture = (e: FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			setIsOpen(false);
		}
	};

	return (
		<div
			className={styles.parentBlock}
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
			onFocusCapture={() => setIsOpen(true)}
			onBlurCapture={handleBlurCapture}
			onClick={() => setIsOpen(false)}
		>
			<NavLink href="#">
				{icon && <Icon size={16} color="text" name={icon} />}
				<Text size="sm" inline>
					{title}
				</Text>
				<span className={styles.caretWrapper({ open: isOpen })}>
					<Icon name="CaretDownIcon" size={12} color="text" />
				</span>
			</NavLink>
			{isOpen && <div className={styles.targetArea} />}
			<div
				className={styles.dropdownContent({ open: isOpen })}
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
