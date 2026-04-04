import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './card';
import { Text } from '../../typography';

const meta = {
	title: 'UI Components/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		surfaceColor: {
			control: 'select',
			options: ['surface', 'elevated', 'overlay', 'hover', 'none'],
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
		surfaceColor: 'surface',
		size: 'md',
		shadow: true,
		children: <Text>This is a card component with some content inside.</Text>,
	},
};

export const WithTitle: Story = {
	args: {
		title: {
			text: 'Card Title',
			align: 'left',
		},
		children: <Text>This card has a title and some content.</Text>,
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
				<Text>Small card with default background</Text>
			</Card>
			<Card
				size="md"
				title={{ text: 'Medium Card with Divider', align: 'left', divider: true }}
			>
				<Text>Medium card with divider</Text>
			</Card>
			<Card
				size="lg"
				surfaceColor="elevated"
				title={{ text: 'Large Elevated Card', align: 'center' }}
			>
				<Text>Large card with elevated surface and centered title</Text>
			</Card>
			<Card shadow={false} title={{ text: 'Card Without Shadow', align: 'left' }}>
				<Text>Card with no shadow</Text>
			</Card>
		</div>
	),
};
