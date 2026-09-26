'use client';
import { useEffect, useRef } from 'react';
import { cva } from '@/styled-system/css';
import { useDismiss } from '@/hooks';
import { SplitViewColumnProvider, useSplitView } from '../split-view-context';
import { SplitViewHeader } from './split-view-header';
import { SplitViewColumn as Column, SplitViewColumnProps } from '../split-view.types';

// Surface layer card, shared by the detail and the joined list + detail
const cardStyles = {
	borderWidth: '1px',
	borderColor: 'structure.subtle',
	borderRadius: 'lg',
	boxShadow: 'sm',
} as const;

const styles = {
	column: cva({
		base: {
			display: 'flex',
			flexDirection: 'column',
			minWidth: 0,
			overflowY: 'auto',
			backgroundColor: 'surface',
			outline: 'none',
			transitionProperty: 'transform, margin, visibility',
			transitionDuration: '300ms',
			transitionTimingFunction: 'ease-in-out',
			_motionReduce: { transition: 'none' },

			// Compact: columns stack; earlier ones sit behind, later ones wait offscreen
			mdDown: {
				position: 'absolute',
				inset: 0,
				'&[data-position=before]': { transform: 'translateX(-30%)', zIndex: 0 },
				'&[data-position=current]': { transform: 'translateX(0)', zIndex: 1 },
				'&[data-position=after]': { transform: 'translateX(100%)', zIndex: 2 },
			},
		},
		variants: {
			column: {
				// Elevated card in both variants; rises to the overlay layer when it covers content
				sidebar: {
					md: {
						flexShrink: 0,
						width: 'var(--split-view-sidebar-width)',
						backgroundColor: 'elevated',
						borderWidth: '1px',
						borderColor: 'structure.subtle',
						borderRadius: 'lg',
						boxShadow: 'md',
					},
					// Medium: overlay drawer, open only once mounted in medium mode
					mdToLg: {
						position: 'absolute',
						top: 'var(--split-view-gap)',
						bottom: 'var(--split-view-gap)',
						left: 'var(--split-view-gap)',
						zIndex: 4,
						backgroundColor: 'overlay',
						borderColor: 'transparent',
						boxShadow: 'lg',
						transform: 'translateX(calc(-100% - 2 * var(--split-view-gap)))',
						visibility: 'hidden',
						'&[data-overlay=open]': {
							transform: 'translateX(0)',
							visibility: 'visible',
						},
					},
					// Wide: docked, slides out of flow (with its gap) when closed
					lg: {
						// Hidden once slid out, so its shadow can't show at the edge
						_closed: {
							visibility: 'hidden',
							marginLeft:
								'calc(-1 * (var(--split-view-sidebar-width) + var(--split-view-gap)))',
						},
					},
				},
				list: {
					md: { flexShrink: 0, width: 'var(--split-view-list-width)' },
				},
				detail: {
					md: { flex: 1 },
				},
			},
			variant: {
				floating: {},
				layered: {},
			},
			// Whether the detail shares its card with the list
			joined: {
				true: {},
				false: {},
			},
		},
		compoundVariants: [
			// Floating: list and detail join into one surface card beside the sidebar
			{
				column: 'sidebar',
				variant: 'floating',
				css: { lg: { marginRight: 'var(--split-view-gap)' } },
			},
			{
				column: 'list',
				variant: 'floating',
				css: {
					md: {
						...cardStyles,
						borderTopRightRadius: '0',
						borderBottomRightRadius: '0',
						// Clip the shadow where the list meets the detail
						clipPath: 'inset(-12px 0 -12px -12px)',
					},
				},
			},
			{
				column: 'detail',
				variant: 'floating',
				joined: true,
				css: {
					md: {
						...cardStyles,
						borderLeftWidth: '0',
						borderTopLeftRadius: '0',
						borderBottomLeftRadius: '0',
						clipPath: 'inset(-12px -12px -12px 0)',
					},
				},
			},
			// Without a list, the detail is a card of its own
			{
				column: 'detail',
				variant: 'floating',
				joined: false,
				css: { md: cardStyles },
			},
			// Layered: list on the canvas, detail as its own surface card
			{
				column: 'list',
				variant: 'layered',
				css: { md: { backgroundColor: 'canvas' } },
			},
			{
				column: 'detail',
				variant: 'layered',
				css: { md: cardStyles },
			},
		],
	}),
};

const elements = { sidebar: 'nav', list: 'section', detail: 'section' } as const;

/** Internal column shared by `SplitView.Sidebar`, `SplitView.List` and `SplitView.Detail`. */
export const SplitViewColumn = ({
	column,
	title,
	actions,
	ariaLabel = typeof title === 'string' ? title : undefined,
	children,
}: SplitViewColumnProps & { column: Column }) => {
	const {
		variant,
		mode,
		column: activeColumn,
		columns,
		sidebarOpen,
		setSidebarOpen,
	} = useSplitView();
	const ref = useRef<HTMLElement>(null);
	const Element = elements[column];

	const index = columns.indexOf(column);
	const activeIndex = columns.indexOf(activeColumn);
	const position = index < activeIndex ? 'before' : index === activeIndex ? 'current' : 'after';

	const isOverlay = column === 'sidebar' && mode === 'medium';
	const isOverlayOpen = isOverlay && sidebarOpen;
	const isHidden =
		mode === 'compact'
			? position !== 'current'
			: column === 'sidebar'
				? !sidebarOpen
				: mode === 'medium' && sidebarOpen;

	// A column comes to the front when pushed in compact mode or opened as the overlay
	const isForeground = mode === 'compact' ? position === 'current' : isOverlayOpen;
	const previous = useRef({ mode, isForeground });
	const returnFocusRef = useRef<HTMLElement | null>(null);

	// Move focus with navigation, but not when the mode itself changes (mount, resize)
	useEffect(() => {
		const { mode: prevMode, isForeground: wasForeground } = previous.current;
		previous.current = { mode, isForeground };
		if (prevMode !== mode || wasForeground === isForeground) return;

		if (isForeground) {
			if (isOverlay) returnFocusRef.current = document.activeElement as HTMLElement | null;
			ref.current?.focus({ preventScroll: true });
		} else if (isOverlay && ref.current?.contains(document.activeElement)) {
			returnFocusRef.current?.focus({ preventScroll: true });
		}
	}, [mode, isForeground, isOverlay]);

	useDismiss({
		elementRef: ref,
		isOpen: isOverlayOpen,
		onClose: () => setSidebarOpen(false),
		dismissOnClick: false,
	});

	return (
		<Element
			ref={ref}
			tabIndex={-1}
			aria-label={ariaLabel}
			role={isOverlay ? 'dialog' : undefined}
			aria-modal={isOverlayOpen || undefined}
			inert={isHidden}
			data-position={position}
			data-state={column === 'sidebar' ? (sidebarOpen ? 'open' : 'closed') : undefined}
			data-overlay={isOverlay ? (sidebarOpen ? 'open' : 'closed') : undefined}
			className={styles.column({ column, variant, joined: columns.includes('list') })}
		>
			<SplitViewColumnProvider value={column}>
				{(title || actions) && <SplitViewHeader title={title} actions={actions} />}
				{children}
			</SplitViewColumnProvider>
		</Element>
	);
};
