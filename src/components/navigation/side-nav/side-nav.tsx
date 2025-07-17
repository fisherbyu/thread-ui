'use client';
import { css } from '@/styled-system/css';
import { SideNavItem } from './side-nav-item';
import { SideNavProps } from './side-nav.types';

/**
 * Standard User Dashboard for navigating between application views
 * @returns {JSX.Element} Standard Dashboard Menu
 */
export const SideNav = ({ logo, links, controls, basePath = '' }: SideNavProps) => {
	const styles = {
		navBar: css({
			width: { base: '16px', lg: '175px' },
			display: 'flex',
			flexDirection: 'column',
			gap: '16px',
			paddingY: '8px',
		}),
		linksBlock: css({
			display: 'flex',
			width: { base: '100%', lg: '95%' },
			marginX: 'auto',
			flexDirection: 'column',
		}),
	};
	return (
		<nav className={styles.navBar}>
			{logo && logo}
			<div className={styles.linksBlock}>
				{links.map((link) => (
					<SideNavItem key={link.title} {...link} basePath={basePath} />
				))}
			</div>
		</nav>
	);
};
