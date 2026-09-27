'use client';
import { css, cva } from '@/styled-system/css';
import { SideNavItem } from './side-nav-item';
import { SideNavProps } from './side-nav.types';

const styles = {
	navBar: cva({
		base: {
			display: 'flex',
			flexDirection: 'column',
			gap: '16px',
			paddingY: '8px',
		},
		variants: {
			collapse: {
				never: { width: '175px' },
				responsive: { width: { base: '64px', lg: '175px' } },
				always: { width: '64px' },
			},
		},
	}),
	linksBlock: css({
		display: 'flex',
		flexDirection: 'column',
	}),
	controlsBlock: css({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '8px',
		marginTop: 'auto',
	}),
};

/**
 * Vertical side navigation for dashboards. Collapses to a narrow icon-only rail on small screens,
 * or always / never with `collapsed`.
 *
 * @example
 * <SideNav
 *   logo={<Logo />}
 *   links={[{ title: 'Dashboard', href: '/dashboard', icon: 'House' }]}
 *   basePath="/app"
 *   activeColor="primary"
 * />
 */
export const SideNav = ({
	logo,
	links,
	controls,
	basePath = '',
	activeColor,
	collapsed,
}: SideNavProps) => {
	const collapse = collapsed === undefined ? 'responsive' : collapsed ? 'always' : 'never';

	return (
		<nav className={styles.navBar({ collapse })}>
			{logo && logo}
			<div className={styles.linksBlock}>
				{links.map((link) => (
					<SideNavItem
						key={link.title}
						{...link}
						basePath={basePath}
						activeColor={activeColor}
						collapse={collapse}
					/>
				))}
			</div>
			{controls && <div className={styles.controlsBlock}>{controls}</div>}
		</nav>
	);
};
