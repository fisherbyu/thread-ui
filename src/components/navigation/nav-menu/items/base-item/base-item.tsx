import { BaseItemProps } from './base-item.types';
import { LinkWrapper } from '@/internal-components';
import { css, cva } from '@/styled-system/css';

export const BaseItem = ({
	children,
	href,
	halfPadding = false,
	onMouseEnter,
	onMouseLeave,
	isDropdownItem,
}: BaseItemProps) => {
	const styles = {
		li: css({
			display: 'flex',
			alignItems: 'center',
			listStyleType: 'none',
		}),
		link: cva({
			base: {
				position: { sm: 'static', lg: 'relative' },
				display: 'inline-flex',
				flexDirection: 'column',
				height: { sm: 'auto', lg: '2.5rem' },
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '0.375rem',
				color: 'text.standard',
				fontSize: '0.875rem',
				fontWeight: 500,
				textDecoration: 'none',
				transition: 'all 150ms ease-in-out',
				margin: 'auto',
				_hover: {
					backgroundColor: 'elevated',
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

	// Handle hover state

	return (
		<li className={styles.li}>
			<LinkWrapper link={href} className={styles.link({ halfPadding, isDropdownItem })}>
				{children}
			</LinkWrapper>
		</li>
	);
};
