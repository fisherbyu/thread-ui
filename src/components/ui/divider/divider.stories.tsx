import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './divider';

const meta: Meta<typeof Divider> = {
	title: 'Components/Divider',
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
			<div style={{ width: '100%', maxWidth: '600px', padding: '20px' }}>
				<p>Content above</p>
				<Story />
				<p>Content below</p>
			</div>
		),
	],
};

// Multiple dividers showcase
export const DividerComparison: Story = {
	render: () => (
		<div style={{ width: '100%', maxWidth: '600px', padding: '20px' }}>
			<p>Light weight divider:</p>
			<Divider weight="light" />

			<p>Standard weight divider:</p>
			<Divider weight="standard" />

			<p>Bold weight divider:</p>
			<Divider weight="heavy" />

			<p>Custom width (40%) and large margins:</p>
			<Divider width="40%" marginY="32px" />
		</div>
	),
};
