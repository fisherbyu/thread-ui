import React, { CSSProperties } from 'react';
import { useTheme, useResponsiveStyles } from '../../../../utils';
import { BaseItemProps } from './base-item.types';
import { Link } from '../../../../internal-components';
import { NavMenuSpacing } from '../../nav-menu-spacing';

export const BaseItem = ({ children, href, padding, onMouseEnter, onMouseLeave, isDropdownItem }: BaseItemProps) => {
	const theme = useTheme();

	const styles: Record<string, CSSProperties> = {
		li: {
			display: 'flex',
			alignItems: 'center',
			listStyleType: 'none',
		},
		link: {
			position: 'relative',
			display: 'inline-flex',
			flexDirection: 'column',
			height: '2.5rem',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '0.375rem',
			backgroundColor: theme.colors.background.light,
			color: theme.colors.text.light.primary,
			fontSize: '0.875rem',
			fontWeight: 500,
			padding: padding ?? `${NavMenuSpacing.paddingY / 2}px ${NavMenuSpacing.paddingX}px`,
			width: isDropdownItem
				? useResponsiveStyles({ base: 'fit-content', lg: '100%' })
				: useResponsiveStyles({ base: '100%', lg: 'fit-content' }),
			textDecoration: 'none',
			transition: 'all 150ms ease-in-out',
			margin: 'auto',
		},

		linkHover: {
			backgroundColor: theme.colors.gray.light,
			color: theme.colors.gray.dark,
		},
	};

	// Handle hover state
	const [isHovered, setIsHovered] = React.useState(false);

	return (
		<li onMouseEnter={onMouseEnter} style={styles.li} onMouseLeave={onMouseLeave}>
			<Link
				href={href}
				style={{
					...styles.link,
					...(isHovered ? styles.linkHover : {}),
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{children}
			</Link>
		</li>
	);
};
