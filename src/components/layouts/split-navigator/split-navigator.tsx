'use client';
import { ReactNode, useEffect, useRef } from 'react';
import { css } from '@/styled-system/css';
import { useControllableState } from '@/internal';
import { SplitView, useSplitView } from '../split-view';
import {
	SplitNavigatorItem,
	SplitNavigatorProps,
	SplitNavigatorSection,
} from './split-navigator.types';

const styles = {
	empty: css({
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: '6',
		color: 'text.tertiary',
		fontSize: 'body.sm',
		textAlign: 'center',
	}),
};

const Empty = ({ children }: { children: ReactNode }) => (
	<div className={styles.empty}>{children}</div>
);

/**
 * Moves to the column matching the selection when it changes from outside a click,
 * such as a router navigation or browser back, so compact mode follows the URL.
 */
const SelectionSync = ({ section, item }: { section?: string; item: unknown }) => {
	const { show } = useSplitView();
	const previous = useRef({ section, item });

	useEffect(() => {
		const changed = previous.current.section !== section || previous.current.item !== item;
		previous.current = { section, item };
		if (changed) show(item != null ? 'detail' : 'list');
	});

	return null;
};

const SectionEntries = ({
	sections,
	selected,
	onSelect,
	getHref,
}: {
	sections: SplitNavigatorSection[];
	selected?: string;
	onSelect: (id: string) => void;
	getHref?: (section: SplitNavigatorSection) => string;
}) => {
	const { show } = useSplitView();
	return sections.map((section) => (
		<SplitView.Item
			key={section.id}
			icon={section.icon}
			active={section.id === selected}
			href={getHref?.(section)}
			onClick={() => {
				onSelect(section.id);
				show('list');
			}}
		>
			{section.title}
		</SplitView.Item>
	));
};

const ItemEntries = <T extends SplitNavigatorItem>({
	items,
	selected,
	onSelect,
	renderItem,
	getHref,
}: {
	items: T[];
	selected: T['id'] | null;
	onSelect: (id: T['id']) => void;
	renderItem: (item: T) => ReactNode;
	getHref?: (item: T) => string;
}) => {
	const { show } = useSplitView();
	return items.map((item) => (
		<SplitView.Item
			key={item.id}
			active={item.id === selected}
			href={getHref?.(item)}
			onClick={() => {
				onSelect(item.id);
				show('detail');
			}}
		>
			{renderItem(item)}
		</SplitView.Item>
	));
};

/**
 * Sidebar sections, a list of items, and a detail view, built on `SplitView`.
 *
 * - Tracks the selected section and item, controlled or uncontrolled
 * - Selecting a section clears the item; selections move phones to the next column
 * - Follows selection changes from outside (router, browser back) on phones
 * - Derives active markers, column titles, and back labels from the data
 * - Optional links via `getSectionHref` / `getItemHref`, plus empty states
 *
 * @example
 * <SplitNavigator
 *   sections={[{ id: 'inbox', title: 'Inbox', icon: 'Tray' }]}
 *   items={messages}
 *   renderItem={(msg) => msg.subject}
 *   renderDetail={(msg) => <Message message={msg} />}
 * />
 */
export const SplitNavigator = <T extends SplitNavigatorItem>({
	sections,
	items,
	renderItem,
	renderDetail,
	section: sectionProp,
	defaultSection,
	onSectionChange,
	item: itemProp,
	defaultItem = null,
	onItemChange,
	getSectionHref,
	getItemHref,
	sidebarTitle,
	listTitle,
	detailTitle,
	listActions,
	detailActions,
	emptyList = 'Nothing here yet',
	emptyDetail = 'Select an item',
	defaultColumn,
	...splitViewProps
}: SplitNavigatorProps<T>) => {
	const [sectionId, setSectionId] = useControllableState<string | undefined>({
		value: sectionProp,
		defaultValue: defaultSection ?? sections[0]?.id,
		onChange: (id) => {
			if (id) onSectionChange?.(id);
		},
	});
	const [itemId, setItemId] = useControllableState<T['id'] | null>({
		value: itemProp,
		defaultValue: defaultItem,
		onChange: onItemChange,
	});

	const section = sections.find(({ id }) => id === sectionId);
	const selected = items.find(({ id }) => id === itemId) ?? null;
	const selectedTitle = selected && detailTitle?.(selected);

	const selectSection = (id: string) => {
		if (id !== sectionId) {
			setSectionId(id);
			setItemId(null);
		}
	};

	return (
		<SplitView
			defaultColumn={defaultColumn ?? (selected ? 'detail' : 'list')}
			{...splitViewProps}
		>
			<SelectionSync section={sectionId} item={itemId} />
			<SplitView.Sidebar title={sidebarTitle}>
				<SectionEntries
					sections={sections}
					selected={sectionId}
					onSelect={selectSection}
					getHref={getSectionHref}
				/>
			</SplitView.Sidebar>
			<SplitView.List
				title={section && (listTitle?.(section) ?? section.title)}
				actions={section && listActions?.(section)}
			>
				{items.length ? (
					<ItemEntries<T>
						items={items}
						selected={itemId}
						onSelect={setItemId}
						renderItem={renderItem}
						getHref={
							section && getItemHref && ((item: T) => getItemHref(item, section))
						}
					/>
				) : (
					<Empty>{emptyList}</Empty>
				)}
			</SplitView.List>
			<SplitView.Detail
				title={selectedTitle}
				ariaLabel={typeof selectedTitle === 'string' ? selectedTitle : 'Details'}
				actions={selected && detailActions?.(selected)}
			>
				{selected ? renderDetail(selected) : <Empty>{emptyDetail}</Empty>}
			</SplitView.Detail>
		</SplitView>
	);
};
