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
		level: {
			control: 'select',
			options: ['canvas', 'inset', 'surface', 'elevated', 'overlay'],
		},
		surface: {
			control: 'select',
			options: ['none', 'canvas', 'inset', 'surface', 'elevated', 'overlay'],
		},
		shadow: {
			control: 'select',
			options: ['none', 'sm', 'md', 'lg'],
		},
		structure: {
			control: 'select',
			options: ['none', 'subtle', 'default', 'strong'],
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		level: 'surface',
		size: 'md',
		children: <Text>This is a card component with some content inside.</Text>,
	},
};

export const WithTitle: Story = {
	args: {
		level: 'surface',
		title: {
			text: 'Card Title',
			align: 'left',
		},
		children: <Text>This card has a title and some content.</Text>,
	},
};

export const AllLevels: Story = {
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
			<Card level="surface" size="sm" title={{ text: 'Surface Level', align: 'left' }}>
				<Text>Default card — sm shadow, subtle border</Text>
			</Card>

			<Card level="elevated" size="md" title={{ text: 'Elevated Level', align: 'left' }}>
				<Text>Elevated card — md shadow, subtle border</Text>
			</Card>

			<Card level="overlay" size="lg" title={{ text: 'Overlay Level', align: 'center' }}>
				<Text>Overlay card — lg shadow, no border</Text>
			</Card>
		</div>
	),
};

export const WithOverrides: Story = {
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
			<Card
				level="surface"
				shadow="none"
				title={{ text: 'Surface, No Shadow', align: 'left' }}
			>
				<Text>Surface level with shadow overridden to none</Text>
			</Card>

			<Card
				level="surface"
				structure="strong"
				title={{ text: 'Surface, Strong Border', align: 'left' }}
			>
				<Text>Surface level with structure overridden to strong</Text>
			</Card>

			<Card
				level="elevated"
				shadow="lg"
				structure="none"
				title={{ text: 'Elevated, Heavy Shadow', align: 'left' }}
			>
				<Text>Elevated level with shadow bumped to lg and border removed</Text>
			</Card>
		</div>
	),
};

export const WithTitleDivider: Story = {
	args: {
		level: 'surface',
		title: {
			text: 'Card with Divider',
			align: 'left',
			divider: true,
		},
		children: <Text>Title divider separates the heading from content</Text>,
	},
};
