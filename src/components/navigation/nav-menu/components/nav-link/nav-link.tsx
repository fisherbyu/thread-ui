import { NavLinkProps } from './nav-link.types';
import { LinkWrapper } from '@/internal-components';
import { css, cva } from '@/styled-system/css';
import { Text } from '@/components/typography';

const styles = {
	li: css({
		display: 'flex',
		alignItems: 'center',
		listStyleType: 'none',
	}),
	link: cva({
		base: {
			position: { base: 'static', lg: 'relative' },
			display: 'inline-flex',
			flexDirection: 'column',
			height: { base: 'auto', lg: '2.5rem' },
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: 'md',
			textDecoration: 'none',
			transition: 'all 150ms ease-in-out',
			margin: 'auto',
			_hover: {
				backgroundColor: 'hover',
			},
			_active: {
				backgroundColor: 'active',
			},
		},
		variants: {
			halfPadding: {
				true: { padding: '4px 8px' },
				false: { padding: '8px 16px' },
			},
			isDropdownItem: {
				true: { width: { base: 'fit-content', lg: '100%' } },
				false: { width: { base: '100%', lg: 'fit-content' } },
			},
		},
		defaultVariants: {
			halfPadding: false,
			isDropdownItem: false,
		},
	}),
};

export const NavLink = ({ children, href, halfPadding = false, isDropdownItem }: NavLinkProps) => {
	return (
		<li className={styles.li}>
			<LinkWrapper href={href} className={styles.link({ halfPadding, isDropdownItem })}>
				<Text size="sm" inline weight="medium">
					{children}
				</Text>
			</LinkWrapper>
		</li>
	);
};
