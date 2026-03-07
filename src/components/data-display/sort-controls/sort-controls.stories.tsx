'use client';
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SortControls } from './sort-controls';
import { useSortControls } from './use-sort-controls';
import { Text } from '../../typography';

const meta: Meta<typeof SortControls> = {
	title: 'Data Display/SortControls',
	component: SortControls,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'Size applied to all sort control buttons',
		},
		color: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'tertiary', 'info', 'success', 'error'],
			description: 'Fallback color for buttons that do not have a field-level color',
		},
	},
	args: {
		size: 'sm',
		color: 'tertiary',
	},
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

const PLAYER_DATA = [
	{ name: 'Jordan Mills', team: 'Alpha', position: 'Forward', goals: 12 },
	{ name: 'Casey Brooks', team: 'Beta', position: 'Forward', goals: 9 },
	{ name: 'Riley Shaw', team: 'Alpha', position: 'Midfield', goals: 6 },
	{ name: 'Morgan Lee', team: 'Beta', position: 'Forward', goals: 14 },
	{ name: 'Taylor Quinn', team: 'Alpha', position: 'Forward', goals: 7 },
	{ name: 'Drew Hanson', team: 'Gamma', position: 'Defense', goals: 2 },
	{ name: 'Avery Cole', team: 'Beta', position: 'Midfield', goals: 5 },
	{ name: 'Cameron Fox', team: 'Gamma', position: 'Forward', goals: 11 },
	{ name: 'Jamie Reyes', team: 'Alpha', position: 'Defense', goals: 3 },
	{ name: 'Quinn Torres', team: 'Gamma', position: 'Midfield', goals: 8 },
];

// ─── Stories ───────────────────────────────────────────────────────────────

export const Default: Story = {
	render: (args) => {
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
				<SortControls {...sortControlsProps} size={args.size} color={args.color} />
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
									<Text bold>{h}</Text>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sortedData.map((row) => (
							<tr key={row.title}>
								<td style={{ padding: '4px 8px' }}>
									<Text>{row.title}</Text>
								</td>
								<td style={{ padding: '4px 8px' }}>
									<Text>{row.type}</Text>
								</td>
								<td style={{ padding: '4px 8px' }}>
									<Text>{String(row.rating)}</Text>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	},
};

export const MultiSort: Story = {
	render: (args) => {
		const { sortedData, sortControlsProps } = useSortControls({
			data: PLAYER_DATA,
			fields: [
				{ key: 'team', label: 'Team', icon: 'UsersThree', color: 'primary' },
				{ key: 'position', label: 'Position', icon: 'Nut', color: 'secondary' },
				{ key: 'goals', label: 'Goals', icon: 'Trophy', color: 'info' },
			],
			multi: true,
		});

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 520 }}>
				<SortControls {...sortControlsProps} size={args.size} color={args.color} />
				<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
					<thead>
						<tr>
							{['Name', 'Team', 'Position', 'Goals'].map((h) => (
								<th
									key={h}
									style={{
										textAlign: 'left',
										padding: '4px 8px',
										borderBottom: '1px solid #e2e8f0',
									}}
								>
									<Text bold>{h}</Text>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sortedData.map((row) => (
							<tr key={row.name}>
								<td style={{ padding: '4px 8px' }}>
									<Text>{row.name}</Text>
								</td>
								<td style={{ padding: '4px 8px' }}>
									<Text>{row.team}</Text>
								</td>
								<td style={{ padding: '4px 8px' }}>
									<Text>{row.position}</Text>
								</td>
								<td style={{ padding: '4px 8px' }}>
									<Text>{String(row.goals)}</Text>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	},
};

// ─── Custom Sort Data ───────────────────────────────────────────────────────

const COURSE_ORDER = ['Appetizer', 'Main', 'Side', 'Dessert', 'Drink'] as const;

const RECIPE_DATA = [
	{ name: 'Tiramisu', course: 'Dessert', calories: 450 },
	{ name: 'Garlic Bread', course: 'Side', calories: 180 },
	{ name: 'Ribeye Steak', course: 'Main', calories: 860 },
	{ name: 'Bruschetta', course: 'Appetizer', calories: 120 },
	{ name: 'Sparkling Lemonade', course: 'Drink', calories: 90 },
	{ name: 'Roasted Potatoes', course: 'Side', calories: 210 },
	{ name: 'Salmon Fillet', course: 'Main', calories: 540 },
	{ name: 'Panna Cotta', course: 'Dessert', calories: 310 },
];

// ─── CustomSort Story ───────────────────────────────────────────────────────

export const CustomSort: Story = {
	render: (args) => {
		const { sortedData, sortControlsProps } = useSortControls({
			data: RECIPE_DATA,
			fields: [
				{ key: 'name', label: 'Name', icon: 'TextAa' },
				{
					key: 'course',
					label: 'Course',
					icon: 'ForkKnife',
					sortOrder: [...COURSE_ORDER],
				},
				{
					key: 'calories',
					label: 'Calories',
					icon: 'Fire',
				},
			],
		});

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 480 }}>
				<SortControls {...sortControlsProps} size={args.size} color={args.color} />
				<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
					<thead>
						<tr>
							{['Name', 'Course', 'Calories'].map((h) => (
								<th
									key={h}
									style={{
										textAlign: 'left',
										padding: '4px 8px',
										borderBottom: '1px solid #e2e8f0',
									}}
								>
									<Text bold>{h}</Text>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sortedData.map((row) => (
							<tr key={row.name}>
								<td style={{ padding: '4px 8px' }}>
									<Text>{row.name}</Text>
								</td>
								<td style={{ padding: '4px 8px' }}>
									<Text>{row.course}</Text>
								</td>
								<td style={{ padding: '4px 8px' }}>
									<Text>{String(row.calories)}</Text>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	},
};
