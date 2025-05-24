'use client';
import { BaseItemProps } from './base-item.types';
import { LinkWrapper } from '@/internal-components';
import { NavMenuStyles } from '../../nav-menu-styles';
import { ThreadTheme, useThreadStyleObjects } from '@/functions';

export const BaseItem = ({ children, href, padding, onMouseEnter, onMouseLeave, isDropdownItem }: BaseItemProps) => {
	const styles = useThreadStyleObjects({
		li: {
			display: 'flex',
			alignItems: 'center',
			listStyleType: 'none',
		},
		link: {
			position: { sm: 'static', lg: 'relative' },
			display: 'inline-flex',
			flexDirection: 'column',
			height: { sm: 'auto', lg: '2.5rem' },
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '0.375rem',
			color: ThreadTheme.text.standard,
			fontSize: '0.875rem',
			fontWeight: 500,
			padding: padding ?? `${NavMenuStyles.paddingY / 2}px ${NavMenuStyles.paddingX}px`,
			width: isDropdownItem ? { sm: 'fit-content', lg: '100%' } : { sm: '100%', lg: 'fit-content' },
			textDecoration: 'none',
			transition: 'all 150ms ease-in-out',
			margin: 'auto',
			hover: {
				backgroundColor: ThreadTheme.elevated,
				color: ThreadTheme.gray.dark,
			},
		},
	});

	// Handle hover state

	return (
		<li className={styles.li}>
			<LinkWrapper link={href} className={styles.link}>
				{children}
			</LinkWrapper>
		</li>
	);
};
