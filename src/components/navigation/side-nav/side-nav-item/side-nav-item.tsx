'use client';
import { LinkWrapper } from '@/internal-components';
import { usePathname } from '@/hooks';
import { Icon } from '@/components';
import { SideNavItemProps } from './side-nav-item.types';
import { css, cva } from '@/styled-system/css';

const styles = {
	link: cva({
		base: {
			display: 'flex',
			gap: '8px',
			width: '100%',
			alignItems: 'center',
			paddingX: '16px',
			paddingY: '8px',
			marginY: '4px',
			marginX: 'auto',
			borderWidth: 'md',
			borderColor: 'xbackgroundx',
			backgroundColor: 'xbackgroundx',
			borderRadius: '20px',
			borderStyle: 'solid',
			_hover: {
				borderColor: 'primary.main',
				color: 'primary.main',
			},
		},
		variants: {
			isActive: {
				true: {
					color: 'text.inverted',
					backgroundColor: 'primary.main',
					borderColor: 'primary.main',
					_hover: { backgroundColor: 'primary.light', color: 'text.inverted' },
				},
				false: {
					color: 'text.standard',
					backgroundColor: 'xbackgroundx',
				},
			},
		},
	}),
	linkContents: css({
		display: { base: 'none', lg: 'block' },
		color: 'inherit',
	}),
};

export const SideNavItem = ({ title, path, icon, onClick, basePath = '' }: SideNavItemProps) => {
	const currentPath = usePathname();
	const fullPath = path === '/' && basePath ? basePath : `${basePath}${path}`;
	const isActive = path === '/' ? currentPath === fullPath : currentPath.startsWith(fullPath);

	return (
		<LinkWrapper link={fullPath} className={styles.link({ isActive })} onClick={onClick}>
			<Icon name={icon} size={24} filled={isActive} />
			<p className={styles.linkContents}>{title}</p>
		</LinkWrapper>
	);
};
