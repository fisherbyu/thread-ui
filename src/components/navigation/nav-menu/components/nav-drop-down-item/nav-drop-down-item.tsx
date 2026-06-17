'use client';
import { CSSProperties, useState } from 'react';
import { NavLink } from '../nav-link';
import { css, cx } from '@/styled-system/css';
import { NavigationDropdownItem } from '../../nav-menu.types';

const styles = {
	parentBlock: css({
		position: 'relative',
	}),
	textBlock: css({
		display: 'flex',
		flexDirection: 'row',
		gap: '1',
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
	dropdownContent: css({
		display: 'none',
		position: { base: 'static', lg: 'absolute' },
		width: 'fit-content',
		borderRadius: 'md',
		padding: '16px',
		zIndex: 'overlay',
		top: { lg: 'calc(100% + 30px)' },
		left: { lg: '50%' },
		transform: { lg: 'translateX(-50%)' },
		backgroundColor: 'overlay',
		boxShadow: 'lg',
	}),
	dropdownContentShow: css({
		display: { base: 'none', lg: 'block' },
	}),
	collapsedDropdownContent: css({
		justifyContent: 'center',
		columnGap: '24px',
		alignItems: 'center',
		width: '100vw',
		position: 'relative',
		left: '50%',
		transform: 'translateX(-50%)',
		borderRadius: 'md',
		zIndex: 'overlay',
	}),
	dropdownContentNoShow: css({
		display: 'none',
	}),
	collapsedDropdownContentShow: css({
		display: { base: 'flex', lg: 'none' },
	}),
};

export const NavDropdownItem = ({ title, items }: NavigationDropdownItem) => {
	const [isHovered, setIsHovered] = useState(false);

	const arrow: CSSProperties = {
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
				<div className={styles.textBlock}>
					<span>{title}</span>
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
				</div>
			</NavLink>
			{isHovered && <div className={styles.targetArea} />}
			{/* Swap menu based on size */}
			{/* Screen SM */}
			<div
				className={cx(
					styles.collapsedDropdownContent,
					isHovered ? styles.collapsedDropdownContentShow : styles.dropdownContentNoShow
				)}
			>
				{items.map((item) => (
					<NavLink key={item.title} href={item.href} isDropdownItem>
						{item.title}
					</NavLink>
				))}
			</div>
			{/* Screen LG */}
			<div
				className={cx(
					styles.dropdownContent,
					isHovered ? styles.dropdownContentShow : styles.dropdownContentNoShow
				)}
			>
				{items.map((item) => (
					<NavLink key={item.title} href={item.href} isDropdownItem>
						{item.title}
					</NavLink>
				))}
			</div>
		</div>
	);
};
