import { NavLinkProps } from './nav-link.types';
import { Link } from '@/internal-components';
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
			flexDirection: 'row',
			gap: '1',
			height: { base: 'auto', lg: '10' },
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
				true: {
					paddingY: '1',
					paddingX: '2',
				},
				false: {
					paddingY: '2',
					paddingX: '4',
				},
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
			<Link href={href} className={styles.link({ halfPadding, isDropdownItem })}>
				{children}
			</Link>
		</li>
	);
};
