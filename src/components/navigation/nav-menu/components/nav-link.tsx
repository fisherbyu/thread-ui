import { Link } from '@/internal-components';
import { css, cva } from '@/styled-system/css';
import { ReactNode } from 'react';

export type NavLinkProps = {
	children: ReactNode;
	href: string;
	halfPadding?: boolean;
	isDropdownItem?: boolean;
};

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
			gap: '1.5',
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
				true: {
					justifyContent: { base: 'center', lg: 'start' },
					width: { base: 'fit-content', lg: '100%' },
					whiteSpace: 'nowrap',
				},
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
