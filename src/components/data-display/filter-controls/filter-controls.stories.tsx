'use client';
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterControls } from './filter-controls';
import { useFilterControls } from './use-filter-controls';
import { Text } from '../../typography';

const meta: Meta<typeof FilterControls> = {
	title: 'Data Display/FilterControls',
	component: FilterControls,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'Size applied to all filter dropdowns',
		},
		color: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'tertiary', 'info', 'success', 'error'],
			description: 'Fallback color for dropdowns that do not have a field-level color',
		},
	},
	args: {
		size: 'sm',
		color: 'tertiary',
	},
};

export default meta;
type Story = StoryObj<typeof FilterControls>;

// ─── Sample data ───────────────────────────────────────────────────────────

const RECIPE_DATA = [
	{ title: 'Pasta Carbonara', type: 'Dinner', rating: 4.8 },
	{ title: 'Avocado Toast', type: 'Breakfast', rating: 3.9 },
	{ title: 'Caesar Salad', type: 'Lunch', rating: 4.2 },
	{ title: 'Beef Tacos', type: 'Dinner', rating: 4.6 },
	{ title: 'Blueberry Pancakes', type: 'Breakfast', rating: 4.5 },
	{ title: 'French Omelette', type: 'Breakfast', rating: 4.1 },
	{ title: 'Margherita Pizza', type: 'Dinner', rating: 4.7 },
	{ title: 'Greek Salad', type: 'Lunch', rating: 4.0 },
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

const COURSE_DATA = [
	{ name: 'Bruschetta', course: 'Appetizer', diet: 'Vegetarian', calories: 120 },
	{ name: 'Ribeye Steak', course: 'Main', diet: 'Meat', calories: 860 },
	{ name: 'Garlic Bread', course: 'Side', diet: 'Vegetarian', calories: 180 },
	{ name: 'Tiramisu', course: 'Dessert', diet: 'Vegetarian', calories: 450 },
	{ name: 'Sparkling Lemonade', course: 'Drink', diet: 'Vegan', calories: 90 },
	{ name: 'Salmon Fillet', course: 'Main', diet: 'Pescatarian', calories: 540 },
	{ name: 'Roasted Potatoes', course: 'Side', diet: 'Vegan', calories: 210 },
	{ name: 'Panna Cotta', course: 'Dessert', diet: 'Vegetarian', calories: 310 },
	{ name: 'Shrimp Cocktail', course: 'Appetizer', diet: 'Pescatarian', calories: 150 },
	{ name: 'Herbal Tea', course: 'Drink', diet: 'Vegan', calories: 5 },
];

// ─── Stories ───────────────────────────────────────────────────────────────

export const Default: Story = {
	render: (args) => {
		const { filteredData, filterControlsProps } = useFilterControls({
			data: RECIPE_DATA,
			fields: [{ key: 'type', label: 'Meal Type' }],
		});

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 480 }}>
				<FilterControls {...filterControlsProps} size={args.size} color={args.color} />
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
						{filteredData.map((row) => (
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

export const MultiField: Story = {
	render: (args) => {
		const { filteredData, filterControlsProps } = useFilterControls({
			data: PLAYER_DATA,
			fields: [
				{ key: 'team', label: 'Team', color: 'primary', icon: 'UsersThree' },
				{ key: 'position', label: 'Position', color: 'secondary', icon: 'Nut' },
			],
		});

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 520 }}>
				<FilterControls {...filterControlsProps} size={args.size} color={args.color} />
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
						{filteredData.map((row) => (
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

// ─── Explicit Options Data ──────────────────────────────────────────────────

const COURSE_OPTIONS = [
	{ label: 'Appetizer', value: 'Appetizer' },
	{ label: 'Main', value: 'Main' },
	{ label: 'Side', value: 'Side' },
	{ label: 'Dessert', value: 'Dessert' },
	{ label: 'Drink', value: 'Drink' },
];

const DIET_OPTIONS = [
	{ label: 'Vegan', value: 'Vegan' },
	{ label: 'Vegetarian', value: 'Vegetarian' },
	{ label: 'Pescatarian', value: 'Pescatarian' },
	{ label: 'Meat', value: 'Meat' },
];

// ─── ExplicitOptions Story ──────────────────────────────────────────────────

export const ExplicitOptions: Story = {
	render: (args) => {
		const { filteredData, filterControlsProps } = useFilterControls({
			data: COURSE_DATA,
			fields: [
				{
					key: 'course',
					label: 'Course',
					options: COURSE_OPTIONS,
				},
				{
					key: 'diet',
					label: 'Diet',
					options: DIET_OPTIONS,
				},
			],
		});

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 520 }}>
				<FilterControls {...filterControlsProps} size={args.size} color={args.color} />
				<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
					<thead>
						<tr>
							{['Name', 'Course', 'Diet', 'Calories'].map((h) => (
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
						{filteredData.map((row) => (
							<tr key={row.name}>
								<td style={{ padding: '4px 8px' }}>
									<Text>{row.name}</Text>
								</td>
								<td style={{ padding: '4px 8px' }}>
									<Text>{row.course}</Text>
								</td>
								<td style={{ padding: '4px 8px' }}>
									<Text>{row.diet}</Text>
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

// ─── DefaultFilters Story ───────────────────────────────────────────────────

type DefaultFiltersStory = StoryObj<typeof FilterControls & { useDefaultFilters: boolean }>;

export const DefaultFilters: DefaultFiltersStory = {
	argTypes: {
		useDefaultFilters: {
			control: { type: 'boolean' },
			description: 'Toggle whether default filters are applied on mount',
		},
	},
	args: {
		useDefaultFilters: true,
	},
	render: (args) => {
		const { filteredData, filterControlsProps } = useFilterControls({
			data: PLAYER_DATA,
			fields: [
				{ key: 'team', label: 'Team', color: 'primary', icon: 'UsersThree' },
				{ key: 'position', label: 'Position', color: 'secondary', icon: 'Nut' },
			],
			// @ts-ignore -- useDefaultFilters is a story-level arg
			defaultFilters: args.useDefaultFilters
				? [{ key: 'team', values: ['Alpha'] }]
				: undefined,
		});

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 520 }}>
				<FilterControls {...filterControlsProps} size={args.size} color={args.color} />
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
						{filteredData.map((row) => (
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
