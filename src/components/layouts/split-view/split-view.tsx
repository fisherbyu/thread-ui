'use client';
import { Children, CSSProperties, isValidElement, useLayoutEffect, useMemo, useRef } from 'react';
import { css, cva } from '@/styled-system/css';
import { useMediaQuery } from '@/hooks';
import { useControllableState } from '@/internal';
import { SplitViewProvider } from './split-view-context';
import { SplitViewDetail, SplitViewList, SplitViewSidebar } from './components/split-view-panes';
import {
	SplitViewColumn,
	SplitViewColumnProps,
	SplitViewMode,
	SplitViewProps,
	SplitViewState,
} from './split-view.types';

// Match Panda's `mdDown` and `mdToLg` conditions
const COMPACT_QUERY = '(max-width: 767.98px)';
const MEDIUM_QUERY = '(min-width: 768px) and (max-width: 1023.98px)';

const styles = {
	root: cva({
		base: {
			position: 'relative',
			display: 'flex',
			width: '100%',
			height: '100%',
			overflow: 'hidden',
			isolation: 'isolate',
			backgroundColor: 'surface',
			md: { padding: 'var(--split-view-gap)', backgroundColor: 'canvas' },
		},
		variants: {
			variant: {
				floating: {},
				layered: { md: { gap: 'var(--split-view-gap)' } },
			},
		},
	}),
	scrim: css({
		display: 'none',
		mdToLg: {
			display: 'block',
			position: 'absolute',
			inset: 0,
			zIndex: 3,
			backgroundColor: 'scrim.medium',
			opacity: 0,
			pointerEvents: 'none',
			transition: 'opacity 300ms ease-in-out',
			_motionReduce: { transition: 'none' },
			'&[data-state=open]': { opacity: 1, pointerEvents: 'auto' },
		},
	}),
};

/**
 * Three-column layout views: sidebar, list and detail side by side on wide screens,
 * the sidebar as an overlay at medium widths, and a push/pop stack of columns on phones.
 *
 * Both the frontmost column and sidebar visibility work controlled (`column`, `sidebarOpen`) or
 * uncontrolled (`defaultColumn`, `defaultSidebarOpen`). Descendants navigate with `useSplitView`.
 * `SplitView.List` is optional; without it the layout has two columns.
 *
 * @example
 * <SplitView>
 *   <SplitView.Sidebar ariaLabel="Folders"><Folders /></SplitView.Sidebar>
 *   <SplitView.List ariaLabel="Messages"><Messages /></SplitView.List>
 *   <SplitView.Detail ariaLabel="Message">
 *     <SplitView.BackButton />
 *     <Message />
 *   </SplitView.Detail>
 * </SplitView>
 */
export const SplitViewRoot = ({
	children,
	column: columnProp,
	defaultColumn,
	onColumnChange,
	sidebarOpen: sidebarOpenProp,
	defaultSidebarOpen = true,
	onSidebarOpenChange,
	sidebarWidth = '240px',
	listWidth = '320px',
	variant = 'floating',
	sidebarActiveColor = 'primary',
	listActiveColor = 'neutral',
}: SplitViewProps) => {
	const isCompact = useMediaQuery(COMPACT_QUERY);
	const isMedium = useMediaQuery(MEDIUM_QUERY);
	// Neither matches before mount, so SSR renders wide behavior; CSS handles layout at every width
	const mode: SplitViewMode = isCompact ? 'compact' : isMedium ? 'medium' : 'wide';

	// Read columns straight from children so compact mode and back labels are right on first render
	const columnTypes = [
		[SplitViewSidebar, 'sidebar'],
		[SplitViewList, 'list'],
		[SplitViewDetail, 'detail'],
	] as const;
	const titles: SplitViewState['titles'] = {};
	let hasList = false;
	Children.forEach(children, (child) => {
		if (!isValidElement<SplitViewColumnProps>(child)) return;
		const match = columnTypes.find(([type]) => child.type === type);
		if (!match) return;
		if (match[1] === 'list') hasList = true;
		if (typeof child.props.title === 'string') titles[match[1]] = child.props.title;
	});
	const columns: SplitViewColumn[] = hasList
		? ['sidebar', 'list', 'detail']
		: ['sidebar', 'detail'];

	const [storedColumn, setColumn] = useControllableState<SplitViewColumn>({
		value: columnProp,
		defaultValue: defaultColumn ?? (hasList ? 'list' : 'sidebar'),
		onChange: onColumnChange,
	});
	const column = columns.includes(storedColumn) ? storedColumn : 'detail';

	const [sidebarOpen, setSidebarOpenState] = useControllableState<boolean>({
		value: sidebarOpenProp,
		defaultValue: defaultSidebarOpen,
		onChange: onSidebarOpenChange,
	});
	const setSidebarOpen = (open: boolean) => {
		if (open !== sidebarOpen) setSidebarOpenState(open);
	};

	// Like iPadOS: entering medium tucks the overlay away, entering wide docks the sidebar again.
	// Layout effect so the overlay never paints open when first mounting at medium width.
	const previousMode = useRef(mode);
	useLayoutEffect(() => {
		if (previousMode.current === mode) return;
		previousMode.current = mode;
		if (mode === 'medium') setSidebarOpen(false);
		if (mode === 'wide') setSidebarOpen(true);
	});

	const index = columns.indexOf(column);

	const show = (next: SplitViewColumn) => {
		if (next !== column) setColumn(next);
		if (mode === 'medium') setSidebarOpen(next === 'sidebar');
		if (mode === 'wide' && next === 'sidebar') setSidebarOpen(true);
	};

	const state: SplitViewState = {
		variant,
		activeColors: {
			sidebar: sidebarActiveColor,
			list: listActiveColor,
			detail: listActiveColor,
		},
		titles,
		mode,
		column,
		columns,
		canGoBack: index > 0,
		sidebarOpen,
		show,
		back: () => index > 0 && show(columns[index - 1]),
		setSidebarOpen,
		toggleSidebar: () => setSidebarOpen(!sidebarOpen),
	};

	const cssVariables = useMemo(
		() =>
			({
				'--split-view-sidebar-width': sidebarWidth,
				'--split-view-list-width': listWidth,
				'--split-view-gap': '8px',
			}) as CSSProperties,
		[sidebarWidth, listWidth]
	);

	return (
		<SplitViewProvider value={state}>
			<div className={styles.root({ variant })} style={cssVariables}>
				{children}
				<div
					aria-hidden
					className={styles.scrim}
					data-state={mode === 'medium' && sidebarOpen ? 'open' : 'closed'}
					onClick={() => setSidebarOpen(false)}
				/>
			</div>
		</SplitViewProvider>
	);
};
