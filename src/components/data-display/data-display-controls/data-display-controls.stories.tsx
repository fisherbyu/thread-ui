'use client';
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataDisplayControls } from './';
import { useDataDisplayControls } from './use-data-display-controls';
import { DataDisplayControlsProps } from './data-display-controls.types';
import { Text } from '../../typography';

const meta: Meta<typeof DataDisplayControls> = {
	title: 'Data Display/DataDisplayControls',
	component: DataDisplayControls,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'Size applied to all controls',
		},
		color: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'tertiary', 'info', 'success', 'error'],
			description: 'Fallback color for controls that do not have a field-level color',
		},
	},
	args: {
		size: 'sm',
		color: 'tertiary',
	},
};

export default meta;
type Story = StoryObj<typeof DataDisplayControls>;

// ─── Sample data ───────────────────────────────────────────────────────────

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

type Player = (typeof PLAYER_DATA)[number];

// ─── Stories ───────────────────────────────────────────────────────────────

export const Default: Story = {
	render: (args: DataDisplayControlsProps<Player>) => {
		const { refinedData, dataDisplayControlsProps } = useDataDisplayControls({
			data: PLAYER_DATA,
			fields: [
				{
					key: 'team',
					label: 'Team',
					color: 'primary',
					icon: 'UsersThree',
					options: [
						{ value: 'Alpha', label: 'Alpha' },
						{ value: 'Beta', label: 'Beta' },
						{ value: 'Gamma', label: 'Gamma' },
					],
				},
				{
					key: 'position',
					label: 'Position',
					color: 'secondary',
					icon: 'Nut',
					options: [
						{ value: 'Forward', label: 'Forward' },
						{ value: 'Midfield', label: 'Midfield' },
						{ value: 'Defense', label: 'Defense' },
					],
				},
			],
		});

		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
					width: '100%',
					minWidth: 520,
					minHeight: 500,
				}}
			>
				<DataDisplayControls
					{...dataDisplayControlsProps}
					size={args.size}
					color={args.color}
				/>
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
						{refinedData.map((row: any) => (
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
