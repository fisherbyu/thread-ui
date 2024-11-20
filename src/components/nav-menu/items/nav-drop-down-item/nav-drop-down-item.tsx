import { CSSProperties, useState } from 'react';
import { BaseItem } from '../base-item';
import { NavDropdownItemProps } from './nav-drop-down-item.types';
import { NavMenuStyles } from '../../nav-menu-styles';
import { useResponsiveStyles, useTheme } from '../../../../utils';

export const NavDropdownItem = ({ title, items }: NavDropdownItemProps) => {
	const theme = useTheme();

	const [isHovered, setIsHovered] = useState(false);

	const targetSpacer = useResponsiveStyles({ base: '0px', lg: '30px' });

	const styles: Record<string, CSSProperties> = {
		parentBlock: {
			position: useResponsiveStyles({ base: 'static', lg: 'relative' }) as React.CSSProperties['position'],
		},
		textBlock: {
			display: 'flex',
			flexDirection: 'row',
			gap: '4px',
			justifyContent: 'center',
			alignItems: 'center',
		},

		arrow: {
			marginTop: '1px',
			height: '12px',
			width: '12px',
			transition: 'all 200ms',
			transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)',
		},

		targetArea: {
			position: 'absolute',
			width: `calc(100% + ${NavMenuStyles.paddingX * 2}px)`,
			height: targetSpacer,
			left: '50%',
			transform: 'translateX(-50%)',
			bottom: `-${targetSpacer}`,
		},

		dropdownContent: {
			display: isHovered ? 'block' : 'none',
			backgroundColor: theme.colors.background.light,
			borderWidth: '1px',
			boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
			position: 'absolute',
			width: 'fit-content',
			borderRadius: theme.borders.radius.md,
			padding: `${NavMenuStyles.paddingY}px ${NavMenuStyles.paddingX}px`,
			zIndex: 10,
			top: `calc(100% + ${targetSpacer})`,
			left: '50%',
			transform: 'translateX(-50%)',
		},

		collapsedDropdownContent: {
			display: isHovered ? 'flex' : 'none',
			justifyContent: 'center',
			columnGap: '24px',
			alignItems: 'center',
			backgroundColor: theme.colors.background.light,
			width: '100%',
			borderRadius: theme.borders.radius.md,
			zIndex: 10,
		},
	};

	return (
		<div style={styles.parentBlock} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<BaseItem href="#">
				<div style={styles.textBlock}>
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
						style={styles.arrow}
					>
						<path d="m6 9 6 6 6-6"></path>
					</svg>
				</div>
			</BaseItem>
			{isHovered && <div style={styles.targetArea} />}
			<div style={useResponsiveStyles({ base: styles.collapsedDropdownContent, lg: styles.dropdownContent })}>
				{items.map((item) => (
					<BaseItem href={item.href} isDropdownItem>
						{item.title}
					</BaseItem>
				))}
			</div>
		</div>
	);
};
