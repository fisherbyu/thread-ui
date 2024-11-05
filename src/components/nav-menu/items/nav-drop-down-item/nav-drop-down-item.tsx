import { CSSProperties, useState } from 'react';
import { BaseItem } from '../base-item';
import { NavDropdownItemProps } from './nav-drop-down-item.types';
import { relative } from 'path';
import { NavMenuSpacing } from '../../nav-menu-spacing';

export const NavDropdownItem = ({ title, items }: NavDropdownItemProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const styles: Record<string, CSSProperties> = {
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
			// width: `calc(100% + ${NavMenuSpacing.paddingX}px`,
			width: '100%',
			height: 'fit-content',
			left: `-${NavMenuSpacing.paddingX * 0.5}px`,
			padding: `${NavMenuSpacing.paddingY}px ${NavMenuSpacing.paddingX}px`,
			display: 'flex',
			flexDirection: 'column',
		},
	};
	return (
		<BaseItem href="#" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<div style={styles.anchor}>
				<div id="dropdownContent" className="border" style={styles.dropdownContent}>
					<div id="spacer" style={styles.spacer} />
					<div style={styles.anchor}>
						<div style={styles.dropdownItems} className="border">
							{/* {items.map((item) => (
								<BaseItem href={item.href}>{item.title}</BaseItem>
							))} */}
						</div>
					</div>
				</div>
			</div>
			<div style={styles.title}>
				<span>{title}</span>
				<span>X</span>
			</div>
		</BaseItem>
	);
};
