import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './divider';
import { Text } from '../../typography';

const meta: Meta<typeof Divider> = {
	title: 'UI Components/Divider',
	component: Divider,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		width: {
			control: 'text',
			description: 'Width of the divider (CSS value)',
		},
		marginY: {
			control: 'text',
			description: 'Vertical margin above and below the divider (CSS value)',
		},
		weight: {
			control: 'select',
			options: ['light', 'standard', 'bold'],
			description: 'Thickness of the divider',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Divider>;

// Base story with default props
export const Default: Story = {
	args: {},
	decorators: [
		(Story) => (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Text>Content above</Text>
				<Story />
				<Text>Content below</Text>
			</div>
		),
	],
};

// Multiple dividers showcase
export const DividerComparison: Story = {
	render: () => (
		<div style={{ width: '100%', maxWidth: '600px', padding: '20px' }}>
			<Text>Light weight divider:</Text>
			<Divider weight="light" />

			<Text>Standard weight divider:</Text>
			<Divider weight="standard" />

			<Text>Bold weight divider:</Text>
			<Divider weight="heavy" />

			<Text>Custom width (40%) and large margins:</Text>
			<Divider width="40%" marginY="32px" />
		</div>
	),
};
