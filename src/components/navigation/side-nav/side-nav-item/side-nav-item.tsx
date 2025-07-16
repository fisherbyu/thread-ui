'use client';
import { LinkWrapper } from '@/internal-components';
import { usePathname } from '@/utils';
import { Icon } from '@/components';
import { SideNavItemProps } from './side-nav-item.types';
import { css, cva } from '@/styled-system/css';

export const SideNavItem = ({ title, path, icon, onClick, basePath = '' }: SideNavItemProps) => {
	const currentPath = usePathname();
	const fullPath = path === '/' && basePath ? basePath : `${basePath}${path}`;
	const isActive = path === '/' ? currentPath === fullPath : currentPath.startsWith(fullPath);

	const styles = {
		link: css({
			display: 'flex',
			width: { sm: 'fit-content', md: '100%' },
			alignItems: 'center',
			paddingX: '16px',
			paddingY: '12px',
			borderRadius: 'md',
			borderStyle: 'solid',
			borderWidth: 'md',
			borderColor: { _hover: 'primary.light' },
		}),
		linkContents: cva({
			base: {
				display: { sm: 'none', md: 'block' },
			},
			variants: {
				isActive: {
					true: {
						color: 'primary.main',
					},
					false: {
						color: 'black',
					},
				},
			},
		}),
	};

	return (
		<LinkWrapper link={fullPath} className={styles.link} onClick={onClick}>
			<Icon color={isActive ? 'primary' : 'black'} name={icon} size={24} />
			<p className={styles.linkContents({ isActive })}>{title}</p>
		</LinkWrapper>
	);
};
