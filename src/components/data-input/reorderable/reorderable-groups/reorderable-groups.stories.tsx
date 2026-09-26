import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReorderableGroups } from './reorderable-groups';
import type { ReorderableGroup, ReorderableGroupsProps } from './reorderable-groups.types';
import type { ReorderableItemProps, ReorderableWrapperProps } from '../shared';

type Tile = { id: string; name: string; color: string; order: number };
type Tier = ReorderableGroup<Tile>;

const TILE_ROW_HEIGHT = 72;

const initialTiers: Tier[] = [
	{ id: 'S', title: 'S', items: [{ id: 'a', name: 'Alpha', color: '#FAC898', order: 0 }] },
	{ id: 'A', title: 'A', items: [{ id: 'b', name: 'Bravo', color: '#FBBF24', order: 0 }] },
	{ id: 'B', title: 'B', items: [] },
	{ id: 'C', title: 'C', items: [] },
	{
		id: 'pool',
		title: 'Unranked',
		items: [
			{ id: 'c', name: 'Charlie', color: '#34D399', order: 0 },
			{ id: 'd', name: 'Delta', color: '#60A5FA', order: 1 },
			{ id: 'e', name: 'Echo', color: '#818CF8', order: 2 },
		],
	},
];

const getTileLabel = (tile: Tile) => tile.name;

// Uniform-height row for each tier's items
const TierItems = ({ children }: ReorderableWrapperProps) => (
	<div
		style={{
			display: 'flex',
			flexWrap: 'wrap',
			alignItems: 'center',
			width: '100%',
			minHeight: TILE_ROW_HEIGHT,
		}}
	>
		{children}
	</div>
);

// Whole tile is the handle via `dragHandleProps`
const TierTile = ({ item, dragHandleProps, isDragging }: ReorderableItemProps<Tile>) => (
	<div
		{...dragHandleProps}
		style={{
			...dragHandleProps.style,
			width: 64,
			height: 64,
			margin: 4,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: 8,
			background: item.color,
			color: '#fff',
			fontSize: 12,
			cursor: isDragging ? 'grabbing' : 'grab',
		}}
	>
		{item.name}
	</div>
);

const Demo = ({
	title,
	titlePosition,
	sortableGroups,
	layout,
	groupLayout,
}: Pick<
	ReorderableGroupsProps<Tier>,
	'title' | 'titlePosition' | 'sortableGroups' | 'layout' | 'groupLayout'
>) => {
	const [tiers, setTiers] = useState(initialTiers);
	return (
		<ReorderableGroups
			name="tiers"
			title={title}
			titlePosition={titlePosition}
			sortableGroups={sortableGroups}
			layout={layout}
			groupLayout={groupLayout}
			value={tiers}
			orderProperty="order"
			ItemComponent={TierTile}
			ItemsWrapper={TierItems}
			onChange={setTiers}
			getItemLabel={getTileLabel}
		/>
	);
};

const meta: Meta<typeof ReorderableGroups> = {
	title: 'Data Input/ReorderableGroups',
	component: ReorderableGroups,
	parameters: { layout: 'padded' },
	argTypes: {
		title: { control: 'text' },
		titlePosition: { control: 'select', options: ['top', 'start'] },
		sortableGroups: { control: 'boolean' },
		layout: { control: 'select', options: ['vertical', 'horizontal', 'grid'] },
		groupLayout: { control: 'select', options: ['vertical', 'horizontal', 'grid'] },
	},
	args: {
		title: 'Tier List',
		titlePosition: 'start',
		sortableGroups: true,
		layout: 'grid',
		groupLayout: 'vertical',
	},
};

export default meta;
type Story = StoryObj<typeof ReorderableGroups>;

export const Default: Story = {
	render: ({ title, titlePosition, sortableGroups, layout, groupLayout }: any) => (
		<Demo
			title={title}
			titlePosition={titlePosition}
			sortableGroups={sortableGroups}
			layout={layout}
			groupLayout={groupLayout}
		/>
	),
};
