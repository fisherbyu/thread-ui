import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './card';

const meta = {
	title: 'Components/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		surfaceColor: {
			control: 'select',
			options: ['background', 'surface', 'elevated'],
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		title: {
			control: 'text',
		},
		shadow: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		surfaceColor: 'background',
		size: 'md',
		children: <p>This is a card component with some content inside.</p>,
	},
};

export const WithTitle: Story = {
	args: {
		title: 'Card Title',
		children: <p>This card has a title and some content.</p>,
	},
};

export const WithoutShadow: Story = {
	args: {
		title: 'No Shadow',
		shadow: false,
		children: <p>This card has no shadow applied.</p>,
	},
};

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
			<Card size="sm" title="Small Card">
				<p>Small card with shadow</p>
			</Card>
			<Card size="md" title="Medium Card">
				<p>Medium card with shadow</p>
			</Card>
			<Card size="lg" title="Large Card">
				<p>Large card with shadow</p>
			</Card>
		</div>
	),
};
