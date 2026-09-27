'use client';
import { cva } from '@/styled-system/css';
import { Icon } from '@/components/ui';
import { Link } from '../link';
import { NavListItemProps } from './nav-list-item.types';

const styles = {
	item: cva({
		base: {
			position: 'relative',
			display: 'flex',
			alignItems: 'center',
			gap: '2',
			width: 'calc(100% - token(spacing.4))',
			marginX: '2',
			marginY: '0.5',
			paddingX: '3',
			paddingY: '2',
			border: 'none',
			backgroundColor: 'transparent',
			color: 'text.secondary',
			fontSize: 'body.sm',
			textAlign: 'left',
			textDecoration: 'none',
			cursor: 'pointer',
			transition: 'background-color 150ms ease-in-out, color 150ms ease-in-out',
			'&:not([data-active]):hover': { backgroundColor: 'hover', color: 'text.standard' },
			// Colors set `--nav-item-fill` (and `--nav-item-text` when inverted text won't do),
			// so hover-while-active darkens every fill the same way
			'&[data-active]': {
				backgroundColor: 'var(--nav-item-fill)',
				color: 'var(--nav-item-text, token(colors.text.inverted))',
			},
			'&[data-active]:hover': {
				backgroundColor: 'color-mix(in srgb, var(--nav-item-fill), black 12%)',
			},
			_focusVisible: {
				outline: '2px solid',
				outlineColor: 'primary.main',
				outlineOffset: '-2px',
			},
		},
		variants: {
			shape: {
				pill: { borderRadius: 'full' },
				row: { borderRadius: 'md' },
			},
			activeColor: {
				primary: { '--nav-item-fill': 'token(colors.primary.main)' },
				secondary: { '--nav-item-fill': 'token(colors.secondary.main)' },
				tertiary: { '--nav-item-fill': 'token(colors.tertiary.main)' },
				// Inverted text turns dark in dark mode, which would vanish on black
				black: {
					'--nav-item-fill': 'token(colors.black)',
					'--nav-item-text': 'token(colors.white)',
				},
				gray: { '--nav-item-fill': 'token(colors.gray.main)' },
				success: { '--nav-item-fill': 'token(colors.success.main)' },
				error: { '--nav-item-fill': 'token(colors.error.main)' },
				warning: { '--nav-item-fill': 'token(colors.warning.main)' },
				info: { '--nav-item-fill': 'token(colors.info.main)' },
				text: { '--nav-item-fill': 'token(colors.text.standard)' },
				neutral: {
					'--nav-item-fill': 'token(colors.active)',
					'--nav-item-text': 'token(colors.text.standard)',
				},
			},
			collapse: {
				never: {},
				responsive: {
					width: { base: 'auto', lg: 'calc(100% - token(spacing.4))' },
					marginX: { base: 'auto', lg: '2' },
					paddingX: { base: '2', lg: '3' },
				},
				always: { width: 'auto', marginX: 'auto', paddingX: '2' },
			},
		},
	}),
	label: cva({
		base: { flex: 1, minWidth: 0 },
		variants: {
			// Visually hidden rather than removed, so collapsed links keep their accessible name
			collapse: {
				never: {},
				responsive: { srOnly: { base: true, lg: false } },
				always: { srOnly: true },
			},
		},
	}),
};

/**
 * Selectable navigation row shared by `SideNav` and `SplitView`: rest, hover, active fill,
 * and a darker fill when hovering the active item.
 *
 * @example
 * <NavItem href="/inbox" icon="Tray" active>Inbox</NavItem>
 */
export const NavItem = ({
	children,
	active = false,
	icon,
	href,
	onClick,
	activeColor = 'primary',
	shape = 'pill',
	collapse = 'never',
}: NavListItemProps) => {
	const className = styles.item({ shape, activeColor, collapse });
	const content = (
		<>
			{icon && <Icon name={icon} size={16} filled={active} />}
			<span className={styles.label({ collapse })}>{children}</span>
		</>
	);

	if (href) {
		return (
			<Link
				href={href}
				onClick={onClick}
				className={className}
				data-active={active || undefined}
				aria-current={active ? 'page' : undefined}
			>
				{content}
			</Link>
		);
	}

	return (
		<button
			type="button"
			onClick={onClick}
			className={className}
			data-active={active || undefined}
			aria-current={active || undefined}
		>
			{content}
		</button>
	);
};
