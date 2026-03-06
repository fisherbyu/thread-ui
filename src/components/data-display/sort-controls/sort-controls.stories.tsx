import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SortControls } from './sort-controls';
import { useSortControls } from './use-sort-controls';

const meta: Meta<typeof SortControls> = {
	title: 'Components/SortControls',
	component: SortControls,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SortControls>;

// ─── Sample data ───────────────────────────────────────────────────────────

const SAMPLE_DATA = [
	{ title: 'Pasta Carbonara', type: 'Dinner', rating: 4.8 },
	{ title: 'Avocado Toast', type: 'Breakfast', rating: 3.9 },
	{ title: 'Caesar Salad', type: 'Lunch', rating: 4.2 },
	{ title: 'Beef Tacos', type: 'Dinner', rating: 4.6 },
	{ title: 'Blueberry Pancakes', type: 'Breakfast', rating: 4.5 },
];

// ─── Stories ───────────────────────────────────────────────────────────────

export const Default: Story = {
	render: () => {
		const { sortedData, sortControlsProps } = useSortControls({
			data: SAMPLE_DATA,
			fields: [
				{ key: 'title', label: 'Title', icon: 'TextAa' },
				{ key: 'type', label: 'Type', icon: 'ExcludeIcon' },
				{ key: 'rating', label: 'Rating', icon: 'RankingIcon' },
			],
		});

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 480 }}>
				<SortControls {...sortControlsProps} />
				<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
					<thead>
						<tr>
							{['Title', 'Type', 'Rating'].map((h) => (
								<th
									key={h}
									style={{
										textAlign: 'left',
										padding: '4px 8px',
										borderBottom: '1px solid #e2e8f0',
									}}
								>
									{h}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sortedData.map((row) => (
							<tr key={row.title}>
								<td style={{ padding: '4px 8px' }}>{row.title}</td>
								<td style={{ padding: '4px 8px' }}>{row.type}</td>
								<td style={{ padding: '4px 8px' }}>{row.rating}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	},
};

export const MultiSort: Story = {
	render: () => {
		const { sortedData, sortControlsProps } = useSortControls({
			data: SAMPLE_DATA,
			fields: [
				{ key: 'title', label: 'Title' },
				{ key: 'type', label: 'Type' },
				{ key: 'rating', label: 'Rating' },
			],
			multi: true,
		});

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 480 }}>
				<SortControls {...sortControlsProps} />
				<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
					<thead>
						<tr>
							{['Title', 'Type', 'Rating'].map((h) => (
								<th
									key={h}
									style={{
										textAlign: 'left',
										padding: '4px 8px',
										borderBottom: '1px solid #e2e8f0',
									}}
								>
									{h}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sortedData.map((row) => (
							<tr key={row.title}>
								<td style={{ padding: '4px 8px' }}>{row.title}</td>
								<td style={{ padding: '4px 8px' }}>{row.type}</td>
								<td style={{ padding: '4px 8px' }}>{row.rating}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	},
};
