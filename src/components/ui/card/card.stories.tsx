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
		shadow: true,
		children: <p>This is a card component with some content inside.</p>,
	},
};

export const WithTitle: Story = {
	args: {
		title: {
			text: 'Card Title',
			align: 'left',
		},
		children: <p>This card has a title and some content.</p>,
	},
};

export const AllVariants: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '2rem',
				width: '100%',
				maxWidth: '900px',
			}}
		>
			<Card size="sm" title={{ text: 'Small Card', align: 'left' }}>
				<p>Small card with default background</p>
			</Card>
			<Card
				size="md"
				title={{ text: 'Medium Card with Divider', align: 'left', divider: true }}
			>
				<p>Medium card with divider</p>
			</Card>
			<Card
				size="lg"
				surfaceColor="elevated"
				title={{ text: 'Large Elevated Card', align: 'center' }}
			>
				<p>Large card with elevated surface and centered title</p>
			</Card>
			<Card shadow={false} title={{ text: 'Card Without Shadow', align: 'left' }}>
				<p>Card with no shadow</p>
			</Card>
		</div>
	),
};
