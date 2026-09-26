'use client';
import { cva } from '@/styled-system/css';
import { Icon } from '@/components/ui';
import { Link } from '@/internal';
import { useSplitView, useSplitViewColumn } from '../split-view-context';
import { SplitViewItemProps } from '../split-view.types';

const styles = {
	item: cva({
		base: {
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
			_hover: { backgroundColor: 'hover', color: 'text.standard' },
			'&[data-active]': { color: 'text.inverted' },
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
			// Active marker fill; text inverts by default (see base) and overrides where it can't
			color: {
				primary: { '&[data-active]': { backgroundColor: 'primary.main' } },
				secondary: { '&[data-active]': { backgroundColor: 'secondary.main' } },
				tertiary: { '&[data-active]': { backgroundColor: 'tertiary.main' } },
				black: { '&[data-active]': { backgroundColor: 'black', color: 'white' } },
				gray: { '&[data-active]': { backgroundColor: 'gray.main' } },
				success: { '&[data-active]': { backgroundColor: 'success.main' } },
				error: { '&[data-active]': { backgroundColor: 'error.main' } },
				warning: { '&[data-active]': { backgroundColor: 'warning.main' } },
				info: { '&[data-active]': { backgroundColor: 'info.main' } },
				text: { '&[data-active]': { backgroundColor: 'text.standard' } },
				neutral: {
					'&[data-active]': { backgroundColor: 'active', color: 'text.standard' },
				},
			},
		},
	}),
	label: cva({ base: { flex: 1, minWidth: 0 } }),
};

/**
 * Selectable row inside a `SplitView` column: a pill in the sidebar, a rounded row in the list.
 * Shows the active marker in the column's color (`sidebarActiveColor` / `listActiveColor`).
 *
 * @example
 * <SplitView.Item active={folder === 'Inbox'} icon="Tray" onClick={() => openFolder('Inbox')}>
 *   Inbox
 * </SplitView.Item>
 */
export const SplitViewItem = ({
	children,
	active = false,
	icon,
	href,
	onClick,
}: SplitViewItemProps) => {
	const { activeColors } = useSplitView();
	const column = useSplitViewColumn();

	const className = styles.item({
		shape: column === 'sidebar' ? 'pill' : 'row',
		color: activeColors[column],
	});
	const content = (
		<>
			{icon && <Icon name={icon} size={16} filled={active} />}
			<span className={styles.label()}>{children}</span>
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
