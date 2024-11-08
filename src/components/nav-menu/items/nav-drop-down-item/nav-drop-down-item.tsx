import { CSSProperties, useState } from 'react';
import { BaseItem } from '../base-item';
import { NavDropdownItemProps } from './nav-drop-down-item.types';
import { relative } from 'path';
import { NavMenuSpacing } from '../../nav-menu-spacing';
import { useTheme } from '../../../../utils';

export const NavDropdownItem = ({ title, items }: NavDropdownItemProps) => {
	const theme = useTheme();

	const [isHovered, setIsHovered] = useState(false);

	const xstyles: Record<string, CSSProperties> = {
		title: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: '2px',
		},

		anchor: {
			width: '100%',
			height: '0px',
		},

		dropdownContent: {
			height: 'fit-content',
			width: `calc(100% + ${NavMenuSpacing.paddingX * 1.75 * 2}px)`,
			position: 'relative',
			left: `-${NavMenuSpacing.paddingX * 1.75}px`,
			top: '-9px',
			display: 'flex',
			flexDirection: 'column',
			gap: '24px',
		},

		spacer: { height: '40px', width: '100%' },

		dropdownItems: {
			position: 'relative',
			width: `calc(100% + ${NavMenuSpacing.paddingX}px`,
			// width: '100%',
			height: 'fit-content',
			left: `-${NavMenuSpacing.paddingX * 0.5}px`,
			padding: `${NavMenuSpacing.paddingY}px ${NavMenuSpacing.paddingX}px`,
			display: 'flex',
			flexDirection: 'column',
		},
	};

	const styles: Record<string, CSSProperties> = {
		parentBlock: {
			position: 'relative',
			display: 'inline-flex',
		},

		textBlock: {
			display: 'flex',
			flexDirection: 'row',
			gap: '4px',
		},

		dropdownContent: {
			backgroundColor: 'white',
			boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
			position: 'absolute',
			width: 'fit-content', // Or any size needed for the dropdown
			borderRadius: theme.borders.radius.md,
			padding: `${NavMenuSpacing.paddingY}px ${NavMenuSpacing.paddingX}px`,
			zIndex: 10, // Ensures dropdown is on top of other content
			top: 'calc(100% + 30px)',

			left: '50%',
			transform: 'translateX(-50%)',
		},
	};
	return (
		<BaseItem
			href="#"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			optionalStyles={styles.parentBlock}
		>
			<div style={styles.textBlock}>
				Text
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
					className={` relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open] ${isHovered ? 'rotate-180' : ''}`}
				>
					<path d="m6 9 6 6 6-6"></path>
				</svg>
			</div>
			<div className="border" style={styles.dropdownContent}>
				{items.map((item) => (
					<BaseItem href={item.href}>{item.title}</BaseItem>
				))}
			</div>
		</BaseItem>
	);
	// return (
	// 	<BaseItem href="#" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
	// 		<div style={styles.anchor}>
	// 			<div id="dropdownContent" className="border" style={styles.dropdownContent}>
	// 				<div id="spacer" style={styles.spacer} />
	// 				<div style={styles.anchor}>
	// 					<div style={styles.dropdownItems} className="border">
	// 						{items.map((item) => (
	// 							<BaseItem href={item.href}>{item.title}</BaseItem>
	// 						))}
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 		<div style={styles.title}>
	// 			<span>{title}</span>
	// 			<span>X</span>
	// 		</div>
	// 	</BaseItem>
	// );
};
