'use client';
import { CSSProperties, useState } from 'react';
import { BaseItem } from '../base-item';
import { NavDropdownItemProps } from './nav-drop-down-item.types';
import { NavMenuStyles } from '../../nav-menu-styles';
import { ThreadTheme, useThreadStyleObjects } from '@/functions';

export const NavDropdownItem = ({ title, items }: NavDropdownItemProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const styles = useThreadStyleObjects({
		parentBlock: {
			position: { sm: 'static', lg: 'relative' },
		},
		textBlock: {
			display: 'flex',
			flexDirection: 'row',
			gap: '4px',
			justifyContent: 'center',
			alignItems: 'center',
		},

		targetArea: {
			position: 'absolute',
			width: `calc(100% + ${NavMenuStyles.paddingX * 2}px)`,
			height: { sm: '0px', lg: '30px' },
			left: '50%',
			transform: 'translateX(-50%)',
			bottom: { sm: '-0px', lg: '-30px' },
		},

		dropdownContent: {
			display: 'none',
			backgroundColor: ThreadTheme.background,
			borderWidth: '1px',
			boxShadow: `0 4px 8px ${ThreadTheme.background}`,
			position: 'absolute',
			width: 'fit-content',
			borderRadius: ThreadTheme.borderRadius.md,
			padding: `${NavMenuStyles.paddingY}px ${NavMenuStyles.paddingX}px`,
			zIndex: 10,
			top: { sm: '', lg: 'calc(100% + 30px)' },
			left: '50%',
			transform: 'translateX(-50%)',
		},
		dropdownContentShow: {
			display: { sm: 'none', lg: 'block' },
		},

		collapsedDropdownContent: {
			display: 'none',
			justifyContent: 'center',
			columnGap: '24px',
			alignItems: 'center',
			backgroundColor: ThreadTheme.background,
			width: '100%',
			borderRadius: ThreadTheme.borderRadius.md,
			zIndex: 10,
		},

		collapsedDropdownContentShow: {
			display: { sm: 'flex', lg: 'none' },
		},
	});
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
			<BaseItem href="#">
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
			</BaseItem>
			{isHovered && <div className={styles.targetArea} />}
			{/* Swap menu based on size */}
			{/* Screen SM */}
			<div className={`${styles.collapsedDropdownContent} ${isHovered && styles.collapsedDropdownContentShow}`}>
				{items.map((item) => (
					<BaseItem key={item.title} href={item.href} isDropdownItem>
						{item.title}
					</BaseItem>
				))}
			</div>
			{/* Screen LG */}
			<div className={`${styles.dropdownContent} ${isHovered && styles.dropdownContentShow}`}>
				{items.map((item) => (
					<BaseItem key={item.title} href={item.href} isDropdownItem>
						{item.title}
					</BaseItem>
				))}
			</div>
		</div>
	);
};
